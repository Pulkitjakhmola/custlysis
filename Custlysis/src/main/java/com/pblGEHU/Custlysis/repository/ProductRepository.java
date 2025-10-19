package com.pblGEHU.Custlysis.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pblGEHU.Custlysis.entity.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
}