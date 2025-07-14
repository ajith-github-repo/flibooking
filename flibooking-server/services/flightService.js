const flightsMock = require('../mock/flights');

function sortFlights(flights, sortKey, order = 'asc') {
  return flights.sort((a, b) => {
    if (a[sortKey] < b[sortKey]) return order === 'asc' ? -1 : 1;
    if (a[sortKey] > b[sortKey]) return order === 'asc' ? 1 : -1;
    return 0;
  });
}

function paginate(flights, page = 1, limit = 5) {
  const startIndex = (page - 1) * limit;
  return flights.slice(startIndex, startIndex + limit);
}

const searchFlights = async (filters) => {
  const {
    source,
    destination,
    date,
    sortBy,
    order = 'asc',
    page = 1,
    limit = 5,
  } = filters;

  let filtered = flightsMock;

  filtered = filtered.filter(
    (flight) =>
      flight.source.toLowerCase() === source.toLowerCase() &&
      flight.destination.toLowerCase() === destination.toLowerCase() &&
      flight.date === date
  );

  if (sortBy) {
    filtered = sortFlights(filtered, sortBy, order);
  }

  const total = filtered.length;
  const results = paginate(filtered, page, limit);

  return {
    flights: results,
    total,
    page: page,
    limit: limit,
    totalPages: Math.ceil(total / limit),
  };
};

const getFlightById = async ({id}) => {
  const flight = flightsMock.find(f => f.id === id);
  if (!flight) throw new Error('Flight not found');
  return flight;
};


module.exports = { searchFlights, getFlightById };
