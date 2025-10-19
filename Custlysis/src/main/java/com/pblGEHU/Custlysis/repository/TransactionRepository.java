package com.pblGEHU.Custlysis.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pblGEHU.Custlysis.entity.Transactions;

@Repository
public interface TransactionRepository extends JpaRepository<Transactions, Integer> {
}