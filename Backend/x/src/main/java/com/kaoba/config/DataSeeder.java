
package com.kaoba.config;

import com.kaoba.entity.Admin;
import com.kaoba.entity.User;
import com.kaoba.repository.AdminRepository;
import com.kaoba.repository.UserRepository;
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
    private UserRepository userRepository;

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

        // Forcefully reset the default user account on every startup
        userRepository.findByEmail("user@kaoba.com").ifPresent(user -> {
            logger.warn("Default user account 'user@kaoba.com' found. Deleting it to ensure a clean state.");
            userRepository.delete(user);
        });

        logger.info("Creating a new default user account (user@kaoba.com).");

        User defaultUser = new User();
        defaultUser.setEmail("user@kaoba.com");
        defaultUser.setNom("Default User");
        defaultUser.setRole(User.UserRoleEnum.USER);
        defaultUser.setPassword(passwordEncoder.encode("password123")); // Encode password on creation

        userRepository.save(defaultUser);

        logger.info("Default user account created successfully.");
        logger.info("You can now login with the following credentials:");
        logger.info("Email: user@kaoba.com");
        logger.info("Password: password123");
    }
}
