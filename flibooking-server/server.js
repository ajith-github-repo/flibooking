const express = require('express');
const cors = require('cors');
const flightsRouter = require('./routes/flights');
const bookingsRouter = require('./routes/bookings');
const errorHandler = require('./middleware/errorHandler');
const { port } = require('./config/env');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/flights', flightsRouter);
app.use('/api/bookings', bookingsRouter);

// Error Handler (last)
app.use(errorHandler);

app.listen(port, () => {
  console.log(`flibooking-server running on port ${port}`);
});
