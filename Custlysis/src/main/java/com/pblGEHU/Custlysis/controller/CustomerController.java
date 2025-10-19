package com.pblGEHU.Custlysis.controller;

import com.pblGEHU.Custlysis.entity.Customer;
import com.pblGEHU.Custlysis.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/customers")
@CrossOrigin(origins = "*")
public class CustomerController {

    @Autowired
    private CustomerRepository customerRepository;

    @GetMapping
    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Customer> getCustomerById(@PathVariable Integer id) {
        Optional<Customer> customer = customerRepository.findById(id);
        return customer.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Customer createCustomer(@RequestBody Customer customer) {
        return customerRepository.save(customer);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Customer> updateCustomer(@PathVariable Integer id, @RequestBody Customer customerDetails) {
        Optional<Customer> optionalCustomer = customerRepository.findById(id);
        if (optionalCustomer.isPresent()) {
            Customer customer = optionalCustomer.get();
            customer.setName(customerDetails.getName());
            customer.setDob(customerDetails.getDob());
            customer.setGender(customerDetails.getGender());
            customer.setMaritalStatus(customerDetails.getMaritalStatus());
            customer.setEducationalLevel(customerDetails.getEducationalLevel());
            customer.setOccupation(customerDetails.getOccupation());
            customer.setIncomeBracket(customerDetails.getIncomeBracket());
            customer.setLocation(customerDetails.getLocation());
            customer.setGeoCluster(customerDetails.getGeoCluster());
            customer.setDigitalScore(customerDetails.getDigitalScore());
            customer.setRiskProfile(customerDetails.getRiskProfile());
            customer.setPreferredLanguage(customerDetails.getPreferredLanguage());
            customer.setTenureDays(customerDetails.getTenureDays());
            customer.setChurnRiskScore(customerDetails.getChurnRiskScore());
            return ResponseEntity.ok(customerRepository.save(customer));
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCustomer(@PathVariable Integer id) {
        if (customerRepository.existsById(id)) {
            customerRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}