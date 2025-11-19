package com.pblGEHU.Custlysis.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecommendationDTO {
    private Integer customerId;
    private String customerName;
    private String segment;
    private Integer productId;
    private String productName;
    private String productCategory;
    private BigDecimal confidence;
    private String rationale;
    private String priority;
}
