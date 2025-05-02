import express from 'express';
import { cancelReservation, createReservation, getUserReservations } from '../controllers/reservationController.js';
import { verifyToken } from '../middleware/verifyToken.js';
import multer from 'multer';

const router = express.Router();

// Configure multer to store file in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/create-reservation', verifyToken, upload.single('proofOfPayment'), createReservation);

router.get("/user", verifyToken, getUserReservations);

router.post('/cancel/:reservationId', verifyToken, cancelReservation);

export default router;
