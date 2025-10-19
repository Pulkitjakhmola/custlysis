package com.pblGEHU.Custlysis.entity;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Product")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private Integer productId;
    
    @Column(name = "name")
    private String name;
    
    @Column(name = "category")
    private String category;
    
    @Column(name = "sub_category")
    private String subCategory;
    
    @Column(name = "features", columnDefinition = "TEXT")
    private String features;
    
    @Column(name = "risk_level")
    private String riskLevel;
    
    @Column(name = "eligibility_rules", columnDefinition = "TEXT")
    private String eligibilityRules;
    
    @Column(name = "avg_rating")
    private BigDecimal avgRating;
    
    @Column(name = "popularity_score")
    private BigDecimal popularityScore;
}