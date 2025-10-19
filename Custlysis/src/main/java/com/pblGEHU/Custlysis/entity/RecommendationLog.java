package com.pblGEHU.Custlysis.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecommendationLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer recId;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    private BigDecimal score;
    private String modelVersion;

    @CreationTimestamp
    private LocalDateTime timestamp;

    private Boolean accepted;
    @Column(columnDefinition = "TEXT")
    private String feedback;
}
