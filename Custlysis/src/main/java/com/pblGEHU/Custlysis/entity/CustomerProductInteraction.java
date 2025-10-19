package com.pblGEHU.Custlysis.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerProductInteraction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer interactionId;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    private BigDecimal usageScore;
    private Integer satisfaction;
    @Column(columnDefinition = "TEXT")
    private String feedback;
    private LocalDateTime lastUsed;
    private Boolean isActive;
    private Boolean crossSellFlag;
}
