package com.kaoba.dto;

import com.kaoba.entity.RentalStatus;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class RentalResponseDTO {
    private Long id;
    private Long productId;
    private Long userId;
    private LocalDate startDate;
    private LocalDate endDate;
    private RentalStatus status;
    private String productReference;
    private String userEmail;
}
