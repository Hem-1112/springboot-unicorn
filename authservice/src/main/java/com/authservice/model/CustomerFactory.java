package com.authservice.model;

import com.fasterxml.jackson.databind.ObjectMapper;

public class CustomerFactory {

    // Convert Customer object to JSON String
    public static String getCustomerAsJSONString(Customer customer) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            return mapper.writeValueAsString(customer);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    // Convert JSON String to Customer object
    public static Customer getCustomer(String jsonString) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            return mapper.readValue(jsonString, Customer.class);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
