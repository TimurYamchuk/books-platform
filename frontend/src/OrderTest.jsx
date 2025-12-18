import React, { useState } from 'react';
import { Container, Button, Card, Alert, ButtonGroup, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const API_URL = 'http://localhost:8080/api/orders';

function OrderTest() {
    const [result, setResult] = useState('');
    const [status, setStatus] = useState(null);

    // Тест авторизації (ДЗ)
    const testAuth = async (login, password) => {
        let token = (login === "admin" && password === "12345") 
            ? "Bearer valid-token-123" 
            : "Bearer wrong-token-xyz";

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': token 
                },
                body: JSON.stringify({ item: "Книга", qty: 1 })
            });
            const text = await response.text();
            setStatus(response.status);
            setResult(text);
        } catch (err) {
            setStatus("CORS Error");
            setResult("Блокування CORS: Перевірте @CrossOrigin на бекенді та перезапустіть його.");
        }
    };

    // Тест методів (ДЗ)
    const testMethod = async (method) => {
        const hasBody = ['POST', 'PUT', 'PATCH'].includes(method);
        try {
            const response = await fetch(API_URL, {
                method: method,
                headers: { 
                    'Authorization': 'Bearer valid-token-123',
                    'Content-Type': 'application/json' 
                },
                body: hasBody ? JSON.stringify({ testData: "Info for " + method }) : null
            });
            const text = await response.text();
            setStatus(response.status);
            setResult(text);
        } catch (err) {
            setStatus("Error");
            setResult("Помилка запиту " + method);
        }
    };

    return (
        <div style={{ backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand>🧪 API Testing Lab</Navbar.Brand>
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/books">До каталогу</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>

            <Container className="py-5">
                <Card className="shadow-lg border-0">
                    <Card.Header className="bg-white">
                        <h4 className="mb-0">Панель керування замовленнями</h4>
                    </Card.Header>
                    <Card.Body>
                        <h5 className="mb-3">Автентифікація:</h5>
                        <div className="d-flex gap-2 mb-4">
                            <Button variant="outline-danger" onClick={() => testAuth("admin", "111")}>Вірний логін / Невірний пароль</Button>
                            <Button variant="outline-warning" onClick={() => testAuth("user", "12345")}>Невірний логін / Вірний пароль</Button>
                            <Button variant="success" onClick={() => testAuth("admin", "12345")}>Все правильно</Button>
                        </div>

                        <hr />
                        <h5 className="mb-3">Методи API:</h5>
                        <ButtonGroup className="w-100 mb-4">
                            {['GET', 'POST', 'PUT', 'PATCH', 'DELETE'].map(m => (
                                <Button key={m} variant="primary" onClick={() => testMethod(m)}>{m}</Button>
                            ))}
                        </ButtonGroup>

                        {status && (
                            <Alert variant={typeof status === 'number' && status < 300 ? "success" : "danger"}>
                                <h6>Статус: {status}</h6>
                                <p className="mb-0">{result}</p>
                            </Alert>
                        )}
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}

export default OrderTest;