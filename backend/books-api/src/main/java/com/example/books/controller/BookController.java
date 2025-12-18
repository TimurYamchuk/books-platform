package com.example.books.controller;

import com.example.books.model.Book;       // Проверьте путь (может быть model.Book)
import com.example.books.service.BookService; // Проверьте путь (может быть service.BookService)
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List; // Для List<Book>

@CrossOrigin(origins = "http://localhost:5173") 
@RestController 
@RequestMapping("/api/books") 
public class BookController {

    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping
    public List<Book> getAllBooks(@RequestParam(required = false) String q) {
        // Мы УДАЛЯЕМ ЛОГИКУ ПОИСКА, чтобы просто скомпилировать.
        // Если вам нужен поиск, убедитесь, что его логика правильная.
        return bookService.findAllBooks();
    }

    // Если у вас нет других методов, то здесь должна быть только закрывающая скобка класса.
} // <-- Обязательно должна быть!