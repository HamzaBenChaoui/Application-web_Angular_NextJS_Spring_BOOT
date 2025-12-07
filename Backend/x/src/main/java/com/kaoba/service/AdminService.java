package com.kaoba.service;

import com.kaoba.dto.AdminDTO;
import com.kaoba.entity.Admin;
import com.kaoba.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder; // Added import
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<AdminDTO> getAllAdmins() {
        return adminRepository.findAll().stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public AdminDTO getAdminById(Long id) {
        Admin admin = adminRepository.findById(id).orElseThrow(() -> new RuntimeException("Admin not found"));
        return convertToDTO(admin);
    }

    public AdminDTO createAdmin(Admin admin) {
        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        Admin savedAdmin = adminRepository.save(admin);
        return convertToDTO(savedAdmin);
    }

    public AdminDTO updateAdmin(Long id, AdminDTO adminDTO) {
        Admin admin = adminRepository.findById(id).orElseThrow(() -> new RuntimeException("Admin not found"));
        admin.setEmail(adminDTO.getEmail());
        // Password updates should be handled in a separate, secure method
        Admin updatedAdmin = adminRepository.save(admin);
        return convertToDTO(updatedAdmin);
    }

    public void deleteAdmin(Long id) {
        adminRepository.deleteById(id);
    }

    public void changePassword(Long adminId, String oldPassword, String newPassword) {
        Admin admin = adminRepository.findById(adminId)
                .orElseThrow(() -> new RuntimeException("Admin not found"));

        if (!passwordEncoder.matches(oldPassword, admin.getPassword())) {
            throw new RuntimeException("Invalid old password");
        }

        admin.setPassword(passwordEncoder.encode(newPassword));
        adminRepository.save(admin);
    }

    private AdminDTO convertToDTO(Admin admin) {
        return AdminDTO.builder()
                .id(admin.getId())
                .email(admin.getEmail())
                .build();
    }
}