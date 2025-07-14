import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFlightById } from '../api/flightsApi';
import BookingForm from '../components/Booking/BookingForm';
import FlightSummary from '../components/Booking/FlightSummary';

const BookingPage = () => {
  const { onwardId, returnId } = useParams();
  const [onwardFlight, setOnwardFlight] = useState(null);
  const [returnFlight, setReturnFlight] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    console.log('Onward Id', onwardId);
    const fetchFlights = async () => {
      try {
        const [onwardData, returnData] = await Promise.all([
          getFlightById(onwardId),
          returnId ? getFlightById(returnId) : Promise.resolve(null)
        ]);
        setOnwardFlight(onwardData);
        setReturnFlight(returnData);
        setError(null);
      } catch (err) {
        setError('Failed to load flight details');
      } finally {
        setLoading(false);
      }
    };
    fetchFlights();
  }, [onwardId, returnId]);

  if (loading) {
    return <div className="text-center py-10 text-gray-500">Loading flight details...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Booking Summary</h1>

      <div className="space-y-4 mb-6">
        <FlightSummary label="Onward Flight" flight={onwardFlight} />
        {returnFlight && <FlightSummary label="Return Flight" flight={returnFlight} />}
      </div>

      <BookingForm
        onwardFlight={onwardFlight}
        returnFlight={returnFlight}
      />
    </div>
  );
};

export default BookingPage;