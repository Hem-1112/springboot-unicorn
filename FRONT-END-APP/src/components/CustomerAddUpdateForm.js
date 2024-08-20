// src/components/CustomerAddUpdateForm.js
import React from 'react';
import {
  TextField, Button, Grid, Paper, Typography
} from '@mui/material';

const CustomerAddUpdateForm = ({ formTitle, customer, onInputChange, onSave, onDelete, onCancel }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onInputChange(name, value);
  };

  const handleButtonClick = (action) => {
    if (action === 'Delete') {
      onDelete();
    } else if (action === 'Save') {
      onSave();
    } else if (action === 'Cancel') {
      onCancel();
    }
  };

  return (
    <Paper style={{ padding: '20px', marginTop: '20px' }}>
      <Typography variant="h6" component="div" style={{ paddingBottom: '10px' }}>
        {formTitle}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={customer.name}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={customer.email}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={customer.password}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="contained" color="secondary" onClick={() => handleButtonClick('Delete')}>
            Delete
          </Button>
          <Button variant="contained" color="primary" onClick={() => handleButtonClick('Save')}>
            Save
          </Button>
          <Button variant="contained" onClick={() => handleButtonClick('Cancel')}>
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CustomerAddUpdateForm;
