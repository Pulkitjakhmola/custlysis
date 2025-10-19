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
@Table(name = "Account")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Account {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "account_id")
    private Integer accountId;
    
    @Column(name = "customer_id")
    private Integer customerId;
    
    @Column(name = "account_type")
    private String accountType;
    
    @Column(name = "balance")
    private BigDecimal balance;
    
    @Column(name = "avg_monthly_txn")
    private BigDecimal avgMonthlyTxn;
    
    @Column(name = "overdraft_enabled")
    private Boolean overdraftEnabled;
    
    @Column(name = "last_active_date")
    private LocalDateTime lastActiveDate;
    
    @Column(name = "tenure_months")
    private Integer tenureMonths;
    
    @Column(name = "channel_preferences")
    private String channelPreferences;
    
    @Column(name = "dormant_flag")
    private Boolean dormantFlag;
}