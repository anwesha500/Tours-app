import axios from 'axios';

const baseURL = 'http://localhost:3000/api'; // Assuming backend API endpoint

export const getUsers = async () => {
  try {
    const response = await axios.get(`${baseURL}/users/`);
    return response.data.users;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    await axios.delete(`${baseURL}/users/${userId}`);
    return true;
  } catch (error) {
    throw error;
  }
};

export const getBookings = async (userId) => {
  try {
    const response = await axios.get(`${baseURL}/users/${userId}/bookings`);
    return response.data.bookings;
  } catch (error) {
    throw error;
  }
};

export const deleteBooking = async (userId, bookingId) => {
  try {
    await axios.delete(`${baseURL}/users/${userId}/bookings/${bookingId}`);
    return true;
  } catch (error) {
    throw error;
  }
};

// Add User function
export const addUser = async (userData) => {
  try {
    const response = await axios.post(`${baseURL}/users/`, userData);
    return response.data.user;
  } catch (error) {
    throw error;
  }
};

// api.js

// Existing imports and functions

export const addBooking = async (userId, bookingData) => {
  try {
    const response = await axios.post(`${baseURL}/users/${userId}/bookings`, bookingData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (userId, updatedData) => {
  const response = await axios.put(`${baseURL}/users/${userId}`, updatedData);
  return response.data.user;
};

export const updateBooking = async (userId, bookingId, updatedBookingData) => {
  try {
    const response = await axios.put(`${baseURL}/users/${userId}/bookings/${bookingId}`, updatedBookingData);
    return response.data;  // Assuming your backend returns the updated booking object
  } catch (error) {
    throw Error(`Error updating booking: ${error}`);
  }
};
// Add functions for adding bookings and other operations as needed
