import React, { useState } from "react";

const SearchForm = ({ onSearch }) => {
  const [formData, setFormData] = useState({
    source: "",
    destination: "",
    date: "",
    isRoundTrip: false,
    returnDate: "",
  });
  const [errors, setErrors] = useState([]);
  const validateSearchForm = () => {
    const validationErrors = [];

    if (!formData.source.trim()) {
      validationErrors.push("Source is required");
      return validationErrors;
    } else if (!/^[A-Z]{3,}$/.test(formData.source.trim())) {
      validationErrors.push("Source must be at least 3 uppercase letters");
      return validationErrors;
    }

    if (!formData.destination.trim()) {
      validationErrors.push("Destination is required");
      return validationErrors;
    } else if (!/^[A-Z]{3,}$/.test(formData.destination.trim())) {
      validationErrors.push("Destination must be at least 3 uppercase letters");
      return validationErrors;
    }

    if (!formData.date.trim()) {
      validationErrors.push("Departure date is required");
      return validationErrors;
    }

    if (formData.isRoundTrip && !formData.returnDate.trim()) {
      validationErrors.push("Return date is required for round trip");
    }

    return validationErrors;
  };
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = ["source", "destination"].includes(name)
      ? value.toUpperCase()
      : value;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : newValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const clientErrors = validateSearchForm();
    if (clientErrors.length > 0) {
      setErrors(clientErrors);
      return;
    }
    setErrors([]);

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
        />
        <input
          type="text"
          name="destination"
          value={formData.destination}
          onChange={handleChange}
          placeholder="Destination"
          className="border rounded px-3 py-2"
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="border rounded px-3 py-2"
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
      {errors.length > 0 && (
        <div className="relative bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded w-full text-sm">
          <button onClick={() => setErrors([])} className="absolute top-0 right-2 text-red-700 text-lg font-bold">&times;</button>  
          <ul className="list-disc list-inside space-y-1">
            {errors.map((err, idx) => (
              <li key={idx}>{err}</li>
            ))}
          </ul>
        </div>
      )}
    </form>
  );
};

export default SearchForm;
