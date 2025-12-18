package com.kaoba.service;

import com.kaoba.dto.RentalRequestDTO;
import com.kaoba.dto.RentalResponseDTO;
import com.kaoba.entity.Product;
import com.kaoba.entity.Rental;
import com.kaoba.entity.RentalStatus;
import com.kaoba.entity.User;
import com.kaoba.repository.ProductRepository;
import com.kaoba.repository.RentalRepository;
import com.kaoba.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RentalService {

    private final RentalRepository rentalRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    @Transactional
    public RentalResponseDTO rentProduct(RentalRequestDTO rentalRequestDTO) {
        Product product = productRepository.findById(rentalRequestDTO.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        if (!product.isAvailable()) {
            throw new RuntimeException("Product is not available for rent");
        }

        User user = userRepository.findById(rentalRequestDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        product.setAvailable(false);
        productRepository.save(product);

        Rental rental = Rental.builder()
                .product(product)
                .user(user)
                .startDate(rentalRequestDTO.getStartDate())
                .endDate(rentalRequestDTO.getEndDate()) // Add this line
                .status(RentalStatus.ACTIVE)
                .build();

        rental = rentalRepository.save(rental);

        return toRentalResponseDTO(rental);
    }

    @Transactional
    public RentalResponseDTO endRental(Long rentalId) {
        Rental rental = rentalRepository.findById(rentalId)
                .orElseThrow(() -> new RuntimeException("Rental not found"));

        if (rental.getStatus() != RentalStatus.ACTIVE) {
            throw new RuntimeException("Rental is not active");
        }

        rental.setEndDate(LocalDate.now());
        rental.setStatus(RentalStatus.FINISHED);

        Product product = rental.getProduct();
        product.setAvailable(true);
        productRepository.save(product);

        rental = rentalRepository.save(rental);

        return toRentalResponseDTO(rental);
    }

    public List<RentalResponseDTO> getRentalsByUserId(Long userId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated() || !(authentication.getPrincipal() instanceof CustomUserDetails)) {
            throw new RuntimeException("User not authenticated");
        }
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        boolean isAdmin = userDetails.getAuthorities().stream()
                .anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("ROLE_ADMIN"));

        if (!userDetails.getId().equals(userId) && !isAdmin) {
            throw new RuntimeException("Access denied: You can only view your own rentals.");
        }

        return rentalRepository.findByUserId(userId).stream()
                .map(this::toRentalResponseDTO)
                .collect(Collectors.toList());
    }

    public List<RentalResponseDTO> getAllRentals() {
        return rentalRepository.findAll().stream()
                .map(this::toRentalResponseDTO)
                .collect(Collectors.toList());
    }

    private RentalResponseDTO toRentalResponseDTO(Rental rental) {
        return RentalResponseDTO.builder()
                .id(rental.getId())
                .productId(rental.getProduct().getId())
                .userId(rental.getUser().getId())
                .startDate(rental.getStartDate())
                .endDate(rental.getEndDate())
                .status(rental.getStatus())
                .productReference(rental.getProduct().getReference())
                .userEmail(rental.getUser().getEmail())
                .build();
    }
}
