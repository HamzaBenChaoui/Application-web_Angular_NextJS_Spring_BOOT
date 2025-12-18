package com.kaoba.service;

import com.kaoba.entity.Admin;
import com.kaoba.repository.AdminRepository;
import com.kaoba.repository.UserRepository;
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

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        logger.info("Attempting to load user by email: {}", email);
        
        Optional<Admin> adminOptional = adminRepository.findByEmail(email);
        if (adminOptional.isPresent()) {
            Admin admin = adminOptional.get();
            logger.info("Admin user found: {}. Retrieving hashed password.", email);
            return new CustomUserDetails(admin.getEmail(), admin.getPassword(), new ArrayList<>(), admin.getId());
        }

        Optional<com.kaoba.entity.User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            com.kaoba.entity.User user = userOptional.get();
            logger.info("Regular user found: {}. Retrieving hashed password.", email);
            return new CustomUserDetails(user.getEmail(), user.getPassword(), new ArrayList<>(), user.getId());
        }
        
        logger.warn("User not found with email: {}", email);
        throw new UsernameNotFoundException("User not found with email: " + email);
    }
}
