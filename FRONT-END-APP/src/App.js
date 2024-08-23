// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import CustomerList from './components/CustomerList';
import Login from './components/Login';
import Register from './components/Register';
import { getAll } from './restdb';
import { Container, Button,IconButton } from '@mui/material';
import { Logout } from '@mui/icons-material';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';

const App = () => {
  const [customers, setCustomers] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  const getCustomers = () => {
    getAll(setCustomers);
  };

  
  useEffect(() => {
    if (isAuthenticated) {
      checkTokenExpiration();
      getCustomers();
    }
  }, [isAuthenticated]);

  const handleLoginSuccess = (token) => {
    setIsAuthenticated(true);
  };

  const handleRegisterSuccess = (token) => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  const checkTokenExpiration = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      if (decodedToken.exp * 1000 < Date.now()) {
        handleLogout();
      }
    }
  };
  
  
  return (
  
      <Container>
        {/* {isAuthenticated && (
          <Button
            variant="contained"
            color="secondary"
            onClick={handleLogout}
            style={{ marginBottom: '1px' }}
          >
            Logout
          </Button>
        )} */}
        {isAuthenticated && (
          <div style={{ position: 'absolute', top: 10, right: 10 }}>
            <IconButton onClick={handleLogout} color="secondary">
              <Logout />
            </IconButton>
          </div>
        )}
        <Routes>
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/" /> : <Login onLoginSuccess={handleLoginSuccess} />}
          />
          <Route
            path="/register"
            element={isAuthenticated ? <Navigate to="/" /> : <Register onRegisterSuccess={handleRegisterSuccess} />}
          />
          <Route
            path="/"
            element={isAuthenticated ? <CustomerList customers={customers} setCustomers={setCustomers} getCustomers={getCustomers} /> : <Navigate to="/login" />}
          />
        </Routes>
      </Container>
  
  );
};

export default App;
