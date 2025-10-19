package com.pblGEHU.Custlysis.entity;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

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
@Table(name = "Customer")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Customer {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "customer_id")
    private Integer customerId;
    
    @Column(name = "name")
    private String name;
    
    @Column(name = "dob")
    private LocalDate dob;
    
    @Column(name = "gender")
    private String gender;
    
    @Column(name = "marital_status")
    private String maritalStatus;
    
    @Column(name = "educational_level")
    private String educationalLevel;
    
    @Column(name = "occupation")
    private String occupation;
    
    @Column(name = "income_bracket")
    private String incomeBracket;
    
    @Column(name = "location")
    private String location;
    
    @Column(name = "geo_cluster")
    private String geoCluster;
    
    @Column(name = "digital_score")
    private BigDecimal digitalScore;
    
    @Column(name = "risk_profile")
    private String riskProfile;
    
    @Column(name = "preferred_language")
    private String preferredLanguage;
    
    @Column(name = "tenure_days")
    private Integer tenureDays;
    
    @Column(name = "churn_risk_score")
    private BigDecimal churnRiskScore;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
}