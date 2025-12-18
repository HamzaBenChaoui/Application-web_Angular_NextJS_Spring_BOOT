package com.kaoba.controller;

import com.kaoba.dto.RentalRequestDTO;
import com.kaoba.dto.RentalResponseDTO;
import com.kaoba.service.RentalService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rentals")
@RequiredArgsConstructor
public class RentalController {

    private final RentalService rentalService;

    @GetMapping
    public ResponseEntity<List<RentalResponseDTO>> getAllRentals() {
        return ResponseEntity.ok(rentalService.getAllRentals());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<RentalResponseDTO>> getRentalsByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(rentalService.getRentalsByUserId(userId));
    }

    @PostMapping("/rent")
    public ResponseEntity<RentalResponseDTO> rentProduct(@RequestBody RentalRequestDTO rentalRequestDTO) {
        return ResponseEntity.ok(rentalService.rentProduct(rentalRequestDTO));
    }

    @PutMapping("/{rentalId}/end")
    public ResponseEntity<RentalResponseDTO> endRental(@PathVariable Long rentalId) {
        return ResponseEntity.ok(rentalService.endRental(rentalId));
    }
}
