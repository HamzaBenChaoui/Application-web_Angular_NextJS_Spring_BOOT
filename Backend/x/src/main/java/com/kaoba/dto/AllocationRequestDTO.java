package com.kaoba.dto;

import lombok.Data;

@Data
public class AllocationRequestDTO {
    private String fullName;
    private String cne;
    private String address;
    private String phoneNumber;
    private String email;
    private String productName;
    private String productType;
    private double price;
}
