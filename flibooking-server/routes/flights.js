const express = require('express');
const { query } = require('express-validator');
const validateRequest = require('../middleware/validateRequest');
const { searchFlights, getFlightById} = require('../services/flightService');

const router = express.Router();


router.get(
  '/search',
  [
    query('source').notEmpty().isAlpha().withMessage('Source must be alphabetic'),
    query('destination').notEmpty().isAlpha().withMessage('Destination must be alphabetic'),
    query('date').notEmpty().isISO8601().withMessage('Date must be valid'),
    query('sortBy').optional().isIn(['price', 'departure', 'arrival']).withMessage('Invalid sortby field'),
    query('order').optional().isIn(['asc', 'desc']).withMessage('Invalid order field'),
    query('page').optional().isInt({ min: 1 }),
    query('limit').optional().isInt({ min: 1 }),
  ],
  validateRequest,
  async (req, res, next) => {
    try {
      const result = await searchFlights(req.query);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
);

router.get('/:id', async (req, res) => {
  try {
    const result = await getFlightById(req.params);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
