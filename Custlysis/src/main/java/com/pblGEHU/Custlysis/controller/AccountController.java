package com.pblGEHU.Custlysis.controller;

import com.pblGEHU.Custlysis.entity.Account;
import com.pblGEHU.Custlysis.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/accounts")
@CrossOrigin(origins = "*")
public class AccountController {

    @Autowired
    private AccountRepository accountRepository;

    @GetMapping
    public List<Account> getAllAccounts() {
        return accountRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Account> getAccountById(@PathVariable Integer id) {
        Optional<Account> account = accountRepository.findById(id);
        return account.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Account createAccount(@RequestBody Account account) {
        return accountRepository.save(account);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Account> updateAccount(@PathVariable Integer id, @RequestBody Account accountDetails) {
        Optional<Account> optionalAccount = accountRepository.findById(id);
        if (optionalAccount.isPresent()) {
            Account account = optionalAccount.get();
            account.setCustomerId(accountDetails.getCustomerId());
            account.setAccountType(accountDetails.getAccountType());
            account.setBalance(accountDetails.getBalance());
            account.setAvgMonthlyTxn(accountDetails.getAvgMonthlyTxn());
            account.setOverdraftEnabled(accountDetails.getOverdraftEnabled());
            account.setLastActiveDate(accountDetails.getLastActiveDate());
            account.setTenureMonths(accountDetails.getTenureMonths());
            account.setChannelPreferences(accountDetails.getChannelPreferences());
            account.setDormantFlag(accountDetails.getDormantFlag());
            return ResponseEntity.ok(accountRepository.save(account));
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAccount(@PathVariable Integer id) {
        if (accountRepository.existsById(id)) {
            accountRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}