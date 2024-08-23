package com.backendcust.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backendcust.dao.Customer;
import com.backendcust.repository.CustomersRepository;

@Service
public class CustomerService {

    @Autowired
    private CustomersRepository customersRepository;

    public List<Customer> getAllCustomers() {
        return customersRepository.findAll();
    }

    public Optional<Customer> getCustomerById (int id) {
        return customersRepository.findById(id);
    }

    public void deleteCustomerById(int id) {
        customersRepository.deleteById(id);
    }

    public Customer addCustomer(Customer customer) {
        return customersRepository.save(customer);
    }

    public Customer updateCustomer(int id, Customer updatedCustomer) {
        return customersRepository.findById(id).map(customer -> {
            customer.setName(updatedCustomer.getName());
            customer.setEmail(updatedCustomer.getEmail());
            customer.setPassword(updatedCustomer.getPassword());
            return customersRepository.save(customer);
        })
        .orElseThrow(() -> new RuntimeException("Customer not found"));
    }
}
