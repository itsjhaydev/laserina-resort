import mongoose from 'mongoose';

// Define the cottage capacity map
const COTTAGE_CAPACITY = {
    pondside: 1,
    largekubo: 1,
    umbrella: 6,
    kubo: 6,
    rock: 3
};

// Schema definition for daily bookings
const dailyBookingSchema = new mongoose.Schema({
    cottageId: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    bookedCount: {
        type: Number,
        default: 0,
    },
    maxCapacity: {
        type: Number,
        required: true,
        default: function() {
            // Set maxCapacity based on the cottageId or fallback to a default value (5)
            return COTTAGE_CAPACITY[this.cottageId] || 5;
        }
    },
});


export const DailyBooking = mongoose.model('DailyBooking', dailyBookingSchema);
