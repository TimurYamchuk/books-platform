package com.example.books.service; // Убедитесь в правильности этого пакета!

import com.example.books.model.Book;
import com.example.books.repository.BookRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class BookService {

    private final BookRepository bookRepository;

    // Инъекция BookRepository
    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    // Метод для получения всех книг
    public List<Book> findAllBooks() {
        return bookRepository.findAll();
    }
    
    // Метод для сохранения новой книги
    public Book saveBook(Book book) {
        return bookRepository.save(book);
    }
    
    // Добавленный ранее метод поиска
    public List<Book> searchBooks(String query) {
        if (query == null || query.trim().isEmpty()) {
            return bookRepository.findAll();
        }
        return bookRepository.findByTitleContainingIgnoreCaseOrAuthorContainingIgnoreCase(query, query);
    }
}