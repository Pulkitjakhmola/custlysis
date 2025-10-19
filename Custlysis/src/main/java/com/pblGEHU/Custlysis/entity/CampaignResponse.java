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
public class CampaignResponse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer responseId;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;

    private Integer campaignId;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    private String response;

    @CreationTimestamp
    private LocalDateTime timestamp;

    private String channel;
    private BigDecimal conversionScore;
}
