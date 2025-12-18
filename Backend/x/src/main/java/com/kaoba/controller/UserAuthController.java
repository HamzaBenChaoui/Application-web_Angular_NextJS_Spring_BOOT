package com.kaoba.controller;

import com.kaoba.dto.ChangePasswordRequest;
import com.kaoba.dto.LoginRequest;
import com.kaoba.dto.LoginResponse;
import com.kaoba.entity.User;
import com.kaoba.repository.UserRepository;
import com.kaoba.service.UserService;
import com.kaoba.service.CustomUserDetailsService;
import com.kaoba.util.JwtUtil;
import com.kaoba.dto.UserDTO;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user/auth")
public class UserAuthController {

    private static final Logger logger = LoggerFactory.getLogger(UserAuthController.class);

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private CustomUserDetailsService userDetailsService;
    
    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody Map<String, String> payload) {
        try {
             
            String nom = payload.get("nom");
            String email = payload.get("email");
           
            String password = payload.get("password");

            if (email == null || nom == null || password == null) {
                return ResponseEntity.badRequest().body("Email, nom, and password are required.");
            }

            User user = new User();
            user.setEmail(email);
            user.setNom(nom);
            user.setPassword(password);

            UserDTO createdUser = userService.createUser(user);
            return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
        } catch (DataIntegrityViolationException e) {
            logger.error("Error during user registration - data integrity violation:", e);
            return ResponseEntity.badRequest().body("Cet e-mail existe déjà.");
        } catch (Exception e) {
            logger.error("Error during user registration:", e);
            return ResponseEntity.badRequest().body("Erreur lors de la création de l'utilisateur: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody LoginRequest loginRequest) {
        logger.info("Authentication request received for user: {}", loginRequest.getEmail());
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
            );
        } catch (BadCredentialsException e) {
            logger.error("Authentication failed for user {}: Invalid credentials", loginRequest.getEmail(), e);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorrect username or password");
        } catch (Exception e) {
            logger.error("An unexpected error occurred during authentication for user {}:", loginRequest.getEmail(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An internal error occurred");
        }

        final UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getEmail());
        final String jwt = jwtUtil.generateToken(userDetails);

        logger.info("Authentication successful for user: {}", loginRequest.getEmail());
        return ResponseEntity.ok(new LoginResponse(jwt));
    }

    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName();

        User user = userRepository.findByEmail(currentPrincipalName)
                .orElseThrow(() -> new RuntimeException("User not found"));

        try {
            userService.changePassword(user.getId(), request.getOldPassword(), request.getNewPassword());
            return ResponseEntity.ok("Password changed successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
