import axios from 'axios';
import {API_FLIGHTS,API_FLIGHTS_SEARCH} from '../constants/constants';
const BASE_URL = process.env.VITE_API_BASE_URL;

export const fetchFlights = async ({ source, destination, date, sortBy, order, page, limit }) => {
  const response = await axios.get(`${BASE_URL}${API_FLIGHTS_SEARCH}`, {
    params: { source, destination, date, sortBy, order, page, limit }
  });
  return response.data;
};

export const getFlightById = async (id) => {
    const response = await axios.get(`${BASE_URL}${API_FLIGHTS}${id}`);
    return response.data;
};