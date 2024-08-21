package com.backendcust.repository;

import com.backendcust.domain.Customer;
import org.springframework.data.repository.CrudRepository;

public interface CustomersRepository extends CrudRepository<Customer, Long> {

}
