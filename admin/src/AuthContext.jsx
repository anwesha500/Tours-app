// src/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

const EXPIRATION_TIME = 30 * 60 * 1000; // 30 minutes in milliseconds

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedSession = localStorage.getItem('authSession');
    if (storedSession) {
      const { timestamp } = JSON.parse(storedSession);
      if (Date.now() - timestamp < EXPIRATION_TIME) {
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem('authSession');
      }
    }
  }, []);

  const login = (username, password) => {
    if (username === 'admin' && password === 'admin123') {
      setIsAuthenticated(true);
      localStorage.setItem(
        'authSession',
        JSON.stringify({ timestamp: Date.now() })
      );
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('authSession');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
