package com.pblGEHU.Custlysis.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@IdClass(SegmentKey.class)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SegmentationLabel {
    @Id
    private Integer customerId;

    @Id
    private String segmentId;

    private String segmentName;

    @CreationTimestamp
    private LocalDateTime assignedOn;

    private String modelVersion;
    private BigDecimal segmentScore;
}