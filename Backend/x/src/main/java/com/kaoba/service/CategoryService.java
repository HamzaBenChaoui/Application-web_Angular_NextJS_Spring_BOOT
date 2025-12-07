package com.kaoba.service;

import com.kaoba.dto.CategoryDTO;
import com.kaoba.entity.Category;
import com.kaoba.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryService {
    
    @Autowired
    private CategoryRepository categoryRepository;

    public CategoryDTO createCategory(CategoryDTO categoryDTO) {
        Category category = Category.builder()
                .nom(categoryDTO.getNom())
                .description(categoryDTO.getDescription())
                .status(Category.StatusEnum.valueOf(categoryDTO.getStatus()))
                .build();
        Category saved = categoryRepository.save(category);
        return convertToDTO(saved);
    }

    public List<CategoryDTO> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public CategoryDTO getCategoryById(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));
        return convertToDTO(category);
    }

    public CategoryDTO updateCategory(Long id, CategoryDTO categoryDTO) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));
        category.setNom(categoryDTO.getNom());
        category.setDescription(categoryDTO.getDescription());
        category.setStatus(Category.StatusEnum.valueOf(categoryDTO.getStatus()));
        return convertToDTO(categoryRepository.save(category));
    }

    public void deleteCategory(Long id) {
        categoryRepository.deleteById(id);
    }

    private CategoryDTO convertToDTO(Category category) {
        return CategoryDTO.builder()
                .id(category.getId())
                .nom(category.getNom())
                .description(category.getDescription())
                .status(category.getStatus().toString())
                .build();
    }
}
