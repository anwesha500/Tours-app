// Sidebar.jsx
import '../css/Sidebar.css'
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
const Sidebar = () => {
  const { logout } = useAuth();
  return (
    <div className="sidebar">
      <ul>
        <li><Link to="/dashboard">Admin Dashboard</Link></li>
        <li><Link to="/users">User Details</Link></li>
        <li><Link to="/bookings">Booking Details</Link></li>
      </ul>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Sidebar;
