import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'; 
import { Container, Card, Alert, Spinner, Navbar, Nav, Form, Row, Col } from 'react-bootstrap';
import Register from './Register'; 

const API_URL = 'http://localhost:8080/api/books';

function BookCatalog() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch(searchTerm ? `${API_URL}?q=${encodeURIComponent(searchTerm)}` : API_URL)
      .then(res => res.json())
      .then(data => {
        setBooks(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [searchTerm]);

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">📚 Книжный Каталог</Navbar.Brand>
          <Nav className="ms-auto"><Nav.Link href="/">Выйти</Nav.Link></Nav>
        </Container>
      </Navbar>
      <Container className="my-5">
        <h1 className="text-center mb-4" style={{color: '#007bff'}}>Список книг</h1>
        <Form.Control 
            className="mb-4" 
            placeholder="Поиск..." 
            onChange={(e) => setSearchTerm(e.target.value)} 
        />
        {loading ? <Spinner animation="border" /> : (
          <Row xs={1} md={3} className="g-4">
            {books.map(book => (
              <Col key={book.id}>
                <Card className="h-100 shadow-sm">
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <Card.Text className="text-muted">{book.author}</Card.Text>
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
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;