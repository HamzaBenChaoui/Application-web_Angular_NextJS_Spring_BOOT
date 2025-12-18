package com.kaoba.controller;

import com.kaoba.dto.AllocationRequestDTO;
import com.kaoba.service.AllocationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/allocations")
@RequiredArgsConstructor
public class AllocationController {

    private final AllocationService allocationService;

    @PostMapping("/request")
    public ResponseEntity<Void> requestAllocation(@RequestBody AllocationRequestDTO requestDTO) {
        allocationService.processAllocationRequest(requestDTO);
        return ResponseEntity.ok().build();
    }
}
