import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {submitBooking} from '../../api/bookingApi';
const BookingForm = ({ onwardFlight, returnFlight }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [message, setMessage] = useState(null);
  const [bookingId, setBookingId] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = [];
  
    // Name validation
    if (!formData.name.trim()) {
      errors.push('Name is required');
      return errors;
    } else if (!/^[a-zA-Z ]+$/.test(formData.name.trim())) {
      errors.push('Name must contain only letters and spaces');
      return errors;
    }
  
    // Email validation
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.push('Valid email is required');
      return errors;
    }
  
    // Optional phone validation
    if (formData.phone.trim()) {
      const digitsOnly = formData.phone.replace(/\D/g, '');
      if (digitsOnly.length < 6 || digitsOnly.length > 10) {
        errors.push('Phone number must be between 6 and 10 digits');
      }
    }
  
    return errors;
  };
  
  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    const clientErrors = validateForm();
    
    if (clientErrors.length > 0) {
      setError(clientErrors.join('\n'));
      return;
    }

    const payload = {
      passenger: formData,
      onwardFlightId: onwardFlight.id,
      returnFlightId: returnFlight?.id || null
    };

    try {
      const { bookingId, email } = await submitBooking(payload);
      setBookingId(bookingId);
      setMessage(`Booking successful! 🎉\nBooking ID: ${bookingId}\nTickets will be sent to ${email}`);
    } catch (err) {
      if (err.response?.data?.errors) {
        setError(err.response.data.errors.map(e => e.msg).join('\n'));
      } else {
        setError('Something went wrong. Please try again.');
      }
    }
  };

  useEffect(() => {
    if (bookingId) {
      const timer = setTimeout(() => {
        navigate('/');
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [bookingId, navigate]);

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-md p-6 space-y-4">
      <h3 className="text-lg font-semibold">Passenger Details</h3>

      {error && <div className="text-red-600 text-sm whitespace-pre-line">{error}</div>}

      <div className="grid gap-4 md:grid-cols-2">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="border rounded px-3 py-2 w-full"
          
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email Address"
          className="border rounded px-3 py-2 w-full"
          
        />
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone Number (optional)"
          className="border rounded px-3 py-2 w-full md:col-span-2"
        />
      </div>

      <button
        type="submit"
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
      >
        Confirm Booking
      </button>
      
      {message && (
        <div className="text-green-600 text-sm font-medium pt-4 whitespace-pre-line">
          {message}
          <p className="text-gray-500 text-xs mt-2">Redirecting to search in 10 seconds...</p>
        </div>
      )}
    </form>
  );
};

export default BookingForm;