package com.kaoba.repository;

import com.kaoba.entity.Rental;
import com.kaoba.entity.RentalStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RentalRepository extends JpaRepository<Rental, Long> {
    Optional<Rental> findByProductIdAndStatus(Long productId, RentalStatus status);
    List<Rental> findByUserId(Long userId);
}
