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
INSERT INTO books (title, author, rating, price, image) VALUES 
('Відьмак: Останнє бажання', 'Анджей Сапковський', 5, 480.00, 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=400'),
('Дюна', 'Френк Герберт', 5, 550.00, 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=400'),
('Маленький принц', 'Антуан де Сент-Екзюпері', 5, 320.00, 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400'),
('Мистецтво війни', 'Сунь-цзи', 4, 290.00, 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=400'),
('Тіні забутих предків', 'Михайло Коцюбинський', 5, 250.00, 'https://images.unsplash.com/photo-1614332287897-cdc485fa562d?q=80&w=400'),
('Код да Вінчі', 'Ден Браун', 4, 420.00, 'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=400'),
('Шерлок Холмс', 'Артур Конан Дойл', 5, 380.00, 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=400'),
('Алхімік', 'Пауло Коельйо', 4, 310.00, 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=400');