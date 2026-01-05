import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'; 
import { Container, Card, Spinner, Navbar, Nav, Form, Row, Col, Button, ButtonGroup } from 'react-bootstrap';
import Register from './Register'; 

// Тимчасові дані книг
const MOCK_BOOKS = [
  { id: 1, title: 'Відьмак: Останнє бажання', author: 'Анджей Сапковський', rating: 5, price: 480.00, image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=400' },
  { id: 2, title: 'Дюна', author: 'Френк Герберт', rating: 5, price: 550.00, image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=400' },
  { id: 3, title: 'Маленький принц', author: 'Антуан де Сент-Екзюпері', rating: 5, price: 320.00, image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400' },
  { id: 4, title: 'Мистецтво війни', author: 'Сунь-цзи', rating: 4, price: 290.00, image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=400' },
  { id: 5, title: 'Тіні забутих предків', author: 'Михайло Коцюбинський', rating: 5, price: 250.00, image: 'https://images.unsplash.com/photo-1614332287897-cdc485fa562d?q=80&w=400' },
  { id: 6, title: 'Код да Вінчі', author: 'Ден Браун', rating: 4, price: 420.00, image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=400' },
  { id: 7, title: 'Шерлок Холмс', author: 'Артур Конан Дойл', rating: 5, price: 380.00, image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=400' },
  { id: 8, title: 'Алхімік', author: 'Пауло Коельйо', rating: 4, price: 310.00, image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=400' }
];

// Компонент Особистого кабінету
const UserProfile = () => {
  // 1. Завантаження даних з localStorage або використання стандартних
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('bookstore_user');
    return saved ? JSON.parse(saved) : {
      firstName: "Іван",
      lastName: "Іванов",
      email: "ivanov@example.com"
    };
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempUser, setTempUser] = useState({ ...user });

  // 2. Функція збереження
  const handleSave = () => {
    setUser({ ...tempUser });
    localStorage.setItem('bookstore_user', JSON.stringify(tempUser));
    setIsEditing(false);
    alert("Дані успішно збережено у пам'ять браузера!");
  };

  return (
    <Container className="py-5">
      <Card className="shadow-sm border-0 p-4 rounded-4 bg-white border-top border-primary border-4">
        <h2 className="fw-bold mb-4 text-primary d-flex align-items-center">
          <span className="me-2">👤</span> Мій Профіль
        </h2>
        
        <Row>
          <Col md={4} className="text-center mb-4 border-end">
            <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center shadow-sm mb-3" 
                 style={{width: '120px', height: '120px', fontSize: '3rem', color: '#0056b3'}}>
              {user.firstName[0]}{user.lastName[0]}
            </div>
            <h4 className="fw-bold">{user.firstName} {user.lastName}</h4>
            <p className="text-muted small">{user.email}</p>
            
            <Button 
                variant={isEditing ? "outline-secondary" : "outline-primary"} 
                size="sm" 
                onClick={() => {
                    setIsEditing(!isEditing);
                    setTempUser({...user});
                }}
            >
              {isEditing ? "Скасувати" : "⚙️ Налаштування профілю"}
            </Button>
          </Col>

          <Col md={8} className="ps-md-5">
            {isEditing ? (
              <div className="p-3 bg-light rounded-3 shadow-sm border">
                <h5 className="mb-3 text-dark fw-bold">Редагування персональних даних</h5>
                <Form>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="small fw-bold">Ім'я</Form.Label>
                        <Form.Control 
                          type="text" 
                          value={tempUser.firstName} 
                          onChange={(e) => setTempUser({...tempUser, firstName: e.target.value})}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="small fw-bold">Прізвище</Form.Label>
                        <Form.Control 
                          type="text" 
                          value={tempUser.lastName} 
                          onChange={(e) => setTempUser({...tempUser, lastName: e.target.value})}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group className="mb-3">
                    <Form.Label className="small fw-bold">Email (логін)</Form.Label>
                    <Form.Control 
                      type="email" 
                      value={tempUser.email} 
                      onChange={(e) => setTempUser({...tempUser, email: e.target.value})}
                    />
                  </Form.Group>
                  <Button variant="primary" className="w-100 fw-bold" onClick={handleSave}>
                    Зберегти зміни
                  </Button>
                </Form>
              </div>
            ) : (
              <div className="info-display">
                <h5 className="fw-bold mb-3">Статус замовлень</h5>
                <div className="alert alert-info border-0 shadow-sm py-3 mb-4">
                  Замовлень не знайдено. Перейдіть до каталогу, щоб обрати книги.
                </div>
                
                <h5 className="fw-bold mt-4">Фінансовий кабінет</h5>
                <div className="p-3 bg-white border border-primary border-opacity-25 rounded-3 shadow-sm d-flex justify-content-between align-items-center">
                   <div className="d-flex align-items-center">
                        <span className="fs-2 me-3">💎</span>
                        <div>
                            <div className="small text-muted">Доступні бонуси</div>
                            <div className="fw-bold text-primary fs-5">250 грн</div>
                        </div>
                   </div>
                   <Button variant="outline-primary" size="sm">Використати</Button>
                </div>

                <div className="mt-4 p-3 bg-light rounded shadow-sm d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="fw-bold mb-0">Безпека</h6>
                    <small className="text-muted">Ваш пароль останній раз було змінено 30 днів тому</small>
                  </div>
                  <Button variant="link" className="text-primary fw-bold text-decoration-none">Змінити</Button>
                </div>
              </div>
            )}
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

const RateStars = ({ rating }) => (
  <div className="mb-2" style={{ fontSize: '0.85rem' }}>
    {[1, 2, 3, 4, 5].map(i => (
      <span key={i} style={{ color: i <= (rating || 0) ? "#0056b3" : "#dee2e6" }}>★</span>
    ))}
  </div>
);

function BookCatalog() {
  const [books] = useState(MOCK_BOOKS);
  const [size, setSize] = useState(4);

  return (
    <Container className="py-4">
      <div className="mb-4 p-4 bg-white rounded-4 shadow-sm d-flex justify-content-between align-items-center border-start border-primary border-5">
        <h2 className="fw-bold m-0 fs-4 text-dark">Каталог книг</h2>
        <div className="d-flex align-items-center gap-2">
            <span className="small text-muted fw-bold">ПОКАЗУВАТИ ПО:</span>
            <ButtonGroup size="sm">
            {[2, 4, 8].map(n => (
                <Button key={n} variant={size === n ? "primary" : "outline-primary"} onClick={() => setSize(n)}>{n}</Button>
            ))}
            </ButtonGroup>
        </div>
      </div>

      <Row xs={1} sm={2} lg={4} className="g-4">
        {books.slice(0, size).map(book => (
          <Col key={book.id}>
            <Card className="book-shop-card border-0 h-100 shadow-sm overflow-hidden">
              <div className="cover-section">
                <span className="badge-status">ХІТ</span>
                <div className="book-3d"><div className="book-side"></div><div className="book-front">📘</div></div>
              </div>
              <Card.Body className="p-3 d-flex flex-column">
                <RateStars rating={book.rating} />
                <Card.Title className="book-title-text fw-bold" style={{fontSize: '0.95rem'}}>{book.title}</Card.Title>
                <Card.Text className="text-muted small mb-3">{book.author}</Card.Text>
                <div className="mt-auto pt-3 border-top d-flex justify-content-between align-items-center">
                  <div className="price-tag text-primary fw-bold fs-5">{book.price} <span className="small fw-normal">грн</span></div>
                  <Button className="btn-buy-blue shadow-sm border-0" style={{background: '#0056b3'}}>
                    <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
                        <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
                    </svg>
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

function App() {
  return (
    <Router>
      <div className="main-bg min-vh-100">
        <Navbar bg="white" className="shadow-sm mb-4 py-3 sticky-top border-bottom border-primary border-3">
          <Container>
            <Navbar.Brand as={Link} to="/books" className="fw-bold fs-3 text-primary">BOOK<span className="text-dark">STORE</span></Navbar.Brand>
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