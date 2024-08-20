// src/components/CustomerList.js
import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TablePagination, IconButton, TextField, Button, InputAdornment
} from '@mui/material';
import { Edit, Save, Cancel, Add, Search, Visibility, VisibilityOff, Delete } from '@mui/icons-material';
import { post, put, deleteById } from '../restdb';

const CustomerList = ({ customers, setCustomers, getCustomers }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editingCustomerId, setEditingCustomerId] = useState(null);
  const [newCustomer, setNewCustomer] = useState({ id: null, name: '', email: '', password: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [showPassword, setShowPassword] = useState({});

  const handleCustomerClick = (customer) => {
    setEditingCustomerId(customer.id);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleInputChange = (e, id) => {
    const { name, value } = e.target;
    const updatedCustomers = customers.map(customer =>
      customer.id === id ? { ...customer, [name]: value } : customer
    );
    setCustomers(updatedCustomers);
  };

  const handleNewInputChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer({ ...newCustomer, [name]: value });
  };

  const handleAddNewCustomer = () => {
    if (newCustomer.name && newCustomer.email && newCustomer.password) {
      post(newCustomer, getCustomers);
      setNewCustomer({ id: null, name: '', email: '', password: '' });
    }
  };

  const handleSave = (id) => {
    const customer = customers.find(customer => customer.id === id);
    put(id, customer, getCustomers);
    setEditingCustomerId(null);
  };

  const handleCancel = () => {
    setEditingCustomerId(null);
  };

  const handleDelete = (id) => {
    deleteById(id, getCustomers);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const togglePasswordVisibility = (id) => {
    setShowPassword(prevState => ({ ...prevState, [id]: !prevState[id] }));
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedCustomers = filteredCustomers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Paper elevation={3} style={{ padding: '20px', marginBottom: '10px', marginTop: '10px' }}>
      <Typography variant="h5" component="div" style={{ padding: '10px 0', textAlign: 'center' }}>
        Customer Management
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search by name or email"
        value={searchTerm}
        onChange={handleSearchChange}
        InputProps={{
          startAdornment: <InputAdornment position="start"><Search /></InputAdornment>,
        }}
        style={{ marginBottom: '20px' }}
      />
      <div style={{ marginBottom: '20px' }}>
        <Typography variant="h6">Add New Customer</Typography>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <TextField
                  fullWidth
                  name="name"
                  value={newCustomer.name}
                  onChange={handleNewInputChange}
                  placeholder="Name"
                />
              </TableCell>
              <TableCell>
                <TextField
                  fullWidth
                  name="email"
                  value={newCustomer.email}
                  onChange={handleNewInputChange}
                  placeholder="Email"
                />
              </TableCell>
              <TableCell>
                <TextField
                  fullWidth
                  name="password"
                  value={newCustomer.password}
                  onChange={handleNewInputChange}
                  placeholder="Password"
                />
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddNewCustomer}
                  startIcon={<Add />}
                >
                  Add
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><Typography variant="subtitle1" fontWeight="bold">Name</Typography></TableCell>
              <TableCell><Typography variant="subtitle1" fontWeight="bold">Email</Typography></TableCell>
              <TableCell><Typography variant="subtitle1" fontWeight="bold">Password</Typography></TableCell>
              <TableCell><Typography variant="subtitle1" fontWeight="bold">Actions</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCustomers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>
                  {editingCustomerId === customer.id ? (
                    <TextField
                      fullWidth
                      name="name"
                      value={customer.name}
                      onChange={(e) => handleInputChange(e, customer.id)}
                    />
                  ) : (
                    customer.name
                  )}
                </TableCell>
                <TableCell>
                  {editingCustomerId === customer.id ? (
                    <TextField
                      fullWidth
                      name="email"
                      value={customer.email}
                      onChange={(e) => handleInputChange(e, customer.id)}
                    />
                  ) : (
                    customer.email
                  )}
                </TableCell>
                <TableCell>
                  {editingCustomerId === customer.id ? (
                    <TextField
                      fullWidth
                      name="password"
                      type={showPassword[customer.id] ? 'text' : 'password'}
                      value={customer.password}
                      onChange={(e) => handleInputChange(e, customer.id)}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={() => togglePasswordVisibility(customer.id)}>
                              {showPassword[customer.id] ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  ) : (
                    <>
                      {showPassword[customer.id] ? customer.password : '******'}
                      <IconButton onClick={() => togglePasswordVisibility(customer.id)}>
                        {showPassword[customer.id] ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </>
                  )}
                </TableCell>
                <TableCell>
                  {editingCustomerId === customer.id ? (
                    <>
                      <IconButton onClick={() => handleSave(customer.id)} color="primary">
                        <Save />
                      </IconButton>
                      <IconButton onClick={handleCancel} color="secondary">
                        <Cancel />
                      </IconButton>
                    </>
                  ) : (
                    <>
                      <IconButton onClick={() => handleCustomerClick(customer)}>
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(customer.id)} color="error">
                        <Delete />
                      </IconButton>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={filteredCustomers.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Paper>
  );
};

export default CustomerList;
