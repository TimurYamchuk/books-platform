import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'; 
import { Container, Card, Spinner, Navbar, Nav, Form, Row, Col, Button, ButtonGroup } from 'react-bootstrap';
import Register from './Register'; 

// --- Компонент звездного рейтинга ---
const RateStars = ({ rating }) => (
  <div className="mb-2" style={{ fontSize: '0.85rem' }}>
    {[1, 2, 3, 4, 5].map(i => (
      <span key={i} style={{ color: i <= (rating || 0) ? "#0056b3" : "#dee2e6" }}>★</span>
    ))}
  </div>
);

// --- Компонент профиля пользователя ---
const UserProfile = () => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('bookstore_user');
    return saved ? JSON.parse(saved) : { firstName: "Іван", lastName: "Іванов", email: "ivanov@example.com" };
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempUser, setTempUser] = useState({ ...user });

  const handleSave = () => {
    setUser({ ...tempUser });
    localStorage.setItem('bookstore_user', JSON.stringify(tempUser));
    setIsEditing(false);
    alert("Дані успішно збережено!");
  };

  return (
    <Container className="py-5">
      <Card className="shadow-sm border-0 p-4 rounded-4 bg-white border-top border-primary border-4">
        <h2 className="fw-bold mb-4 text-primary d-flex align-items-center"><span className="me-2">👤</span> Мій Профіль</h2>
        <Row>
          <Col md={4} className="text-center mb-4 border-end">
            <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center shadow-sm mb-3" 
                 style={{width: '120px', height: '120px', fontSize: '3rem', color: '#0056b3'}}>
              {user.firstName[0]}{user.lastName[0]}
            </div>
            <h4 className="fw-bold">{user.firstName} {user.lastName}</h4>
            <Button variant="outline-primary" size="sm" onClick={() => { setIsEditing(!isEditing); setTempUser({...user}); }}>
              {isEditing ? "Скасувати" : "⚙️ Налаштування"}
            </Button>
          </Col>
          <Col md={8} className="ps-md-5">
            {isEditing ? (
              <Form>
                <Row>
                  <Col md={6}><Form.Group className="mb-3"><Form.Label>Ім'я</Form.Label><Form.Control type="text" value={tempUser.firstName} onChange={(e) => setTempUser({...tempUser, firstName: e.target.value})}/></Form.Group></Col>
                  <Col md={6}><Form.Group className="mb-3"><Form.Label>Прізвище</Form.Label><Form.Control type="text" value={tempUser.lastName} onChange={(e) => setTempUser({...tempUser, lastName: e.target.value})}/></Form.Group></Col>
                </Row>
                <Form.Group className="mb-3"><Form.Label>Email</Form.Label><Form.Control type="email" value={tempUser.email} onChange={(e) => setTempUser({...tempUser, email: e.target.value})}/></Form.Group>
                <Button variant="primary" className="w-100 fw-bold" onClick={handleSave}>Зберегти зміни</Button>
              </Form>
            ) : (
              <div className="alert alert-info border-0 shadow-sm py-3">Замовлень не знайдено. Перейдіть до каталогу.</div>
            )}
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

// --- Основной Каталог ---
function BookCatalog() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [size, setSize] = useState(16); // Теперь 16 по умолчанию
  const [searchTerm, setSearchTerm] = useState('');

  const loadBooks = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/books');
      const data = await response.json();
      const items = Array.isArray(data) ? data : (data.content || []);
      
      const filtered = items.filter(b => 
        b.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        b.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      setBooks(filtered);
    } catch (error) {
      console.error("Ошибка связи с сервером:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooks();
  }, [searchTerm]);

  return (
    <Container className="py-4">
      <div className="mb-4 p-4 bg-white rounded-4 shadow-sm d-flex flex-wrap justify-content-between align-items-center border-start border-primary border-5 gap-3">
        <h2 className="fw-bold m-0 fs-4 text-dark">Каталог книг</h2>
        <Form.Control 
          type="text" 
          placeholder="🔍 Пошук за назвою або автором..." 
          className="w-50 border-0 bg-light shadow-none"
          style={{ minWidth: '250px' }}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="d-flex align-items-center gap-2">
            <span className="small text-muted fw-bold">ПОКАЗУВАТИ:</span>
            <ButtonGroup size="sm">
            {/* Обновленный список кнопок: 4, 8, 12, 16 */}
            {[4, 8, 12, 16].map(n => (
                <Button 
                  key={n} 
                  variant={size === n ? "primary" : "outline-primary"} 
                  onClick={() => setSize(n)}
                >
                  {n}
                </Button>
            ))}
            </ButtonGroup>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-5"><Spinner animation="border" variant="primary" /></div>
      ) : (
        /* Сетка 4 колонки идеально подходит для 16 книг (4 ряда по 4 книги) */
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {books.slice(0, size).map(book => (
            <Col key={book.id}>
              <Card className="book-shop-card border-0 h-100 shadow-sm overflow-hidden d-flex flex-column">
                <div className="cover-section">
                  <div className="book-3d">
                    <div className="book-side"></div>
                    <div className="book-front">
                      <img 
                        src={book.image?.startsWith('http') ? book.image : `http://localhost:8080${book.image}`} 
                        alt={book.title}
                        className="book-cover-img"
                        onError={(e) => { e.target.src = "https://via.placeholder.com/400x600?text=📘"; }}
                      />
                    </div>
                  </div>
                  <span className="badge-status">ХІТ</span>
                </div>

                <Card.Body className="p-3 d-flex flex-column flex-grow-1">
                  <RateStars rating={book.rating} />
                  <Card.Title className="book-title-text">{book.title}</Card.Title>
                  <Card.Text className="text-muted small mb-3">{book.author}</Card.Text>
                  
                  <div className="mt-auto pt-3 border-top d-flex justify-content-between align-items-center">
                    <div className="price-tag">
                      {book.price} <span className="currency">грн</span>
                    </div>
                    <Button className="btn-buy-blue">
                      <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
                          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                      </svg>
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

// --- Главный вход ---
function App() {
  return (
    <Router>
      <div className="main-bg min-vh-100">
        <Navbar bg="white" className="shadow-sm mb-4 py-3 sticky-top border-bottom border-primary border-3">
          <Container>
            <Navbar.Brand as={Link} to="/books" className="fw-bold fs-3 text-primary">
              BOOK<span className="text-dark">STORE</span>
            </Navbar.Brand>
            <Nav className="ms-auto align-items-center">
              <Nav.Link as={Link} to="/books" className="me-3 fw-bold text-dark">Книги</Nav.Link>
              <Nav.Link as={Link} to="/profile" className="me-3 fw-bold text-dark">Профіль</Nav.Link>
              <Link to="/register">
                <Button variant="primary" className="rounded-pill px-4 shadow-sm fw-bold">Реєстрація</Button>
              </Link>
            </Nav>
          </Container>
        </Navbar>

        <Routes>
          <Route path="/books" element={<BookCatalog />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Navigate to="/books" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;