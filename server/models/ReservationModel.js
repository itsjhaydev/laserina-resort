import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  cottageId: String,
  cottageName: String,
  cottagePrice: Number,
  numberOfGuest: Number,
  totalAmount: Number,
  guestName: String,
  email: String,
  contactNumber: String,
  address: String,
  checkIn: Date,
  checkOut: Date,
  payment: String,
  status: String,
  proofOfPayment: String, // This will be a URL or filename
  createdAt: { type: Date, default: Date.now }
});

export const Reservation = mongoose.model('Reservation', reservationSchema);
