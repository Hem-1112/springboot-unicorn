package com.backendcust;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/customers")
public class CustomerAPI {

    @Autowired
    private CustomerRepository repo;

    public CustomerAPI() {
        repo.save(new Customer(1, "John Doe", "john@gmail.com"));
        repo.save(new Customer(2, "Katie Kates", "katie@gmail.com"));
        repo.save(new Customer(3, "John Watson", "watson@gmail.com"));
    }

    @GetMapping
    public List<Customer> getAllCustomers() {
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Customer> getCustomerById(@PathVariable Long id) throws CustomerNotFoundException{
        Optional<Customer> cust = repo.findById(id);

        return cust.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Customer addCustomer(@RequestBody Customer cust) {
        return repo.save(cust);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCustomer(@PathVariable Long id, @RequestBody Customer updatedCustomer) {
        Optional<Customer> cust = repo.findById(id);

        if(cust.isPresent()) {
            Customer c = cust.get();

            c.setEmail(updatedCustomer.getEmail());
            c.setName(updatedCustomer.getName());

            return ResponseEntity.ok(repo.save(c));
        }

        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCustomer(@PathVariable Long id) {
        repo.deleteById(id);;

        return ResponseEntity.noContent().build();
    }
}