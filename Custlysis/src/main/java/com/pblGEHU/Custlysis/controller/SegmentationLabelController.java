package com.pblGEHU.Custlysis.controller;

import com.pblGEHU.Custlysis.entity.SegmentationLabel;
import com.pblGEHU.Custlysis.entity.SegmentKey;
import com.pblGEHU.Custlysis.repository.SegmentationLabelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/segments")
public class SegmentationLabelController {

    @Autowired
    private SegmentationLabelRepository repo;

    @GetMapping
    public List<SegmentationLabel> getAll() {
        return repo.findAll();
    }

    @GetMapping("/{customerId}/{segmentId}")
    public ResponseEntity<SegmentationLabel> getByKey(@PathVariable Integer customerId, @PathVariable String segmentId) {
        SegmentKey key = new SegmentKey(customerId, segmentId);
        return repo.findById(key).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public SegmentationLabel create(@RequestBody SegmentationLabel label) {
        return repo.save(label);
    }

    @PutMapping("/{customerId}/{segmentId}")
    public ResponseEntity<SegmentationLabel> update(@PathVariable Integer customerId, @PathVariable String segmentId, @RequestBody SegmentationLabel updated) {
        SegmentKey key = new SegmentKey(customerId, segmentId);
        return repo.findById(key).map(existing -> {
            updated.setCustomerId(customerId);
            updated.setSegmentId(segmentId);
            return ResponseEntity.ok(repo.save(updated));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{customerId}/{segmentId}")
    public void delete(@PathVariable Integer customerId, @PathVariable String segmentId) {
        SegmentKey key = new SegmentKey(customerId, segmentId);
        repo.deleteById(key);
    }
}
