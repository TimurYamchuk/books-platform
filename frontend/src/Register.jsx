import React, { useState } from 'react';
import './Auth.css';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phone: '',
        country: '',
        gender: ''
    });

    const countries = [
        "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
        "Bahamas", "Bahrain", "Bangladesh", "Belgium", "Brazil", "Bulgaria", "Canada", "Chile", "Colombia", 
        "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Egypt", "Estonia", "Finland", "France", "Georgia", "Germany", 
        "Greece", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Japan", "Kazakhstan", 
        "Latvia", "Lithuania", "Luxembourg", "Mexico", "Moldova", "Monaco", "Montenegro", "Netherlands", "Norway", "Poland", 
        "Portugal", "Romania", "Serbia", "Slovakia", "Slovenia", "South Africa", "Spain", "Sweden", "Switzerland", 
        "Thailand", "Turkey", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uzbekistan", "Vietnam"
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        // Зберігаємо дані користувача в localStorage
        localStorage.setItem('bookstore_user', JSON.stringify(formData));
        alert("Реєстрація успішна!");
        navigate('/profile');
    };

    return (
        <div className="auth-page py-5">
            <Container className="d-flex justify-content-center">
                <div className="auth-card shadow-lg p-4 rounded-4" style={{ maxWidth: '550px', width: '100%', background: 'white' }}>
                    <h2 className="text-center fw-bold mb-4" style={{ color: '#4481eb' }}>Registration</h2>
                    <Form onSubmit={handleSubmit}>
                        
                        {/* ІМ'Я ТА ПРІЗВИЩЕ В ОДНОМУ РЯДКУ */}
                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label className="fw-bold small">Name:</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Name"
                                        required 
                                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label className="fw-bold small">Surname:</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Surname"
                                        required 
                                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        {/* СТАТЬ */}
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-bold small">Gender:</Form.Label>
                            <div className="d-flex gap-4 mt-1">
                                <Form.Check 
                                    type="radio" label="Male" name="gender" required
                                    onChange={() => setFormData({...formData, gender: 'Чоловік'})} 
                                />
                                <Form.Check 
                                    type="radio" label="Female" name="gender" required
                                    onChange={() => setFormData({...formData, gender: 'Жінка'})} 
                                />
                            </div>
                        </Form.Group>

                        {/* EMAIL */}
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-bold small">Email:</Form.Label>
                            <Form.Control 
                                type="email" 
                                required 
                                pattern="[a-zA-Z0-9._%+ \-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$" 
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                            />
                        </Form.Group>

                        {/* ПАРОЛЬ */}
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-bold small">Password:</Form.Label>
                            <Form.Control 
                                type="password" 
                                required 
                                pattern="(?=.*[A-Z]).{8,}" 
                                title="Мінімум 8 символів та 1 велика літера"
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                            />
                        </Form.Group>

                        {/* ТЕЛЕФОН ТА КРАЇНА ТАКОЖ МОЖНА В ОДИН РЯДОК ДЛЯ КОМПАКТНОСТІ */}
                        <Row className="mb-4">
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label className="fw-bold small">Phone Number:</Form.Label>
                                    <Form.Control 
                                        type="tel" 
                                        required 
                                        pattern="[0-9]{10}" 
                                        placeholder="0991234567"
                                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label className="fw-bold small">Country:</Form.Label>
                                    <Form.Select 
                                        required 
                                        defaultValue=""
                                        onChange={(e) => setFormData({...formData, country: e.target.value})}
                                    >
                                        <option value="" disabled>Select country</option>
                                        {countries.map((c, i) => <option key={i} value={c}>{c}</option>)}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Button type="submit" className="btn-auth w-100 py-2 fw-bold shadow-sm" style={{ background: '#4481eb', border: 'none', borderRadius: '50px' }}>
                            Register
                        </Button>
                    </Form>
                </div>
            </Container>
        </div>
    );
}

export default Register;