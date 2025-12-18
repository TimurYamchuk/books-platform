DELETE FROM books;
ALTER TABLE books ALTER COLUMN id RESTART WITH 1;

INSERT INTO books (title, author, rating, last_rated) VALUES 
('The Great Gatsby', 'F. Scott Fitzgerald', 5, CURRENT_TIMESTAMP), -- Сьогодні (тільки час)
('1984', 'George Orwell', 4, '2025-12-15T15:30:00'),                -- 3 дні тому
('The Hobbit', 'J.R.R. Tolkien', 5, '2025-12-01T12:00:00'),         -- Стара дата
('Java Programming', 'John Smith', 3, '2025-11-20T09:15:00');       -- Стара дата