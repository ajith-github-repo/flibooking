import React, { useState, useEffect } from 'react';
import SearchForm from '../components/FlightSearch/SearchForm';
import FlightList from '../components/FlightSearch/FlightList';
import SortControls from '../components/FlightSearch/SortControls';
import Pagination from '../components/FlightSearch/Pagination';
import { fetchFlights } from '../api/flightsApi';
import { useNavigate } from 'react-router-dom';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useState(null);

  const [onwardFlights, setOnwardFlights] = useState([]);
  const [returnFlights, setReturnFlights] = useState([]);

  const [onwardPage, setOnwardPage] = useState(1);
  const [returnPage, setReturnPage] = useState(1);
  const [limit] = useState(5);

  const [onwardTotalPages, setOnwardTotalPages] = useState(1);
  const [returnTotalPages, setReturnTotalPages] = useState(1);

  const [sortByOnward, setSortByOnward] = useState(null);
  const [sortByReturn, setSortByReturn] = useState(null);
  const [orderOnward, setOrderOnward] = useState('asc');
  const [orderReturn, setOrderReturn] = useState('asc');

  const [selectedOnward, setSelectedOnward] = useState(null);
  const [selectedReturn, setSelectedReturn] = useState(null);

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchParams?.source && searchParams?.destination && searchParams?.date) {
      fetchFlights({
        source: searchParams.source,
        destination: searchParams.destination,
        date: searchParams.date,
        page: onwardPage,
        limit,
        sortBy: sortByOnward,
        order: orderOnward
      })
        .then(data => {
          setOnwardFlights(data.flights);
          setOnwardTotalPages(data.totalPages);
        })
        .catch(() => setError('Failed to fetch onward flights'));
    }
  }, [searchParams, onwardPage, limit, sortByOnward, orderOnward]);

  useEffect(() => {
    if (
      searchParams?.returnDate &&
      searchParams.destination &&
      searchParams.source
    ) {
      fetchFlights({
        source: searchParams.destination,
        destination: searchParams.source,
        date: searchParams.returnDate,
        page: returnPage,
        limit,
        sortBy: sortByReturn,
        order: orderReturn
      })
        .then(data => {
          setReturnFlights(data.flights);
          setReturnTotalPages(data.totalPages);
        })
        .catch(() => setError('Failed to fetch return flights'));
    }
  }, [searchParams, returnPage, limit, sortByReturn, orderReturn]);

  const handleBook = () => {
    if (selectedOnward && (!searchParams.returnDate || returnFlights.length === 0 || selectedReturn)) {
      const onwardId = selectedOnward.id;
      const returnId = selectedReturn ? selectedReturn.id : '';
      navigate(`/book/${onwardId}${returnId ? '/' + returnId : ''}`);
    }
  };

  const isRoundTrip = Boolean(searchParams?.returnDate);
  const showReturnColumn = isRoundTrip;
  const showOnwardColumn = searchParams;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Search Flights</h1>

      <div className="mb-6">
        <div className="max-w-3xl mx-auto">
          <SearchForm
            onSearch={(params) => {
              setSearchParams(params);
              setSelectedOnward(null);
              setSelectedReturn(null);
              setOnwardPage(1);
              setReturnPage(1);
            }}
          />
        </div>
      </div>

      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      {(showOnwardColumn || showReturnColumn) && (
        <div className={`grid gap-6 ${showReturnColumn ? 'md:grid-cols-2' : ''}`}>
          {showOnwardColumn && (
            <div>
              {onwardFlights.length > 0 ? (
                <>
                  <h2 className="text-xl font-semibold mb-2">Onward Flights</h2>
                  <SortControls
                    sortBy={sortByOnward}
                    order={orderOnward}
                    onSortChange={(s, o) => {
                      setSortByOnward(s);
                      setOrderOnward(o);
                    }}
                  />
                  <FlightList
                    flights={onwardFlights}
                    selectedFlight={selectedOnward}
                    onSelect={setSelectedOnward}
                    label="onward"
                  />
                  <Pagination
                    page={onwardPage}
                    totalPages={onwardTotalPages}
                    onPageChange={setOnwardPage}
                  />
                </>
              ) : (
                <div className="text-center text-gray-400 italic py-4">No onward flights found.</div>
              )}
            </div>
          )}

          {showReturnColumn && (
            <div>
              {returnFlights.length > 0 ? (
                <>
                  <h2 className="text-xl font-semibold mb-2">Return Flights</h2>
                  <SortControls
                    sortBy={sortByReturn}
                    order={orderReturn}
                    onSortChange={(s, o) => {
                      setSortByReturn(s);
                      setOrderReturn(o);
                    }}
                  />
                  <FlightList
                    flights={returnFlights}
                    selectedFlight={selectedReturn}
                    onSelect={setSelectedReturn}
                    label="return"
                  />
                  <Pagination
                    page={returnPage}
                    totalPages={returnTotalPages}
                    onPageChange={setReturnPage}
                  />
                </>
              ) : (
                <div className="text-center text-gray-400 italic py-4">No return flights found.</div>
              )}
            </div>
          )}
        </div>
      )}

      {(selectedOnward && (!isRoundTrip || returnFlights.length === 0 || selectedReturn)) && (
        <div className="flex justify-center mt-8">
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded disabled:opacity-50"
            onClick={handleBook}
          >
            Book Now
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchPage;