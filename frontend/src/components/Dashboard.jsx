import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');
  const [userDetails, setUserDetails] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showBookings, setShowBookings] = useState(false);

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserDetails(response.data.user);
      setShowDetails(true); // Show details by default
    } catch (error) {
      console.error('Error fetching user details:', error);
      setError('Failed to fetch user details. Please try again.');
    }
  };

  const fetchUserBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/api/users/me/bookings', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBookings(response.data.bookings);
      setShowDetails(false); // Hide details when fetching bookings
      setShowBookings(true); // Show bookings after fetching them
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setError('Failed to fetch bookings. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleViewDetails = () => {
    fetchUserDetails();
    setShowBookings(false); // Hide bookings
  };

  const handleViewBookings = () => {
    fetchUserBookings();
    setShowDetails(false); // Hide details
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome to the Dashboard</h1>
      <p>You are successfully logged in!</p>

      {error && <p>{error}</p>}

      <div className="buttons-container">
        <button onClick={handleViewDetails}>View My Details</button>
        <button onClick={handleViewBookings}>View My Bookings</button>
        <button onClick={handleLogout}>Logout</button>
      </div>

      {showDetails && userDetails && (
        <div className="user-details">
          <h2>Your Details:</h2>
          <p><strong>Username:</strong> {userDetails.username}</p>
          <p><strong>Email:</strong> {userDetails.email}</p>
          <hr />
        </div>
      )}

      {showBookings && (
        <div className="booked-list">
          <h2>Your Bookings:</h2>
          <ul>
            {bookings.map((booking) => (
              <li key={booking._id}>
                <strong>Tour Name:</strong> {booking.tourName} <br />
                <strong>Price Tier:</strong> {booking.priceTier} <br />
                <strong>Number of People:</strong> {booking.numberOfPeople} <br />
                <strong>Total Amount:</strong> {booking.totalAmount} {booking.currency} <br />
                <hr />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
