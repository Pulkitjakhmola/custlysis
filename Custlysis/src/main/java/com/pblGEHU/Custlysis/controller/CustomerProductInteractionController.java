package com.pblGEHU.Custlysis.controller;

import java.util.List;

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

import com.pblGEHU.Custlysis.entity.CustomerProductInteraction;
import com.pblGEHU.Custlysis.repository.CustomerProductInteractionRepository;

@RestController
@RequestMapping("/api/interactions")
public class CustomerProductInteractionController {

    @Autowired
    private CustomerProductInteractionRepository repo;

    @GetMapping
    public List<CustomerProductInteraction> getAll() {
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CustomerProductInteraction> getById(@PathVariable Integer id) {
        return repo.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public CustomerProductInteraction create(@RequestBody CustomerProductInteraction interaction) {
        return repo.save(interaction);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CustomerProductInteraction> update(@PathVariable Integer id, @RequestBody CustomerProductInteraction updated) {
        return repo.findById(id).map(existing -> {
            updated.setInteractionId(id);
            return ResponseEntity.ok(repo.save(updated));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        repo.deleteById(id);
    }
}
