const apiUrl = 'http://localhost:8080/api/customers'; // Replace with your actual API endpoint

// Fetch all customers
export const fetchCustomers = async () => {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch customers');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching customers:', error);
    return [];
  }
};

// Add a new customer
export const addCustomer = async (customer) => {
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customer),
    });
    if (!response.ok) {
      throw new Error('Failed to add customer');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error adding customer:', error);
    return null;
  }
};

// Update an existing customer
export const updateCustomer = async (customer) => {
  try {
    const response = await fetch(`${apiUrl}/${customer.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customer),
    });
    if (!response.ok) {
      throw new Error('Failed to update customer');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating customer:', error);
    return null;
  }
};

// Delete a customer
export const deleteCustomer = async (customerId) => {
  try {
    const response = await fetch(`${apiUrl}/${customerId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete customer');
    }
    return true;
  } catch (error) {
    console.error('Error deleting customer:', error);
    return false;
  }
};
