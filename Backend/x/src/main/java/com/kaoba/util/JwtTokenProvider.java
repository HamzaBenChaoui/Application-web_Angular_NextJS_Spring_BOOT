package com.kaoba.util;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import javax.crypto.SecretKey; // Correct import for symmetric keys
import java.util.Date;

@Component
public class JwtTokenProvider {

    @Value("${jwt.secret.key}")
    private String jwtSecret;

    @Value("${jwt.expiration.time}")
    private long jwtExpirationMs;

    /**
     * Helper method to generate the symmetric signing key.
     * Keys.hmacShaKeyFor returns a SecretKey, which is required by JJWT 0.12.x+
     * for verification methods.
     * @return The HMAC SecretKey.
     */
    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(jwtSecret.getBytes());
    }

    public String generateToken(String email, String userId) {
        SecretKey key = getSigningKey();
        return Jwts.builder()
                .subject(email)
                .claim("userId", userId)
                .issuedAt(new Date())
                // .expiration() is preferred over .setExpiration() in modern JJWT
                .expiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
                // signWith(SecretKey) is the non-deprecated method
                .signWith(key)
                .compact();
    }

    public String getEmailFromToken(String token) {
        SecretKey key = getSigningKey();
        return Jwts.parser()
                .verifyWith(key) // Now accepts SecretKey
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    public boolean validateToken(String token) {
        try {
            SecretKey key = getSigningKey();
            Jwts.parser()
                    .verifyWith(key) // Now accepts SecretKey
                    .build()
                    .parseSignedClaims(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            // Log the exception for debugging purposes, but return false to indicate invalid token
            // System.err.println("JWT Validation Error: " + e.getMessage()); 
            return false;
        }
    }
}