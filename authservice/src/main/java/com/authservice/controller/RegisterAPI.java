package com.authservice.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import com.authservice.model.Customer;
import com.authservice.model.CustomerFactory;
import com.authservice.model.Token;
import com.authservice.util.JWTHelper;

@RestController
@RequestMapping("/register")
public class RegisterAPI {

    @PostMapping
    public ResponseEntity<?> registerCustomer(@RequestBody Customer newCustomer, UriComponentsBuilder uri) {
        if (newCustomer.getId() != 0 || newCustomer.getName() == null || newCustomer.getEmail() == null) {
            // Reject if invalid data
            return ResponseEntity.badRequest().body("Invalid customer data");
        }

        // Convert customer object to JSON string
        String jsonString = CustomerFactory.getCustomerAsJSONString(newCustomer);
        System.out.println("Attempting to register customer with the Customer API...");

        // Forward the new customer registration to the Customer API
        try {
            postNewCustomerToCustomerAPI(jsonString);
        } catch (Exception e) {
            System.err.println("Failed to register customer with Customer API");
            e.printStackTrace();
            return ResponseEntity.status(HttpURLConnection.HTTP_INTERNAL_ERROR).body("Failed to register customer");
        }

        // Generate a JWT token for the registered user
        String tokenString = JWTHelper.createToken(newCustomer.getName());
        Token token = new Token(tokenString);
        System.out.println("Customer registered successfully. JWT token generated.");

        // Return the token in the response
        return ResponseEntity.ok(token);
    }

    private void postNewCustomerToCustomerAPI(String jsonString) throws IOException {
        // Assuming jsonString is generated from the Customer object
        URL url = new URL("http://localhost:8080/api/customers");
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setDoOutput(true);
        conn.setRequestMethod("POST");
        conn.setRequestProperty("Content-Type", "application/json");
    
        // Send the JSON data to the Customer API
        try (OutputStream os = conn.getOutputStream()) {
            os.write(jsonString.getBytes());
            os.flush();
        }
    
        // Check the response code from the Customer API
        if (conn.getResponseCode() != HttpURLConnection.HTTP_CREATED) {
            throw new RuntimeException("Failed: HTTP error code : " + conn.getResponseCode());
        }
    
        // Read and log the response from the Customer API
        try (BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()))) {
            String output;
            System.out.println("Response from Customer API:");
            while ((output = br.readLine()) != null) {
                System.out.println(output);
            }
        } finally {
            conn.disconnect();
        }
    }
    
    
}
