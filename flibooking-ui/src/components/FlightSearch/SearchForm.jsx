import React, { useState } from 'react';

const SearchForm = ({ onSearch }) => {
  const [formData, setFormData] = useState({
    source: '',
    destination: '',
    date: '',
    isRoundTrip: false,
    returnDate: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = ['source', 'destination'].includes(name)
      ? value.toUpperCase()
      : value;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : newValue
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchParams = { ...formData };
    if (!formData.isRoundTrip) {
      delete searchParams.returnDate;
    }
    onSearch(searchParams);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full max-w-3xl mx-auto items-center"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        <input
          type="text"
          name="source"
          value={formData.source}
          onChange={handleChange}
          placeholder="Source"
          className="border rounded px-3 py-2"
          required
        />
        <input
          type="text"
          name="destination"
          value={formData.destination}
          onChange={handleChange}
          placeholder="Destination"
          className="border rounded px-3 py-2"
          required
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="border rounded px-3 py-2"
          required
        />
      </div>

      <div className="flex flex-col items-center w-full">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isRoundTrip"
              checked={formData.isRoundTrip}
              onChange={handleChange}
            />
            <label htmlFor="isRoundTrip">Round Trip</label>
          </div>

          {formData.isRoundTrip && (
            <input
              type="date"
              name="returnDate"
              value={formData.returnDate}
              onChange={handleChange}
              className="border rounded px-3 py-2"
              required
            />
          )}
        </div>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded self-centre"
      >
        Search
      </button>
    </form>
  );
};

export default SearchForm;
