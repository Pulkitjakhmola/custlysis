package com.pblGEHU.Custlysis.entity;

import java.math.BigDecimal;
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
@Table(name = "Transactions")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Transactions {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "txn_id")
    private Integer txnId;
    
    @Column(name = "account_id")
    private Integer accountId;
    
    @Column(name = "txn_type")
    private String txnType;
    
    @Column(name = "amount")
    private BigDecimal amount;
    
    @Column(name = "timestamp")
    private LocalDateTime timestamp;
    
    @Column(name = "channel")
    private String channel;
    
    @Column(name = "merchant_category")
    private String merchantCategory;
    
    @Column(name = "geo_location")
    private String geoLocation;
    
    @Column(name = "is_recurring")
    private Boolean isRecurring;
    
    @Column(name = "is_high_value")
    private Boolean isHighValue;
    
    @Column(name = "txn_score")
    private BigDecimal txnScore;
}