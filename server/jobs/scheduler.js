import cron from 'node-cron';
import { Reservation } from '../models/ReservationModel.js'; // Adjust the path as needed

// Schedule the task to run daily at midnight
cron.schedule('0 0 * * *', async () => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to midnight

    // Update reservations where the checkout date has passed
    const result = await Reservation.updateMany(
      {
        status: 'confirmed',
        checkOut: { $lte: today },
      },
      { $set: { status: 'completed' } }
    );

    console.log(`Updated ${result.modifiedCount} reservations to 'completed'.`);
  } catch (error) {
    console.error('Error updating reservations:', error);
  }
});
