package com.pblGEHU.Custlysis.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pblGEHU.Custlysis.entity.Account;

@Repository
public interface AccountRepository extends JpaRepository<Account, Integer> {
}