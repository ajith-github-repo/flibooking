const express = require('express');
const { body, validationResult } = require('express-validator');
const bookings = require('../mock/data/bookings');

const router = express.Router();

router.post(
  '/',
  [
    body('passenger.name').notEmpty().withMessage('Passenger name is required'),
    body('passenger.email').isEmail().withMessage('Valid email is required'),
    body('passenger.phone').optional({ checkFalsy: true }).isNumeric().withMessage('Phone must be numeric').isLength({ min: 6, max: 10 }).withMessage('Phone must be 6-10 digits'),
    body('onwardFlightId').notEmpty().withMessage('Onward flight ID is required'),
    body('returnFlightId').optional({ checkFalsy: true }).isString()
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { passenger, onwardFlightId, returnFlightId } = req.body;

    const bookingId = 'BK' + Math.floor(100000 + Math.random() * 900000);

    const newBooking = {
      id: bookingId,
      passenger,
      onwardFlightId,
      returnFlightId: returnFlightId || null,
      createdAt: new Date().toISOString()
    };

    bookings.push(newBooking);

    res.status(201).json({
      message: 'Booking successful',
      bookingId,
      email: passenger.email
    });
  }
);

module.exports = router;
