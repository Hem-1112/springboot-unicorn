package com.backendcust.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backendcust.model.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

}
