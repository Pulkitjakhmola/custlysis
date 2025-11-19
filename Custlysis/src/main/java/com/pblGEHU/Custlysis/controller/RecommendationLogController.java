package com.pblGEHU.Custlysis.controller;

import com.pblGEHU.Custlysis.dto.RecommendationDTO;
import com.pblGEHU.Custlysis.entity.RecommendationLog;
import com.pblGEHU.Custlysis.entity.SegmentationLabel;
import com.pblGEHU.Custlysis.repository.RecommendationLogRepository;
import com.pblGEHU.Custlysis.repository.SegmentationLabelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/recommendations")
@CrossOrigin(origins = "*")
public class RecommendationLogController {

    @Autowired
    private RecommendationLogRepository repo;
    
    @Autowired
    private SegmentationLabelRepository segmentRepo;

    // Get all recommendations
    @GetMapping
    public List<RecommendationLog> getAll() {
        return repo.findAll();
    }

    // Get recommendations as DTOs with customer and segment info
    @GetMapping("/detailed")
    public List<RecommendationDTO> getAllDetailed() {
        List<RecommendationLog> logs = repo.findAll();
        
        return logs.stream()
            .map(log -> {
                RecommendationDTO dto = new RecommendationDTO();
                dto.setCustomerId(log.getCustomer() != null ? log.getCustomer().getCustomerId() : null);
                dto.setCustomerName(log.getCustomer() != null ? log.getCustomer().getName() : "Unknown");
                dto.setProductId(log.getProduct() != null ? log.getProduct().getProductId() : null);
                dto.setProductName(log.getProduct() != null ? log.getProduct().getName() : "Unknown");
                dto.setProductCategory(log.getProduct() != null ? log.getProduct().getCategory() : "Unknown");
                dto.setConfidence(log.getScore());
                
                // Get customer segment
                if (log.getCustomer() != null) {
                    List<SegmentationLabel> segments = segmentRepo.findAll().stream()
                        .filter(s -> s.getCustomerId().equals(log.getCustomer().getCustomerId()))
                        .collect(Collectors.toList());
                    
                    if (!segments.isEmpty()) {
                        dto.setSegment(segments.get(0).getSegmentName());
                    } else {
                        dto.setSegment("Unassigned");
                    }
                }
                
                // Generate rationale based on segment and product
                dto.setRationale(generateRationale(dto.getSegment(), dto.getProductCategory()));
                
                // Determine priority based on confidence
                if (dto.getConfidence() != null && dto.getConfidence().doubleValue() > 85) {
                    dto.setPriority("High");
                } else {
                    dto.setPriority("Medium");
                }
                
                return dto;
            })
            .collect(Collectors.toList());
    }

    // Get recommendations for a specific customer
    @GetMapping("/customer/{customerId}")
    public List<RecommendationLog> getByCustomer(@PathVariable Integer customerId) {
        return repo.findAll().stream()
            .filter(log -> log.getCustomer() != null && log.getCustomer().getCustomerId().equals(customerId))
            .collect(Collectors.toList());
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
    
    // Helper method to generate rationale
    private String generateRationale(String segment, String productCategory) {
        if (segment == null || productCategory == null) {
            return "Recommended based on customer profile";
        }
        
        if (segment.contains("Digital") && productCategory.contains("Savings")) {
            return "High digital engagement, suitable for online savings products";
        } else if (segment.contains("High-Value") && productCategory.contains("Investment")) {
            return "High income, low risk profile, strong investment potential";
        } else if (segment.contains("Traditional") && productCategory.contains("Savings")) {
            return "Conservative investor, prefers stable savings products";
        } else if (segment.contains("At-Risk")) {
            return "High churn risk, needs retention offer";
        } else if (segment.contains("New")) {
            return "Recent signup, exploring products";
        } else {
            return "Recommended based on segment characteristics and product fit";
        }
    }
}
