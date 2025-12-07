package com.kaoba.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nameProducts;

    @Column(nullable = false, unique = true)
    private String reference;

    @Enumerated(EnumType.STRING)
    private StatusEnum status;

    @Column(nullable = false)
    private Integer stack;

    @Column(columnDefinition = "TEXT")
    private String pureList;

    @Column(columnDefinition = "TEXT")
    private String image;

    @Enumerated(EnumType.STRING)
    private ProductTypeEnum type;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    private List<Promotion> promotions;

    public enum StatusEnum {
        ACTIVE, INACTIVE
    }

    public enum ProductTypeEnum {
        TYPE_A, TYPE_B, TYPE_C
    }
}
