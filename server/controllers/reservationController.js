import { Reservation } from "../models/ReservationModel.js";
import { DailyBooking } from "../models/dailyBookingModel.js";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { promisify } from 'util';
import { User } from "../models/UserModel.js";

const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, '../uploads');

// Dynamic capacity config
const COTTAGE_CAPACITY = {
    pondside: 1,
    largekubo: 1,
    umbrella: 6,
    kubo: 6,
    rock: 3
};

const ensureUploadsDir = async () => {
    try {
        await mkdir(uploadsDir, { recursive: true });
    } catch (err) {
        console.error('Error creating uploads directory:', err);
    }
};

export const createReservation = async (req, res) => {
    await ensureUploadsDir();

    try {
        const {
            userId,
            cottageId,
            cottageName,
            cottagePrice,
            guestName,
            email,
            contactNumber,
            numberOfGuest,
            address,
            checkIn,
            checkOut,
            payment,
            termsAgreed
        } = req.body;

        // Required field validation
        const requiredFields = {
            userId, cottageId, cottageName, cottagePrice, guestName, email,
            contactNumber, numberOfGuest, address, checkIn, checkOut,
            payment, termsAgreed
        };

        const missingFields = Object.entries(requiredFields)
            .filter(([_, value]) => !value)
            .map(([key]) => key);

        if (missingFields.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields',
                missingFields
            });
        }

        if (!/^\d{11}$/.test(contactNumber)) {
            return res.status(400).json({
                success: false,
                message: 'Phone number must be 11 digits'
            });
        }

        if (Number(numberOfGuest) <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Number of guests must be at least 1'
            });
        }

        if (new Date(checkOut) <= new Date(checkIn)) {
            return res.status(400).json({
                success: false,
                message: 'Check-out date must be after check-in date'
            });
        }

        // Check if the user has already booked the same cottage for the same date range
        const existingReservation = await Reservation.findOne({
            userId,
            cottageId,
            checkIn: new Date(checkIn),
            status: { $ne: 'cancelled' }
        });

        if (existingReservation) {
            return res.status(400).json({
                success: false,
                message: 'You have already booked this cottage for the selected check-in date.'
            });
        }



        // ✅ Normalize check-in date
        const bookingDate = new Date(checkIn);
        bookingDate.setHours(0, 0, 0, 0);

        // ✅ Determine max capacity from map
        const maxCapacity = COTTAGE_CAPACITY[cottageId];
        if (!maxCapacity) {
            return res.status(400).json({
                success: false,
                message: 'Invalid cottage ID or capacity not configured'
            });
        }

        // ✅ Check daily booking count
        let dailyBooking = await DailyBooking.findOne({ cottageId, date: bookingDate });

        if (dailyBooking) {
            if (dailyBooking.bookedCount >= maxCapacity) {
                return res.status(400).json({
                    success: false,
                    message: `This cottage is fully booked for ${bookingDate.toDateString()}`
                });
            }
            dailyBooking.bookedCount += 1;
            await dailyBooking.save();
        } else {
            dailyBooking = new DailyBooking({
                cottageId,
                date: bookingDate,
                bookedCount: 1,
                maxCapacity
            });
            await dailyBooking.save();
        }

        // ✅ File upload handling
        let filename = null;
        if (req.file) {
            const file = req.file;
            const extension = path.extname(file.originalname);
            filename = `payment_${Date.now()}${extension}`;
            const filePath = path.join(uploadsDir, filename);

            try {
                await writeFile(filePath, file.buffer);
            } catch (err) {
                return res.status(500).json({
                    success: false,
                    message: 'Error saving uploaded file'
                });
            }
        } else {
            return res.status(400).json({
                success: false,
                message: 'Proof of payment file is required'
            });
        }

        const totalAmount = Number(cottagePrice) * Number(numberOfGuest);

        const reservationData = {
            userId,
            cottageId,
            cottageName,
            cottagePrice: Number(cottagePrice),
            guestName,
            email,
            contactNumber,
            numberOfGuest: Number(numberOfGuest),
            address,
            checkIn,
            checkOut,
            payment,
            status: 'pending',
            proofOfPayment: filename,
            totalAmount,
            termsAgreed: Boolean(termsAgreed)
        };

        const reservation = new Reservation(reservationData);
        await reservation.save();

        res.status(201).json({
            success: true,
            message: 'Reservation created successfully',
            reservation: {
                ...reservation.toObject(),
                proofOfPaymentUrl: `/uploads/${filename}`
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Internal server error'
        });
    }
};



export const getUserReservations = async (req, res) => {
    const userId = req.userId;
    try {
        const reservations = await Reservation.find({ userId });
        res.status(200).json({ reservations });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving reservations" });
    }
};


export const cancelReservation = async (req, res) => {
    const { reservationId } = req.params;
    const userId = req.userId;

    console.log(userId);


    try {
        const reservation = await Reservation.findById(reservationId);
        if (!reservation) {
            return res.status(404).json({ success: false, message: 'Reservation not found' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(401).json({ success: false, message: "User not found" });
        }

        const isAdmin = user.role === 'admin';
        const isOwner = reservation.userId.toString() === userId;

        if (!isOwner && !isAdmin) {
            return res.status(403).json({
                success: false,
                message: "You do not have permission to cancel this reservation"
            });
        }

        if (['cancelled', 'completed'].includes(reservation.status)) {
            return res.status(400).json({
                success: false,
                message: `Cannot cancel a reservation that is already ${reservation.status}`
            });
        }

        // ✅ Update DailyBooking
        const checkInDate = new Date(reservation.checkIn);
        const dayOnly = new Date(checkInDate.getFullYear(), checkInDate.getMonth(), checkInDate.getDate());

        const dailyBooking = await DailyBooking.findOne({
            cottageId: reservation.cottageId, // or reservation.cottageId depending on your model
            date: dayOnly,
        });

        if (dailyBooking) {
            dailyBooking.bookedCount = Math.max(0, dailyBooking.bookedCount - 1);
            await dailyBooking.save();
        }

        // ✅ Cancel the reservation
        reservation.status = 'cancelled';
        await reservation.save();

        return res.status(200).json({
            success: true,
            message: "Reservation cancelled successfully",
            reservation
        });

    } catch (error) {
        console.error("Error cancelling reservation:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};