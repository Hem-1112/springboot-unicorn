// src/components/Login.js
import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, Typography } from '@mui/material';
import { login } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const token = await login({ email, password });
      onLoginSuccess(token);
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  const goToRegister = () => {
    navigate('/register');
  };

  return (
    <Paper style={{ padding: '20px', marginTop: '20px' }}>
      <Typography variant="h6" component="div" style={{ paddingBottom: '10px' }}>
        Login
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="contained" color="primary" onClick={handleLogin}>
            Login
          </Button>
          <Button variant="contained" onClick={goToRegister}>
            Register
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Login;
