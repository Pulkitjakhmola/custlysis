package com.pblGEHU.Custlysis.controller;

import com.pblGEHU.Custlysis.entity.RecommendationLog;
import com.pblGEHU.Custlysis.repository.RecommendationLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recommendations")
public class RecommendationLogController {

    @Autowired
    private RecommendationLogRepository repo;

    @GetMapping
    public List<RecommendationLog> getAll() {
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<RecommendationLog> getById(@PathVariable Integer id) {
        return repo.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public RecommendationLog create(@RequestBody RecommendationLog log) {
        return repo.save(log);
    }

    @PutMapping("/{id}")
    public ResponseEntity<RecommendationLog> update(@PathVariable Integer id, @RequestBody RecommendationLog updated) {
        return repo.findById(id).map(existing -> {
            updated.setRecId(id);
            return ResponseEntity.ok(repo.save(updated));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        repo.deleteById(id);
    }
}
