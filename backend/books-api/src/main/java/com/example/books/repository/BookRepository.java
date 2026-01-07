package com.example.books.repository;

import com.example.books.model.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    
    // Для нового поиска с пагинацией
    Page<Book> findByTitleContainingIgnoreCaseOrAuthorContainingIgnoreCase(String t, String a, Pageable p);

    // Для совместимости со старым кодом (Service)
    List<Book> findByTitleContainingIgnoreCaseOrAuthorContainingIgnoreCase(String t, String a);

    // Для проверки при инициализации
    boolean existsByTitleIgnoreCase(String title);
}