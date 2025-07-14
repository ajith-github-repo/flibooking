import axios from 'axios';
import {API_BOOKING} from '../constants/constants';
const BASE_URL = process.env.VITE_API_BASE_URL;

export const submitBooking = async (passengerDetails) => {
  const response = await axios.post(`${BASE_URL}${API_BOOKING}`, passengerDetails);
  return response.data;
};
