package com.pblGEHU.Custlysis.controller;

import com.pblGEHU.Custlysis.entity.Transactions;
import com.pblGEHU.Custlysis.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "*")
public class TransactionController {

    @Autowired
    private TransactionRepository transactionRepository;

    @GetMapping
    public List<Transactions> getAllTransactions() {
        return transactionRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Transactions> getTransactionById(@PathVariable Integer id) {
        Optional<Transactions> transaction = transactionRepository.findById(id);
        return transaction.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Transactions createTransaction(@RequestBody Transactions transaction) {
        return transactionRepository.save(transaction);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Transactions> updateTransaction(@PathVariable Integer id, @RequestBody Transactions transactionDetails) {
        Optional<Transactions> optionalTransaction = transactionRepository.findById(id);
        if (optionalTransaction.isPresent()) {
            Transactions transaction = optionalTransaction.get();
            transaction.setAccountId(transactionDetails.getAccountId());
            transaction.setTxnType(transactionDetails.getTxnType());
            transaction.setAmount(transactionDetails.getAmount());
            transaction.setChannel(transactionDetails.getChannel());
            transaction.setMerchantCategory(transactionDetails.getMerchantCategory());
            transaction.setGeoLocation(transactionDetails.getGeoLocation());
            transaction.setIsRecurring(transactionDetails.getIsRecurring());
            transaction.setIsHighValue(transactionDetails.getIsHighValue());
            transaction.setTxnScore(transactionDetails.getTxnScore());
            return ResponseEntity.ok(transactionRepository.save(transaction));
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTransaction(@PathVariable Integer id) {
        if (transactionRepository.existsById(id)) {
            transactionRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}