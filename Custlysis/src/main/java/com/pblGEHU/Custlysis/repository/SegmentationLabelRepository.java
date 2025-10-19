package com.pblGEHU.Custlysis.repository;

import com.pblGEHU.Custlysis.entity.SegmentationLabel;
import com.pblGEHU.Custlysis.entity.SegmentKey;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SegmentationLabelRepository extends JpaRepository<SegmentationLabel, SegmentKey> {
}
