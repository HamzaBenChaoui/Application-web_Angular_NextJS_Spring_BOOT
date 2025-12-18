package com.kaoba.service;

import com.kaoba.dto.ProductDTO;
import com.kaoba.entity.Product;
import com.kaoba.entity.Category;
import com.kaoba.repository.ProductRepository;
import com.kaoba.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {
    
    @Autowired
    private ProductRepository productRepository;
    
    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private CloudinaryService cloudinaryService;

    public ProductDTO createProduct(ProductDTO productDTO, MultipartFile imageFile) {
        Category category = categoryRepository.findById(productDTO.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));
        
        String imageUrl = cloudinaryService.uploadFile(imageFile);

        Product product = Product.builder()
                .nameProducts(productDTO.getNameProducts())
                .reference(productDTO.getReference())
                .status(Product.StatusEnum.valueOf(productDTO.getStatus()))
                .stack(productDTO.getStack())
                .pureList(productDTO.getPureList())
                .image(imageUrl)
                .type(Product.ProductTypeEnum.valueOf(productDTO.getType()))
                .category(category)
                .build();
        
        Product saved = productRepository.save(product);
        return convertToDTO(saved);
    }

    public List<ProductDTO> getAllProducts() {
        return productRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public ProductDTO getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        return convertToDTO(product);
    }

    public List<ProductDTO> getProductsByCategory(Long categoryId) {
        return productRepository.findByCategoryId(categoryId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public ProductDTO updateProduct(Long id, ProductDTO productDTO, MultipartFile imageFile) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        
        String imageUrl = product.getImage();
        if (imageFile != null && !imageFile.isEmpty()) {
            imageUrl = cloudinaryService.uploadFile(imageFile);
        }

        product.setNameProducts(productDTO.getNameProducts());
        product.setReference(productDTO.getReference());
        product.setStatus(Product.StatusEnum.valueOf(productDTO.getStatus()));
        product.setStack(productDTO.getStack());
        product.setPureList(productDTO.getPureList());
        product.setImage(imageUrl);
        product.setType(Product.ProductTypeEnum.valueOf(productDTO.getType()));
        
        return convertToDTO(productRepository.save(product));
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    public List<ProductDTO> getAvailableProductsByType(Product.ProductTypeEnum type) {
        return productRepository.findByAvailableTrueAndType(type).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private ProductDTO convertToDTO(Product product) {
        return ProductDTO.builder()
                .id(product.getId())
                .nameProducts(product.getNameProducts())
                .reference(product.getReference())
                .status(product.getStatus().toString())
                .stack(product.getStack())
                .pureList(product.getPureList())
                .image(product.getImage())
                .type(product.getType().toString())
                .categoryId(product.getCategory().getId())
                .categoryName(product.getCategory().getNom())
                .available(product.isAvailable())
                .build();
    }
}
