import React, { useState, useEffect } from 'react';
import { fetchCustomers, addCustomer, updateCustomer, deleteCustomer } from './data.js';
import './App.css';
import CustomerList from './CustomerList';
import CustomerAddUpdateForm from './CustomerAddUpdateForm';

const log = (message) => console.log(message);
const App = () => {
  const [customers, setCustomers] = useState([]);
  const [formObject, setFormObject] = useState({ id: -1, name: '', email: '', password: '' });
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [refresh, setRefresh] = useState(false);
  // const [triggerRefresh, setTriggerRefresh] = useState(false);

  useEffect(() => {
    if (refresh) {
      window.location.reload();
    }
  }, [refresh]);

  useEffect(() => {
    const loadCustomers = async () => {
      const customersData = await fetchCustomers();
      setCustomers(customersData);
    };
    loadCustomers();
  }, []);

  const handleListClick = (item) => {
    log("in handleListClick()");
    if (selectedCustomerId === item.id) {
      setFormObject({ id: -1, name: '', email: '', password: '' });
      setSelectedCustomerId(null);
    } else {
      setFormObject(item);
      setSelectedCustomerId(item.id);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
    log("in handleInputChange()");
  };

  const handleCancelClick = () => {
    log("in handleCancelClick()");
    setFormObject({ id: -1, name: '', email: '', password: '' });
    setSelectedCustomerId(null);
    setRefresh(true);
    // setTriggerRefresh(prevState => !prevState);
  };

  const handleDeleteClick = async () => {
    log("in handleDeleteClick()");
    const success = await deleteCustomer(selectedCustomerId);
    if (success) {
      setCustomers(customers.filter(customer => customer.id !== selectedCustomerId));
      setFormObject({ id: -1, name: '', email: '', password: '' });
      setSelectedCustomerId(null);
    }
    setRefresh(true);
    // setTriggerRefresh(prevState => !prevState);
  };

  const handleSaveClick = async () => {
    log("in handleSaveClick()");
    if (formObject.id === -1) {
      // Add new customer
      const newCustomer = await addCustomer(formObject);
      if (newCustomer) {
        setCustomers([...customers, newCustomer]);
      }
    } else {
      // Update existing customer
      const updatedCustomer = await updateCustomer(formObject);
      if (updatedCustomer) {
        setCustomers(customers.map(customer => (customer.id === updatedCustomer.id ? updatedCustomer : customer)));
      }
    }
    setFormObject({ id: -1, name: '', email: '', password: '' });
    setSelectedCustomerId(null);
    setRefresh(true);
    // setTriggerRefresh(prevState => !prevState);
  };

  return (
    <div>
      <CustomerList
        customers={customers}
        selectedCustomerId={selectedCustomerId}
        handleListClick={handleListClick}
        // refresh={triggerRefresh}
      />
      <CustomerAddUpdateForm
        formObject={formObject}
        handleInputChange={handleInputChange}
        handleDeleteClick={handleDeleteClick}
        handleSaveClick={handleSaveClick}
        handleCancelClick={handleCancelClick}
        // refresh={triggerRefresh}
      />
    </div>
  );
};

export default App;
