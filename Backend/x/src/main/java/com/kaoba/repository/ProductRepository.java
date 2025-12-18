package com.kaoba.repository;

import com.kaoba.entity.Product;
import com.kaoba.entity.Product.ProductTypeEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategoryId(Long categoryId);
    Product findByReference(String reference);
    List<Product> findByAvailableTrueAndType(ProductTypeEnum type);
}
