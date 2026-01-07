package com.example.books.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "books")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String author;

    private Integer rating;
    private Double price;
    private String image;

    // Эти два поля КРИТИЧЕСКИ ВАЖНЫ для исправления твоих ошибок:
    @Lob
    @Column(name = "image_data", length = 1000000)
    private byte[] imageData;

    private String imageContentType;

    @Column(name = "last_rated")
    @JsonProperty("lastRated")
    private LocalDateTime lastRated;

    public Book() {
        // Конструктор необходим для JPA
    }

    @PrePersist
    protected void onCreate() {
        if (this.lastRated == null) {
            this.lastRated = LocalDateTime.now();
        }
    }

    // --- СТАНДАРТНЫЕ ГЕТТЕРЫ И СЕТТЕРЫ ---
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }
    public Integer getRating() { return rating; }
    public void setRating(Integer rating) { this.rating = rating; }
    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }
    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }
    public LocalDateTime getLastRated() { return lastRated; }
    public void setLastRated(LocalDateTime lastRated) { this.lastRated = lastRated; }

    // --- МЕТОДЫ, КОТОРЫЕ ИЩЕТ КОНТРОЛЛЕР (ОШИБКИ ИЗ-ЗА НИХ) ---
    public byte[] getImageData() { return imageData; }
    public void setImageData(byte[] imageData) { this.imageData = imageData; }
    public String getImageContentType() { return imageContentType; }
    public void setImageContentType(String imageContentType) { this.imageContentType = imageContentType; }
}