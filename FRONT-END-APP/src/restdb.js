// src/restdb.js
const baseURL = 'http://localhost:4000/customers';

export async function getAll(setCustomers) {
  const myInit = {
    method: 'GET',
    mode: 'cors'
  };
  const fetchData = async (url) => {
    try {
      const response = await fetch(url, myInit);
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.status}`);
      }
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      alert(error);
    }
  };
  fetchData(baseURL);
}

export async function post(customer, callback) {
  // Fetch the current list of customers to determine the next ID
  const response = await fetch(baseURL);
  const customers = await response.json();
  const nextId = customers.length > 0 ? Math.max(...customers.map(c => c.id)) + 1 : 1;
  customer.id = nextId;

  const myInit = {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(customer)
  };
  try {
    const response = await fetch(baseURL, myInit);
    if (!response.ok) {
      throw new Error(`Error posting data: ${response.status}`);
    }
    callback();
  } catch (error) {
    alert(error);
  }
}

export async function put(id, customer, callback) {
  const myInit = {
    method: 'PUT',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(customer)
  };
  try {
    const response = await fetch(`${baseURL}/${id}`, myInit);
    if (!response.ok) {
      throw new Error(`Error putting data: ${response.status}`);
    }
    callback();
  } catch (error) {
    alert(error);
  }
}

export async function deleteById(id, callback) {
  const myInit = {
    method: 'DELETE',
    mode: 'cors'
  };
  try {
    const response = await fetch(`${baseURL}/${id}`, myInit);
    if (!response.ok) {
      throw new Error(`Error deleting data: ${response.status}`);
    }
    callback();
  } catch (error) {
    alert(error);
  }
}
