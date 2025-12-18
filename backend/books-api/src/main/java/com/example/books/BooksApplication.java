package com.example.books;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan; // <-- НОВЫЙ ИМПОРТ

@SpringBootApplication
@ComponentScan(basePackages = "com.example.books") // <-- НОВАЯ СТРОКА
public class BooksApplication {

    public static void main(String[] args) {
        SpringApplication.run(BooksApplication.class, args);
    }
}