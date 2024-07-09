// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import Sidebar from './components/Sidebar';
import UserDetails from './components/UserDetails';
import BookingDetails from './components/BookingDetails';
import AdminDashboard from './components/AdminDashboard';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <MainContent />
      </Router>
    </AuthProvider>
  );
}

function MainContent() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="*" element={<Login />} />
      </Routes>
    );
  }

  return (
    <div className="App">
      <Sidebar />
      <Routes>
      <Route path="/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/users" element={<ProtectedRoute><UserDetails /></ProtectedRoute>} />
        <Route path="/bookings" element={<ProtectedRoute><BookingDetails /></ProtectedRoute>} />
      </Routes>
    </div>
  );
}

export default App;
