package com.kaoba.dto;

import lombok.Data;

@Data
public class ContactRequestDTO {
    private String nomComplet;
    private String email;
    private String sujet;
    private String message;
}
