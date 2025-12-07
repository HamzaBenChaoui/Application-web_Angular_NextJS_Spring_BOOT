package com.kaoba.dto;

import com.kaoba.entity.Product;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductDTO {
    private Long id;
    private String nameProducts;
    private String reference;
    private String status;
    private Integer stack;
    private String pureList;
    private String image;
    private String type;
    private Long categoryId;
    private String categoryName;
}
