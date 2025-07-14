import React from 'react';

const BookingSummary = ({ flight }) => (
  <div className="flight-summary">
    <h3>{flight.airline} ({flight.flightNumber})</h3>
    <p>{flight.source} ➝ {flight.destination}</p>
    <p>Departure: {flight.departure}</p>
    <p>Arrival: {flight.arrival}</p>
    <p>Price: ₹{flight.price}</p>
  </div>
);

export default BookingSummary;
