package com.example.books.repository;

import com.example.books.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

    // ЭТОТ МЕТОД НУЖЕН:
    // Он позволяет искать книги, где строка 'query' (запрос) содержится в
    // поле 'title' ИЛИ в поле 'author' (без учета регистра).
    List<Book> findByTitleContainingIgnoreCaseOrAuthorContainingIgnoreCase(String title, String author);

    // Если вы ранее добавляли findByTitleContainingIgnoreCase, его можно оставить или удалить.
}