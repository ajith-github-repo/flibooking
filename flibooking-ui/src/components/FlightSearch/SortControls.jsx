import React from 'react';

const SortControls = ({ sortBy, order, onSortChange }) => {
  return (
    <div className="flex flex-wrap justify-end gap-4 mb-4">
      <div>
        <label className="text-sm font-medium mr-2">Sort by:</label>
        <select
          value={sortBy || ''}
          onChange={(e) => onSortChange(e.target.value, order)}
          className="border border-gray-300 rounded px-2 py-1"
        >
          <option value="">None</option>
          <option value="price">Price</option>
          <option value="departure">Departure Time</option>
          <option value="arrival">Arrival Time</option>
        </select>
      </div>
      <div>
        <label className="text-sm font-medium mr-2">Order:</label>
        <select
          value={order}
          onChange={(e) => onSortChange(sortBy, e.target.value)}
          className="border border-gray-300 rounded px-2 py-1"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </div>
  );
};

export default SortControls;
