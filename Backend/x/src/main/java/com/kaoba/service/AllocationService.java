package com.kaoba.service;

import com.kaoba.dto.AllocationRequestDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Service
@RequiredArgsConstructor
public class AllocationService {

    private final PdfService pdfService;
    private final EmailService emailService;
    private final TemplateEngine templateEngine;

    public void processAllocationRequest(AllocationRequestDTO requestDTO) {
        // 1. Generate the PDF
        byte[] pdf;
        try {
            pdf = pdfService.createAllocationPdf(requestDTO);
        } catch (java.io.IOException e) {
            // In a real application, you'd want more robust error handling/logging
            throw new RuntimeException("Failed to generate PDF", e);
        }

        // 2. Prepare the email body using the HTML template
        Context context = new Context();
        context.setVariable("fullName", requestDTO.getFullName());
        String htmlBody = templateEngine.process("email-template", context);

        // 3. Send the PDF via email with the HTML body
        String subject = "Confirmation de votre demande de location";
        
        emailService.sendEmailWithAttachment(requestDTO.getEmail(), subject, htmlBody, pdf, "bon-de-location.pdf", true);
    }
}
