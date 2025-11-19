package com.pblGEHU.Custlysis.controller;

import com.pblGEHU.Custlysis.dto.SegmentInfo;
import com.pblGEHU.Custlysis.entity.SegmentationLabel;
import com.pblGEHU.Custlysis.entity.SegmentKey;
import com.pblGEHU.Custlysis.repository.SegmentationLabelRepository;
import com.pblGEHU.Custlysis.service.MLIntegrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/segmentation")
@CrossOrigin(origins = "*")
public class SegmentationLabelController {

    @Autowired
    private SegmentationLabelRepository repo;
    
    @Autowired
    private MLIntegrationService mlService;

    // Get all segment labels
    @GetMapping("/labels")
    public List<SegmentationLabel> getAll() {
        return repo.findAll();
    }

    // Get segment statistics
    @GetMapping("/segments")
    public List<SegmentInfo> getSegmentStats() {
        List<SegmentationLabel> allLabels = repo.findAll();
        
        // Group by segment and calculate statistics
        Map<String, List<SegmentationLabel>> grouped = allLabels.stream()
            .collect(Collectors.groupingBy(SegmentationLabel::getSegmentId));
        
        long totalCustomers = allLabels.size();
        
        return grouped.entrySet().stream()
            .map(entry -> {
                String segmentId = entry.getKey();
                List<SegmentationLabel> labels = entry.getValue();
                long count = labels.size();
                double percentage = totalCustomers > 0 ? (count * 100.0 / totalCustomers) : 0;
                
                BigDecimal avgScore = labels.stream()
                    .map(SegmentationLabel::getSegmentScore)
                    .filter(score -> score != null)
                    .reduce(BigDecimal.ZERO, BigDecimal::add)
                    .divide(BigDecimal.valueOf(count), 2, BigDecimal.ROUND_HALF_UP);
                
                String segmentName = labels.isEmpty() ? segmentId : labels.get(0).getSegmentName();
                
                return new SegmentInfo(segmentId, segmentName, count, percentage, avgScore);
            })
            .collect(Collectors.toList());
    }

    // Get customer's segment
    @GetMapping("/customer/{customerId}")
    public ResponseEntity<SegmentationLabel> getCustomerSegment(@PathVariable Integer customerId) {
        List<SegmentationLabel> labels = repo.findAll().stream()
            .filter(label -> label.getCustomerId().equals(customerId))
            .collect(Collectors.toList());
        
        if (labels.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        
        // Return the most recent assignment
        return ResponseEntity.ok(labels.get(0));
    }

    // Train ML model
    @PostMapping("/train")
    public ResponseEntity<String> trainModel() {
        String result = mlService.trainModel();
        return ResponseEntity.ok(result);
    }

    // Get segment by key
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
