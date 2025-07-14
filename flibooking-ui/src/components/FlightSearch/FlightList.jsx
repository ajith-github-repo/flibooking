import React from 'react';
import FlightCard from './FlightCard';

const FlightList = ({ flights, selectedFlight, onSelect, label }) => {
  if (!flights || flights.length === 0) {
    return (
      <div className="text-center text-gray-400 italic py-4">
        No {label} flights found.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {flights.map(flight => (
        <FlightCard
          key={flight.id}
          flight={flight}
          isSelected={selectedFlight?.id === flight.id}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
};

export default FlightList;

