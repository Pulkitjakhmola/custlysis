package com.pblGEHU.Custlysis.controller;

import com.pblGEHU.Custlysis.entity.CampaignResponse;
import com.pblGEHU.Custlysis.repository.CampaignResponseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/campaigns")
public class CampaignResponseController {

    @Autowired
    private CampaignResponseRepository repo;

    @GetMapping
    public List<CampaignResponse> getAll() {
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CampaignResponse> getById(@PathVariable Integer id) {
        return repo.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public CampaignResponse create(@RequestBody CampaignResponse response) {
        return repo.save(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CampaignResponse> update(@PathVariable Integer id, @RequestBody CampaignResponse updated) {
        return repo.findById(id).map(existing -> {
            updated.setResponseId(id);
            return ResponseEntity.ok(repo.save(updated));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        repo.deleteById(id);
    }
}
