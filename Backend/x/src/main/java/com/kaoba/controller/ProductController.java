package com.kaoba.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kaoba.dto.ProductDTO;
import com.kaoba.entity.Product;
import com.kaoba.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @PostMapping
    public ResponseEntity<ProductDTO> createProduct(@RequestParam("product") String productDtoString,
                                                    @RequestParam("imageFile") MultipartFile imageFile) throws IOException {
        ProductDTO productDTO = new ObjectMapper().readValue(productDtoString, ProductDTO.class);
        ProductDTO createdProduct = productService.createProduct(productDTO, imageFile);
        return new ResponseEntity<>(createdProduct, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<ProductDTO>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getProductById(id));
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<ProductDTO>> getProductsByCategory(@PathVariable Long categoryId) {
        return ResponseEntity.ok(productService.getProductsByCategory(categoryId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductDTO> updateProduct(@PathVariable Long id,
                                                    @RequestParam("product") String productDtoString,
                                                    @RequestParam(value = "imageFile", required = false) MultipartFile imageFile) throws IOException {
        ProductDTO productDTO = new ObjectMapper().readValue(productDtoString, ProductDTO.class);
        ProductDTO updatedProduct = productService.updateProduct(id, productDTO, imageFile);
        return ResponseEntity.ok(updatedProduct);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public ResponseEntity<List<ProductDTO>> searchAvailableProducts(@RequestParam("type") String type) {
        Product.ProductTypeEnum productType = Product.ProductTypeEnum.valueOf(type.toUpperCase());
        return ResponseEntity.ok(productService.getAvailableProductsByType(productType));
    }
}