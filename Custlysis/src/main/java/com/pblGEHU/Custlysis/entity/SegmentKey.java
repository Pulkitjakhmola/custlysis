package com.pblGEHU.Custlysis.entity;

import lombok.*;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SegmentKey implements Serializable {
    private Integer customerId;
    private String segmentId;
}
