package com.kaoba.config;

import com.kaoba.entity.Admin;
import com.kaoba.repository.AdminRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(DataSeeder.class);

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Forcefully reset the default admin account on every startup
        adminRepository.findByEmail("admin@kaoba.com").ifPresent(admin -> {
            logger.warn("Default admin account 'admin@kaoba.com' found. Deleting it to ensure a clean state.");
            adminRepository.delete(admin);
        });

        logger.info("Creating a new default admin account (admin@kaoba.com).");
        
        Admin defaultAdmin = new Admin();
        defaultAdmin.setEmail("admin@kaoba.com");
        defaultAdmin.setPassword(passwordEncoder.encode("password123")); // Encode password on creation

        adminRepository.save(defaultAdmin);
        
        logger.info("Default admin account created successfully.");
        logger.info("You can now login with the following credentials:");
        logger.info("Email: admin@kaoba.com");
        logger.info("Password: password123");
    }
}
