package com.kaoba.service;

import com.kaoba.entity.Admin;
import com.kaoba.repository.AdminRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private static final Logger logger = LoggerFactory.getLogger(CustomUserDetailsService.class);

    @Autowired
    private AdminRepository adminRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        logger.info("Attempting to load user by email: {}", email);
        Optional<Admin> adminOptional = adminRepository.findByEmail(email);

        if (adminOptional.isEmpty()) {
            logger.warn("User not found with email: {}", email);
            throw new UsernameNotFoundException("User not found with email: " + email);
        }

        Admin admin = adminOptional.get();
        logger.info("User found: {}. Retrieving hashed password.", email);
        
        // For debugging only. Do NOT log passwords in production!
        // logger.info("Hashed password from DB: {}", admin.getPassword());

        return new User(admin.getEmail(), admin.getPassword(), new ArrayList<>());
    }
}
