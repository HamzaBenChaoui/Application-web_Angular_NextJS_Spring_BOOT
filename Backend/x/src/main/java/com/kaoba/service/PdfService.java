package com.kaoba.service;

import com.itextpdf.kernel.colors.Color;
import com.itextpdf.kernel.colors.DeviceRgb;
import com.itextpdf.kernel.font.PdfFont;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.kernel.geom.PageSize;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.borders.Border;
import com.itextpdf.layout.borders.SolidBorder;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.properties.TextAlignment;
import com.itextpdf.layout.properties.UnitValue;
import com.kaoba.dto.AllocationRequestDTO;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Service
public class PdfService {

    public byte[] createAllocationPdf(AllocationRequestDTO requestDTO) throws IOException {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        PdfWriter writer = new PdfWriter(baos);
        PdfDocument pdf = new PdfDocument(writer);
        Document document = new Document(pdf, PageSize.A4);
        document.setMargins(30, 30, 30, 30);

        PdfFont boldFont = PdfFontFactory.createFont("Helvetica-Bold");
        Color primaryColor = new DeviceRgb(13, 26, 46);
        Color secondaryColor = new DeviceRgb(90, 99, 125);
        Color borderColor = new DeviceRgb(238, 238, 238);

        try {
            addHeader(document, boldFont, primaryColor);
            document.add(new Paragraph("\n"));
            addTitleAndBarcode(document, boldFont, primaryColor);
            document.add(new Paragraph("\n"));
            addCustomerInfo(document, requestDTO, boldFont, secondaryColor);
            document.add(new Paragraph("\n\n"));
            addItemsTable(document, requestDTO, boldFont, primaryColor, borderColor);
            addTotals(document, requestDTO, boldFont, primaryColor, borderColor);
            addFooter(document, secondaryColor);
        } finally {
            document.close();
        }

        return baos.toByteArray();
    }

    private void addHeader(Document document, PdfFont boldFont, Color primaryColor) {
        Table table = new Table(UnitValue.createPercentArray(new float[]{50, 50})).useAllAvailableWidth();
        table.setBorder(Border.NO_BORDER);

        Paragraph logo = new Paragraph("PrestigeAuto")
                .setFont(boldFont)
                .setFontSize(26)
                .setFontColor(primaryColor);
        table.addCell(new Cell().add(logo).setBorder(Border.NO_BORDER));

        Table companyDetails = new Table(UnitValue.createPercentArray(1)).useAllAvailableWidth();
        companyDetails.setBorder(Border.NO_BORDER);
        companyDetails.addCell(createDetailCell("649 Boulevard Mohamed V, Casablanca 20250"));
        companyDetails.addCell(createDetailCell("(555) 123-4567"));
        companyDetails.addCell(createDetailCell("reservations@hiregroup.ma"));
        table.addCell(new Cell().add(companyDetails).setBorder(Border.NO_BORDER));
        
        document.add(table);
    }
    
    private Cell createDetailCell(String text) {
        return new Cell().add(new Paragraph(text).setFontSize(10)).setTextAlignment(TextAlignment.RIGHT).setBorder(Border.NO_BORDER);
    }

    private void addTitleAndBarcode(Document document, PdfFont boldFont, Color primaryColor) {
        Table table = new Table(UnitValue.createPercentArray(new float[]{50, 50})).useAllAvailableWidth();
        table.setBorder(Border.NO_BORDER);

        Paragraph title = new Paragraph("FACTURE")
                .setFont(boldFont)
                .setFontSize(32)
                .setFontColor(primaryColor);
        table.addCell(new Cell().add(title).setBorder(Border.NO_BORDER));

        Paragraph barcode = new Paragraph("INV-2025-12A")
                .setFontSize(14)
                .setTextAlignment(TextAlignment.RIGHT);
        table.addCell(new Cell().add(barcode).setBorder(Border.NO_BORDER));
        
        document.add(table);
    }

    private void addCustomerInfo(Document document, AllocationRequestDTO requestDTO, PdfFont boldFont, Color secondaryColor) {
        Table table = new Table(UnitValue.createPercentArray(new float[]{50, 50})).useAllAvailableWidth();
        table.setBorder(Border.NO_BORDER);

        // Client Info
        Cell clientCell = new Cell().setBorder(Border.NO_BORDER);
        clientCell.add(new Paragraph("FACTURÉ À").setFont(boldFont).setFontSize(10).setFontColor(secondaryColor));
        clientCell.add(new Paragraph(requestDTO.getFullName()).setFont(boldFont));
        clientCell.add(new Paragraph(requestDTO.getAddress()));
        clientCell.add(new Paragraph(requestDTO.getEmail()));
        table.addCell(clientCell);

        // Invoice Info
        Table invoiceInfoTable = new Table(UnitValue.createPercentArray(new float[]{40, 60})).setTextAlignment(TextAlignment.RIGHT);
        invoiceInfoTable.setBorder(Border.NO_BORDER);
        invoiceInfoTable.addCell(createDetailCell("Numéro de facture:"));
        invoiceInfoTable.addCell(createDetailCell("INV-2025-12A"));
        invoiceInfoTable.addCell(createDetailCell("Date de facture:"));
        invoiceInfoTable.addCell(createDetailCell(LocalDate.now().format(DateTimeFormatter.ofPattern("dd/MM/yyyy"))));
        
        table.addCell(new Cell().add(invoiceInfoTable).setBorder(Border.NO_BORDER));
        
        document.add(table);
    }

    private void addItemsTable(Document document, AllocationRequestDTO requestDTO, PdfFont boldFont, Color primaryColor, Color borderColor) {
        Table table = new Table(UnitValue.createPercentArray(new float[]{50, 15, 20, 15})).useAllAvailableWidth();
        table.setBorder(Border.NO_BORDER);

        // Header
        table.addHeaderCell(createHeaderCell("Description"));
        table.addHeaderCell(createHeaderCell("Qté/Jours").setTextAlignment(TextAlignment.RIGHT));
        table.addHeaderCell(createHeaderCell("Prix Unitaire").setTextAlignment(TextAlignment.RIGHT));
        table.addHeaderCell(createHeaderCell("Total").setTextAlignment(TextAlignment.RIGHT));

        // Item from DTO
        String description = requestDTO.getProductName();
        if (requestDTO.getProductType() != null && !requestDTO.getProductType().isEmpty()) {
            description += " (" + requestDTO.getProductType() + ")";
        }
        // Assuming quantity is 1 for the main product, can be adjusted
        int quantity = 1;
        double total = requestDTO.getPrice() * quantity;
        addItem(table, description, String.valueOf(quantity), String.format("%.2f", requestDTO.getPrice()), String.format("%.2f", total));
        
        // You can still add other fixed items if needed, e.g., fees
        addItem(table, "Frais de service", "1", "10.00", "10.00");
        
        document.add(table);
    }

    private Cell createHeaderCell(String text) {
        return new Cell()
                .add(new Paragraph(text).setFontSize(10).setBold())
                .setBorder(Border.NO_BORDER)
                .setBorderBottom(new SolidBorder(1))
                .setPadding(10);
    }

    private void addItem(Table table, String description, String qty, String unitPrice, String total) {
        table.addCell(new Cell().add(new Paragraph(description)).setBorder(Border.NO_BORDER).setPadding(8));
        table.addCell(new Cell().add(new Paragraph(qty)).setTextAlignment(TextAlignment.RIGHT).setBorder(Border.NO_BORDER).setPadding(8));
        table.addCell(new Cell().add(new Paragraph(unitPrice + " €")).setTextAlignment(TextAlignment.RIGHT).setBorder(Border.NO_BORDER).setPadding(8));
        table.addCell(new Cell().add(new Paragraph(total + " €")).setTextAlignment(TextAlignment.RIGHT).setBorder(Border.NO_BORDER).setPadding(8));
    }
    
    private void addTotals(Document document, AllocationRequestDTO requestDTO, PdfFont boldFont, Color primaryColor, Color borderColor) {
        Table table = new Table(UnitValue.createPercentArray(new float[]{75, 25})).useAllAvailableWidth();
        table.setBorder(Border.NO_BORDER);
        
        // Placeholder for alignment
        table.addCell(new Cell().setBorder(Border.NO_BORDER));

        Table totalsTable = new Table(UnitValue.createPercentArray(new float[]{50, 50}));
        totalsTable.setBorder(Border.NO_BORDER);
        
        // Calculate totals based on DTO
        double serviceFee = 10.00; // From the static item
        double subtotal = requestDTO.getPrice() + serviceFee;
        double taxRate = 0.20; // 20%
        double tax = subtotal * taxRate;
        double grandTotal = subtotal + tax;

        addTotalRow(totalsTable, "Sous-total", String.format("%.2f €", subtotal));
        addTotalRow(totalsTable, String.format("TVA (%.0f%%)", taxRate * 100), String.format("%.2f €", tax));
        
        Cell totalLabelCell = new Cell().add(new Paragraph("TOTAL").setFont(boldFont).setFontSize(16)).setBorder(Border.NO_BORDER).setBorderTop(new SolidBorder(1)).setPaddingTop(10);
        Cell totalValueCell = new Cell().add(new Paragraph(String.format("%.2f €", grandTotal)).setFont(boldFont).setFontSize(16)).setTextAlignment(TextAlignment.RIGHT).setBorder(Border.NO_BORDER).setBorderTop(new SolidBorder(1)).setPaddingTop(10);
        totalsTable.addCell(totalLabelCell);
        totalsTable.addCell(totalValueCell);

        table.addCell(new Cell().add(totalsTable).setBorder(Border.NO_BORDER));
        document.add(table);
    }

    private void addTotalRow(Table table, String label, String value) {
        table.addCell(new Cell().add(new Paragraph(label)).setBorder(Border.NO_BORDER).setTextAlignment(TextAlignment.RIGHT));
        table.addCell(new Cell().add(new Paragraph(value)).setBorder(Border.NO_BORDER).setTextAlignment(TextAlignment.RIGHT));
    }

    private void addFooter(Document document, Color secondaryColor) {
        Paragraph footer = new Paragraph("Merci de votre confiance.\nPaiement dû sous 30 jours.")
                .setFontSize(10)
                .setFontColor(secondaryColor)
                .setTextAlignment(TextAlignment.CENTER);
        document.showTextAligned(footer, 297.5f, 40, TextAlignment.CENTER);
    }
}
