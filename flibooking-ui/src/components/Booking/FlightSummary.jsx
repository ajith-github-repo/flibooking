import React from 'react';

const FlightSummary = ({ label, flight }) => {
  if (!flight) return null;

  return (
    <div className="border rounded-md shadow-sm p-4 bg-white">
      <h3 className="text-lg font-semibold mb-2 text-blue-600">{label}</h3>
      <div className="space-y-1 text-sm text-gray-700">
        <p><strong>Airline:</strong> {flight.airline} ({flight.flightNumber})</p>
        <p><strong>Route:</strong> {flight.source} → {flight.destination}</p>
        <p><strong>Date:</strong> {flight.date}</p>
        <p><strong>Departure:</strong> {flight.departure} | <strong>Arrival:</strong> {flight.arrival}</p>
        <p><strong>Price:</strong> ₹{flight.price}</p>
      </div>
    </div>
  );
};

export default FlightSummary;