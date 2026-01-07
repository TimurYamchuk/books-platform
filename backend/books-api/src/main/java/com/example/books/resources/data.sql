-- 1. Видаляємо стару таблицю, якщо вона не відповідає вимогам
DROP TABLE IF EXISTS books;

-- 2. Створюємо правильну таблицю з усіма полями
CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255),
    rating INT CHECK (rating >= 1 AND rating <= 5),
    price DECIMAL(10, 2),
    image TEXT, -- Тут буде посилання на картинку
    last_rated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Вставляємо дані, які React зможе "зрозуміти"
DELETE FROM books;

INSERT INTO books (title, author, rating, price, last_rated, image) VALUES 
('Відьмак: Останнє бажання', 'Анджей Сапковський', 5, 480.00, CURRENT_TIMESTAMP, 'https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=400&auto=format&fit=crop'),
('Дюна', 'Френк Герберт', 5, 550.00, DATEADD('DAY', -1, CURRENT_TIMESTAMP), 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=400&auto=format&fit=crop'),
('Маленький принц', 'Антуан де Сент-Екзюпері', 5, 320.00, DATEADD('DAY', -3, CURRENT_TIMESTAMP), 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=400&auto=format&fit=crop'),
('Мистецтво війни', 'Сунь-цзи', 4, 290.00, CURRENT_TIMESTAMP, 'https://images.unsplash.com/photo-1543004218-ee141104975a?q=80&w=400&auto=format&fit=crop'),
('1984', 'Джордж Орвелл', 5, 350.00, CURRENT_TIMESTAMP, 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=400&auto=format&fit=crop'),
('Гаррі Поттер', 'Дж. К. Ролінґ', 5, 600.00, DATEADD('DAY', -2, CURRENT_TIMESTAMP), 'https://images.unsplash.com/photo-1626618012641-bfbca5a31239?q=80&w=400&auto=format&fit=crop'),
('Кобзар', 'Тарас Шевченко', 5, 450.00, CURRENT_TIMESTAMP, 'https://images.unsplash.com/photo-1532012197367-2d5970d2d5d3?q=80&w=400&auto=format&fit=crop'),
('Шерлок Холмс', 'Артур Конан Дойл', 5, 380.00, CURRENT_TIMESTAMP, 'https://images.unsplash.com/photo-1587876222912-3df9f022e89a?q=80&w=400&auto=format&fit=crop');