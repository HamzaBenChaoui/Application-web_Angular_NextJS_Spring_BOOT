package com.kaoba.controller;

import com.kaoba.dto.ContactRequestDTO;
import com.kaoba.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ContactController {

    private final EmailService emailService;

    @Value("${spring.mail.username}")
    private String toEmail;

    @PostMapping
    public ResponseEntity<Void> sendEmail(@RequestBody ContactRequestDTO contactRequest) {

        String subject = "Contact Us: " + contactRequest.getSujet();

        String body =
            "<div style='font-family: Arial, Helvetica, sans-serif; background-color: #f4f6f8; padding: 30px;'>" +
                "<div style='max-width: 600px; margin: auto; background: #ffffff; border-radius: 12px; " +
                "box-shadow: 0 10px 30px rgba(0,0,0,0.1); overflow: hidden;'>" +

                    "<div style='background: linear-gradient(135deg, #000000, #434343); padding: 25px; " +
                    "text-align: center; color: #ffffff;'>" +
                        "<h1 style='margin: 0; font-size: 26px;'>New Contact Message</h1>" +
                        "<p style='margin-top: 8px; font-size: 14px; opacity: 0.9;'>Message received from your website</p>" +
                    "</div>" +

                    "<div style='padding: 25px; color: #333333;'>" +

                        "<p><strong>Full Name:</strong><br/>" +
                        "<span style='color:#555;'>" + contactRequest.getNomComplet() + "</span></p>" +

                        "<p><strong>Email:</strong><br/>" +
                        "<span style='color:#555;'>" + contactRequest.getEmail() + "</span></p>" +

                        "<p><strong>Subject:</strong><br/>" +
                        "<span style='color:#555;'>" + contactRequest.getSujet() + "</span></p>" +

                        "<hr style='border:none; border-top:1px solid #eeeeee; margin:20px 0;'/>" +

                        "<p><strong>Message:</strong></p>" +
                        "<div style='background:#f9f9f9; padding:15px; border-radius:8px; " +
                        "color:#444; line-height:1.6;'>" +
                            contactRequest.getMessage() +
                        "</div>" +

                    "</div>" +

                    "<div style='background:#f4f6f8; text-align:center; padding:15px; " +
                    "font-size:12px; color:#888;'>" +
                        "© 2025 Kaoba — All rights reserved" +
                    "</div>" +

                "</div>" +
            "</div>";

        emailService.sendEmail(toEmail, subject, body, true);
        return ResponseEntity.ok().build();
    }
}
