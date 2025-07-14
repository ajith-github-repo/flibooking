
import React from 'react';
import { cn } from '../../utils/classnames';

const FlightCard = ({ flight, isSelected, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(flight)}
      className={cn(
        "cursor-pointer border p-4 rounded-md shadow-sm transition-all",
        isSelected ? "border-blue-500 bg-blue-50" : "hover:shadow-md"
      )}
    >
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold">{flight.airline} ({flight.flightNumber})</h2>
          <p className="text-sm text-gray-500">{flight.source} → {flight.destination}</p>
          <p className="text-sm text-gray-500">Departure: {flight.departure} | Arrival: {flight.arrival}</p>
          <p className="text-sm text-gray-500">Date: {flight.date}</p>
        </div>
        <div className="text-right">
          <p className="text-xl font-bold text-blue-700">₹{flight.price}</p>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;
