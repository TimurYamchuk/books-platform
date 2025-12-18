package com.example.books.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Column; // Для специфических настроек колонок
import lombok.Data;
import lombok.NoArgsConstructor; // Lombok: Создает конструктор без аргументов
import lombok.AllArgsConstructor; // Lombok: Создает конструктор со всеми аргументами

/**
 * Класс-сущность, представляющий книгу в базе данных.
 *
 * Аннотации:
 * - @Entity: Указывает JPA, что этот класс является сущностью,
 * которая должна быть сопоставлена с таблицей базы данных.
 * - @Data: Lombok, генерирует геттеры, сеттеры, equals, hashCode и toString.
 * - @NoArgsConstructor и @AllArgsConstructor: Lombok, генерирует конструкторы.
 */
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Book {

    /**
     * Первичный ключ (ID) книги.
     * @Id: Указывает, что это первичный ключ.
     * @GeneratedValue: Указывает, как генерируется значение (IDENTITY - автоинкремент).
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Название книги
    @Column(nullable = false)
    private String title;

    // Автор книги
    @Column(nullable = false)
    private String author;

    // Международный стандартный номер книги (ISBN), должен быть уникальным
    @Column(unique = true, nullable = false)
    private String isbn;

    // Цена книги
    @Column(nullable = false)
    private Double price;

    // Год публикации
    private Integer publicationYear;

    // Жанр книги
    private String genre;

}