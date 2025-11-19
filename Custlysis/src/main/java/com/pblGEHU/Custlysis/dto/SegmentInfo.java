package com.pblGEHU.Custlysis.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SegmentInfo {
    private String segmentId;
    private String segmentName;
    private Long customerCount;
    private Double percentage;
    private BigDecimal avgSegmentScore;
}
