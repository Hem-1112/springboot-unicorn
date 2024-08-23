import './App.css';
import { CustomersList } from './CustomersList';
import { CustomerAddUpdateForm } from './CustomerAddUpdateForm';
import { useState, useEffect } from 'react';
import {
  getAllCustomers,
  deleteCustomer,
  addCustomer,
  updateCustomer
} from "./CustomerService";

function App() {

  let blankCustomer = {"id": null, "name": "", "email": "", "password": "" };
  let [customers, setCustomers] = useState([]);
  let [formData, setFormData] = useState(blankCustomer);
  let [selectedCustomerId, setSelectedCustomerId] = useState(null);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      setCustomers(await getAllCustomers());
    } catch (error) {
      console.log("Error loading customers", error);
    }
  };

  const handleInputChange = function(e) {
    console.log("in handleInputChange()");
    let {name, value} = e.target;
    setFormData({...formData, [name] : value});
  }

  const handleListClick = (customer) => {
    console.log("in handleListClick()");
    if(selectedCustomerId === customer.id) {
      setFormData(blankCustomer);
      setSelectedCustomerId(null);
    } else {
      setFormData(customer);
      setSelectedCustomerId(customer.id);
    }
  }

  let onCancelClick = function () {
    setFormData(blankCustomer);
    setSelectedCustomerId(null);
    console.log("in onCancelClick()");
  }

  let onDeleteClick = async () => {
    console.log("in onDeleteClick()");
    if(!formData.id) return;
    try {
      await deleteCustomer(formData.id);
      loadCustomers();
      setFormData(blankCustomer);
      setSelectedCustomerId(null);
    } catch (error) {
      console.log("Error deleting customer", error);
    }
  }

  let onSaveClick = async (e) => {
    console.log("in onSaveClick()");
    e.preventDefault();
    try {
      if(formData.id) {
        await updateCustomer(formData.id, formData);
      } else {
        await addCustomer(formData);
      }
      loadCustomers();
      setFormData(blankCustomer);
      setSelectedCustomerId(null);
    } catch (error) {
      console.log("Error Submitting Form", error);
    }
  }

  return (
    <div className="App">
      <p><b>Team Unicorn</b></p>
      <CustomersList 
        customers={customers} selectedCustomerId={selectedCustomerId} handleListClick={handleListClick}>
      </CustomersList>

      <CustomerAddUpdateForm
        formData={formData}
        handleInputChange={handleInputChange}
        onSaveClick={onSaveClick}
        onDeleteClick={onDeleteClick}
        onCancelClick={onCancelClick}>
      </CustomerAddUpdateForm>
    </div>
  );
}

export default App;