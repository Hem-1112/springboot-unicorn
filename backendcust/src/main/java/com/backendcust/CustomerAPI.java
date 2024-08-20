package com.backendcust;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.Optional;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
    @RequestMapping("/customers")
    public class CustomerAPI {
        ArrayList<Customer> list = new ArrayList<Customer>();

        public CustomerAPI() {
            Customer c1 = new Customer(1, "Steve", "pass", "steve@abc.com");
            Customer c2 = new Customer(2, "Bob", "pass", "bob@abc.com");
            Customer c3 = new Customer(3, "Cindy", "pass", "cindy@abc.com");
            list.add(c1);
            list.add(c2);
            list.add(c3);
        }

        @GetMapping
        public String getAll() {
            String response = "[ ";
            for (int i = 0; i < list.size(); i++) {
                response += list.get(i).toJSON();
                if (i + 1 < list.size()) {
                    response += ", ";
                }
            }
            response += " ]";
            return response;
        }

        @GetMapping("/{customerId}")
        public String getCustomerById(@PathVariable("customerId") long id) {
            String response = "{}";
            Optional<Customer> customer = list.stream()
                    .filter(c -> c.getId() == id)
                    .findFirst();
            response = customer.map(Customer::toJSON).orElse("{}");;
            return response;
        }


        @DeleteMapping("/{customerId}")
        public String deleteCustomerById(@PathVariable("customerId") long id) {
            Iterator<Customer> iterator = list.iterator();
            while (iterator.hasNext()) {
                Customer customer = iterator.next();
                if (customer.getId() == id) {
                    iterator.remove();
                    return "{ \"status\": \"success\" }";
                }
            }
            return "{ \"status\": \"failed\" }";
        }

        @PostMapping
        public String addCustomer(@RequestBody String newCustomerJson) {
            ObjectMapper objectMapper = new ObjectMapper();
            try {
                Customer newCustomer = objectMapper.readValue(newCustomerJson, Customer.class);
                list.add(newCustomer);
                return "{ \"status\": \"success\" }";
            } catch (Exception e) {
                return "{ \"status\": \"failed\", \"error\": \"" + e.getMessage() + "\" }";
            }
        }

    @PutMapping("/{customerId}")
    public String updateCustomer(@PathVariable("customerId") long id, @RequestBody String updatedCustomerJson) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            Customer updatedCustomer = objectMapper.readValue(updatedCustomerJson, Customer.class);
            Optional<Customer> existingCustomer = list.stream()
                    .filter(c -> c.getId() == id)
                    .findFirst();
            if (existingCustomer.isPresent()) {
                int index = list.indexOf(existingCustomer.get());
                list.set(index, updatedCustomer);
                return "{ \"status\": \"success\" }";
            } else {
                return "{ \"status\": \"failed\", \"error\": \"Customer not found\" }";
            }
        } catch (Exception e) {
            return "{ \"status\": \"failed\", \"error\": \"" + e.getMessage() + "\" }";
        }
    }

    }