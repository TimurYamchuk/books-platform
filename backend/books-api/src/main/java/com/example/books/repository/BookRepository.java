package com.example.books.repository;

import com.example.books.model.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

    // Выполнение ДЗ: Метод теперь принимает Pageable и возвращает Page вместо List
    Page<Book> findByTitleContainingIgnoreCaseOrAuthorContainingIgnoreCase(
        String title, 
        String author, 
        Pageable pageable
    );
}