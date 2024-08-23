package com.backendauth.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.backendauth.dao.Customer;
import com.backendauth.dao.LoginRequest;

@Service
public class CustomerServiceClient {

    @Autowired
    private RestTemplate restTemplate;

    private final String CUSTOMER_BASE_URL = "http://localhost:8080/api/customers";

    public boolean validateCustomer(String email, String password) {
        String validateUrl = CUSTOMER_BASE_URL + "/validate";
        ResponseEntity<Boolean> resposne = restTemplate.postForEntity(validateUrl, 
        new LoginRequest(email, password),Boolean.class);

        return resposne.getBody() != null && resposne.getBody();
    }

    public HttpStatusCode registerCustomer(Customer customer) {
        ResponseEntity<Void> resposne = restTemplate.postForEntity(CUSTOMER_BASE_URL, customer, Void.class);
        return resposne.getStatusCode();
    }
}
