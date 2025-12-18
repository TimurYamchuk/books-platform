import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'; 
import { Container, Card, Spinner, Navbar, Nav, Form, Row, Col, Button } from 'react-bootstrap';
import Register from './Register'; 
import OrderTest from './OrderTest';

const API_URL = 'http://localhost:8080/api/books';

const formatSmartDate = (dateString) => {
  if (!dateString) return "Нет даты";
  const date = new Date(dateString);
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  const diffInMs = now - date;
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (isToday) return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  if (diffInDays > 0 && diffInDays < 7) {
    const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return `${diffInDays} дн. назад, ${time}`;
  }
  return date.toLocaleDateString();
};

const RateStars = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span key={i} style={{ color: i <= (rating || 0) ? "#ffc107" : "#e4e5e9", fontSize: "1.2rem" }}>★</span>
    );
  }
  return <div>{stars}</div>;
};

function BookCatalog() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    setLoading(true);
    const url = `${API_URL}?page=${page}&size=6${searchTerm ? `&q=${encodeURIComponent(searchTerm)}` : ''}`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setBooks(data.content || []);
        setTotalPages(data.totalPages || 0);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [searchTerm, page]);

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/books">📚 Книжный Каталог</Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/order-test" className="text-warning fw-bold">Тест Заказов (ДЗ)</Nav.Link>
            <Nav.Link as={Link} to="/">Выйти</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Container className="my-5">
        <h1 className="text-center mb-4">Каталог Книг</h1>
        <Form.Control 
            className="mb-4 shadow-sm" 
            placeholder="Поиск..." 
            onChange={(e) => { setSearchTerm(e.target.value); setPage(0); }} 
        />
        <div className="d-flex justify-content-center gap-3 mb-4">
          <Button variant="outline-primary" disabled={page === 0} onClick={() => setPage(p => p - 1)}>←</Button>
          <span className="align-self-center">Страница {page + 1} из {totalPages}</span>
          <Button variant="outline-primary" disabled={page >= totalPages - 1} onClick={() => setPage(p => p + 1)}>→</Button>
        </div>

        {loading ? <Spinner animation="border" className="d-block mx-auto" /> : (
          <Row xs={1} md={3} className="g-4">
            {books.map(book => (
              <Col key={book.id}>
                <Card className="h-100 shadow-sm border-0 card-hover">
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <Card.Text className="text-muted">{book.author}</Card.Text>
                    <div className="mt-3 pt-2 border-top d-flex justify-content-between align-items-center">
                      <RateStars rating={book.rating} />
                      <small className="text-secondary">{formatSmartDate(book.lastRated)}</small>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/books" element={<BookCatalog />} />
        <Route path="/order-test" element={<OrderTest />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;