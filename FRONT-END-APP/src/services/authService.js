// src/services/authService.js
const baseAuthURL = 'http://localhost:8081/account';

export async function login(credentials) {
  const response = await fetch(`${baseAuthURL}/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  const data = await response.json();
  localStorage.setItem('token', data.token); // Store token in localStorage
  return data.token;
}

export async function register(details) {
  const response = await fetch(`${baseAuthURL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(details),
  });

  if (!response.ok) {
    throw new Error('Registration failed');
  }

  const data = await response.json();
  localStorage.setItem('token', data.token); // Store token in localStorage
  return data.token;
}
