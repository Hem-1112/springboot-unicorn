import axios from "axios";

const BASE_URL = "http://localhost:8080/api/customers";

export const getAllCustomers = async () => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data;
    } catch (error) {
        console.log("Error fetching customers", error);
        throw error;
    }
};

export const addCustomer = async (customer) => {
    try {
        console.log("In add customer")
        const response = await axios.post(BASE_URL, customer);
        return response.data;
    } catch (error) {
        console.log("Error adding customer", error);
        throw error;
    }
};

export const updateCustomer = async (id, customer) => {
    try {
        console.log("In update customer");
        const response = await axios.put(`${BASE_URL}/${id}`, customer);
        return response.data;
    } catch (error) {
        console.log("Error updating customer", error);
        throw error;
    }
};

export const deleteCustomer = async (id) => {
    try {
        await axios.delete(`${BASE_URL}/${id}`);
     } catch (error) {
        console.log("Error deleting customer", error);
        throw error;
    }
};