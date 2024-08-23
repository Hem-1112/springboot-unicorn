package com.backendauth.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestClient.ResponseSpec;

import com.backendauth.dao.Customer;
import com.backendauth.dao.LoginRequest;
import com.backendauth.security.JwtUtil;
import com.backendauth.service.CustomerServiceClient;

@RestController
@RequestMapping("/account")
public class AuthServiceController {

    @Autowired
    private CustomerServiceClient customerServiceClient;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<String> registerCustomer(@RequestBody Customer customer) {
        HttpStatusCode status = customerServiceClient.registerCustomer(customer);
        if (status == HttpStatus.CREATED) {
            return ResponseEntity.ok("User Registered successfully");
        } else {
            return ResponseEntity.status(status).body("Failed to register user");
        }
    }

    public ResponseEntity<String> generateToken(@RequestBody LoginRequest loginRequest) {
        if (customerServiceClient.validateCustomer(loginRequest.getEmail(), loginRequest.getPassword())) {
            String token = jwtUtil.generateToken(loginRequest.getEmail());
            return ResponseEntity.ok(token);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}
