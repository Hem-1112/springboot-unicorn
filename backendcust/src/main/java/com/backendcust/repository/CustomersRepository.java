package com.backendcust.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backendcust.dao.Customer;

@Repository
public interface CustomersRepository extends JpaRepository<Customer, Integer> {

}
