package com.example.books;

import com.example.books.model.Book;
import com.example.books.repository.BookRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {
    private static final Logger log = LoggerFactory.getLogger(DataInitializer.class);

    @Bean
    CommandLineRunner initDatabase(BookRepository repository) {
        return args -> {
            if (repository.count() == 0) {
                log.info("--- Наповнення бази даних: 12 книг ---");

                repository.save(createBook("Оплот", "Теодор Драйзер", 450.0, 5, "https://imo10.labirint.ru/books/1009290/cover.jpg/484-0"));
                repository.save(createBook("1984", "Джордж Орвелл", 320.0, 5, "https://fantasy-worlds.org/img/full/116/11604.jpg"));
                repository.save(createBook("Маленький принц", "Антуан де Сент-Екзюпері", 280.0, 4, "https://mostik.de/cdn/shop/files/9785171145606_ff4f313c-0ef5-45d4-9d5e-12c29af8d274.jpg?v=1724102802&width=1000"));
                repository.save(createBook("Пропаганда", "Эдвард Бернейс", 550.0, 5, "https://imo10.labirint.ru/books/1003193/cover.jpg/484-0"));
                repository.save(createBook("Остров сокровищ", "Роберт Стивенсон", 600.0, 5, "https://imo10.labirint.ru/books/990317/cover.jpg/484-0"));
                repository.save(createBook("Бегущий человек", "Стивен Кинг", 480.0, 5, "https://imo10.labirint.ru/books/996755/cover.jpg/484-0"));
                repository.save(createBook("Спартак", "Рафаэлло Джованьоли", 390.0, 5, "https://imo10.labirint.ru/books/996227/cover.jpg/484-0"));
                repository.save(createBook("Алхімік", "Пауло Коельйо", 250.0, 4, "https://cdn.ast.ru/v2/ASE000000000702122/COVER/cover1__w340.jpg"));
                repository.save(createBook("Волки Кальи", "Стивен Кинг", 210.0, 5, "https://imo10.labirint.ru/books/1010832/cover.jpg/363-0"));
                repository.save(createBook("Логика Жизни", "Ф.Жакоб", 310.0, 4, "https://imo10.labirint.ru/books/1002465/cover.jpg/363-0"));
                repository.save(createBook("Мятеж на Эльсиноре", "Джек Лондон", 420.0, 5, "https://imo10.labirint.ru/books/1009542/cover.jpg/484-0"));
                repository.save(createBook("Проблема Аладдина", "Эрнст Юнгер", 290.0, 4, "https://imo10.labirint.ru/books/1009544/cover.jpg/484-0"));
                repository.save(createBook("Призраки", "Чак Паланик", 310.0, 4, "https://imo10.labirint.ru/books/965739/cover.jpg/484-0"));
                repository.save(createBook("Листья травы", "Уолт Уитмен", 420.0, 5, "https://imo10.labirint.ru/books/957206/cover.jpg/484-0"));
                repository.save(createBook("В краю лесов", "Томас Гарди", 290.0, 4, "https://imo10.labirint.ru/books/951817/cover.jpg/484-0"));

                log.info("--- База готова! Додано 12 книг ---");
            }
        };
    }

    private Book createBook(String title, String author, Double price, Integer rating, String imageUrl) {
        Book book = new Book();
        book.setTitle(title);
        book.setAuthor(author);
        book.setPrice(price);
        book.setRating(rating);
        book.setImage(imageUrl);
        return book;
    }
}