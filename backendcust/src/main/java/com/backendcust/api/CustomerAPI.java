package com.backendcust.api;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.Optional;

import com.backendcust.domain.Customer;
import com.backendcust.repository.CustomersRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
    @RequestMapping("/customers")
    public class CustomerAPI {

    @Autowired
    CustomersRepository repo;
    @CrossOrigin(origins = "http://localhost:3000")

    @GetMapping
    public Iterable<Customer> getAll() {
        return repo.findAll();
    }

    @GetMapping("/{customerId}")
    public Optional<Customer> getCustomerById(@PathVariable("customerId") long id) {
        return repo.findById(id);
    }


    @DeleteMapping("/{customerId}")
    public ResponseEntity<?> deleteCustomerById(
            @PathVariable("customerId") long id
    ){
        repo.deleteById(id);
        return ResponseEntity.status(HttpStatus.ACCEPTED).build();
    }

    @PostMapping
    public ResponseEntity<?> postCustomer(
            @RequestBody String newCustomerJson
    ) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            Customer newCustomer = objectMapper.readValue(newCustomerJson, Customer.class);
            repo.save(newCustomer);
        return ResponseEntity.status(HttpStatus.ACCEPTED).build();
        } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }


    @PutMapping("/{customerId}")
    public ResponseEntity<?> putCustomer(
            @RequestBody String updatedCustomerJson,
            @PathVariable("customerId") long customerId) throws JsonProcessingException {

        ObjectMapper objectMapper = new ObjectMapper();
        Customer updatedCustomer = objectMapper.readValue(updatedCustomerJson, Customer.class);
            if ( updatedCustomer.getName() == null || updatedCustomer.getEmail() == null) {
                return ResponseEntity.badRequest().build();
            }
            updatedCustomer.setId(customerId);
            repo.save(updatedCustomer);
        return ResponseEntity.status(HttpStatus.ACCEPTED).build();

    }
}