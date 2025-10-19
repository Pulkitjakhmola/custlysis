package com.pblGEHU.Custlysis.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pblGEHU.Custlysis.entity.Customer;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer> {
}