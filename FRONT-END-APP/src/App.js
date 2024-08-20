// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import CustomerList from './components/CustomerList';
import { getAll, post, put, deleteById } from './restdb';
import { Container, Typography } from '@mui/material';


const App = () => {
  const [customers, setCustomers] = useState([]);

  const getCustomers = () => {
    console.log('in getCustomers()');
    getAll(setCustomers);
  };

  useEffect(() => {
    getCustomers();
  }, []);

  

  return (
    <Container>
      <CustomerList
        customers={customers}
        setCustomers={setCustomers}
        getCustomers={getCustomers}
      />
     
    
    </Container>
  );
};

export default App;


