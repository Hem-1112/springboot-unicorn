package com.authservice.controller;

import com.authservice.model.Customer;
import com.authservice.model.Token;
import com.authservice.util.JWTHelper;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

@RestController
@RequestMapping("/token")
public class TokenAPI {

    private static Token appUserToken;
    private static final ObjectMapper objectMapper = new ObjectMapper();

    @PostMapping
    public ResponseEntity<?> createTokenForCustomer(@RequestBody Customer customer) {
        String email = customer.getEmail();
        String password = customer.getPassword();

        if (email != null && !email.isEmpty() && password != null && !password.isEmpty() && checkPassword(email, password)) {
            System.err.println("Creating token for user: " + email);
            Token token = createToken(email);
            return ResponseEntity.ok(token);
        }
        System.err.println("Unauthorized access for user: " + email);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
    }

    private boolean checkPassword(String email, String password) {
        Customer cust = getCustomerByEmailFromCustomerAPI(email);
        System.err.println("Customer retrieved: " + cust);
        return cust != null && cust.getEmail().equals(email) && cust.getPassword().equals(password);
    }

    public static Token getAppUserToken() {
        if (appUserToken == null || appUserToken.getToken() == null || appUserToken.getToken().isEmpty()) {
            appUserToken = createToken("ApiClientApp");
        }
        return appUserToken;
    }

    private static Token createToken(String username) {
        String scopes = "com.example.data.apis";
        if ("ApiClientApp".equalsIgnoreCase(username)) {
            scopes = "com.example.auth.apis";
        }
        String tokenString = JWTHelper.createToken(scopes);
        return new Token(tokenString);
    }

    private Customer getCustomerByEmailFromCustomerAPI(String email) {
        try {
            String requestUrl = "http://localhost:8080/api/customers/byemail?email=" + email;
            System.err.println("Requesting customer by email with URL: " + requestUrl);

            URL url = new URL(requestUrl);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Accept", "application/json");

            Token token = getAppUserToken();
            conn.setRequestProperty("Authorization", "Bearer " + token.getToken());

            int responseCode = conn.getResponseCode();
            System.err.println("Response Code: " + responseCode);

            if (responseCode != HttpURLConnection.HTTP_OK) {
                System.err.println("Failed to retrieve customer. Response Code: " + responseCode);
                return null;
            }

            // Read the JSON response
            try (BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()))) {
                StringBuilder response = new StringBuilder();
                String output;
                while ((output = br.readLine()) != null) {
                    response.append(output);
                }

                String jsonResponse = response.toString();
                System.err.println("Response from Customer API: " + jsonResponse);

                // Parse the JSON manually using ObjectMapper
                return objectMapper.readValue(jsonResponse, Customer.class);
            }

        } catch (MalformedURLException e) {
            e.printStackTrace();
            return null;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
}
