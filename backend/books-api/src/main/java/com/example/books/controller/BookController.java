package com.example.books.controller;

import com.example.books.model.Book;
import com.example.books.repository.BookRepository;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class BookController {

    private final BookRepository bookRepository;

    public BookController(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    // 1. ЭТОТ МЕТОД БЫЛ ПРОПУЩЕН - он отдает список книг для фронтенда
    @GetMapping
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    // 2. Создать книгу + сохранить байты изображения в БД
    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Book createBookWithImage(
            @RequestParam("title") String title,
            @RequestParam("author") String author,
            @RequestParam("price") Double price,
            @RequestParam("rating") Integer rating,
            @RequestParam(value = "file", required = false) MultipartFile file
    ) throws IOException {

        Book book = new Book();
        book.setTitle(title);
        book.setAuthor(author);
        book.setPrice(price);
        book.setRating(rating);
        book.setLastRated(LocalDateTime.now());

        if (file != null && !file.isEmpty()) {
            book.setImageData(file.getBytes());
            book.setImageContentType(file.getContentType());
        }

        Book saved = bookRepository.save(book);

        // Формируем относительный путь для фронтенда
        if (saved.getImageData() != null && saved.getImageData().length > 0) {
            saved.setImage("/api/books/" + saved.getId() + "/image");
            saved = bookRepository.save(saved);
        }

        return saved;
    }

    // 3. Отдать байты изображения по ID
    @GetMapping("/{id}/image")
    public ResponseEntity<byte[]> getBookImage(@PathVariable Long id) {
        Book b = bookRepository.findById(id).orElse(null);
        if (b == null || b.getImageData() == null || b.getImageData().length == 0) {
            return ResponseEntity.notFound().build();
        }

        MediaType type = MediaType.APPLICATION_OCTET_STREAM;
        if (b.getImageContentType() != null && !b.getImageContentType().isBlank()) {
            type = MediaType.parseMediaType(b.getImageContentType());
        }

        return ResponseEntity.ok()
                .contentType(type)
                .cacheControl(CacheControl.maxAge(7, TimeUnit.DAYS).cachePublic())
                .body(b.getImageData());
    }
}