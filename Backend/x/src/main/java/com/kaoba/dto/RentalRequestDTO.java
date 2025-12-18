package com.kaoba.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class RentalRequestDTO {
    private Long productId;
    private Long userId;
    private LocalDate startDate;
    private LocalDate endDate;
}
