import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Card, Spinner, Navbar, Form, Row, Col, Button } from 'react-bootstrap';
import Register from './Register'; 

const API_URL = 'http://localhost:8080/api/books';

// --- ФУНКЦИЯ УМНОЙ ДАТЫ (ДЗ) ---
const formatSmartDate = (dateString) => {
  if (!dateString) return "Без даты";
  const date = new Date(dateString);
  const now = new Date();
  
  const isToday = date.toDateString() === now.toDateString();
  const diffInMs = now - date;
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (isToday) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  if (diffInDays > 0 && diffInDays < 7) {
    return `${diffInDays} дн. назад, ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
  }
  return date.toLocaleDateString();
};

// --- КОМПОНЕНТ ЗВЕЗДОЧЕК (ДЗ) ---
const RateStars = ({ rating }) => {
  return (
    <div className="rate-stars">
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} style={{ color: i <= (rating || 0) ? "#ffc107" : "#e4e5e9", fontSize: "1.2rem" }}>
          ★
        </span>
      ))}
    </div>
  );
};

function BookCatalog() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}?page=${page}&size=6&q=${searchTerm}`)
      .then(res => res.json())
      .then(data => {
        console.log("Данные от сервера:", data.content); // ПРОВЕРКА В КОНСОЛИ
        setBooks(data.content || []);
        setTotalPages(data.totalPages || 0);
        setLoading(false);
      })
      .catch(err => {
        console.error("Ошибка загрузки:", err);
        setLoading(false);
      });
  }, [page, searchTerm]);

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">Каталог книг</h2>
      <Form.Control 
        placeholder="Поиск..." 
        className="mb-4 shadow-sm"
        onChange={(e) => { setSearchTerm(e.target.value); setPage(0); }} 
      />

      {/* КНОПКИ ПАГИНАЦИИ */}
      <div className="d-flex justify-content-center gap-2 mb-4">
        <Button disabled={page === 0} onClick={() => setPage(p => p - 1)}>Назад</Button>
        <span className="p-2">Стр {page + 1} / {totalPages}</span>
        <Button disabled={page >= totalPages - 1} onClick={() => setPage(p => p + 1)}>Вперед</Button>
      </div>

      {loading ? <Spinner animation="border" className="d-block mx-auto" /> : (
        <Row xs={1} md={3} className="g-4">
          {books.map(book => (
            <Col key={book.id}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body>
                  <Card.Title className="text-primary">{book.title}</Card.Title>
                  <Card.Text className="text-muted">{book.author}</Card.Text>
                  
                  {/* --- ВОТ ЭТОТ БЛОК RateData --- */}
                  <div className="mt-4 pt-2 border-top d-flex justify-content-between align-items-center">
                    <RateStars rating={book.rating} />
                    <small className="text-muted" style={{ fontSize: '0.85rem' }}>
                      {formatSmartDate(book.lastRated)}
                    </small>
                  </div>
                  {/* ---------------------------- */}
                  
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

// Рендеринг основного приложения
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/books" element={<BookCatalog />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}