import React from 'react';
import './Auth.css';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // После нажатия на кнопку переходим к списку книг
        navigate('/books');
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2>Registration</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control 
                            type="email" 
                            required 
                            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                            title="Enter a valid email address"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control 
                            type="password" 
                            required 
                            pattern="(?=.*[A-Z]).{8,}"
                            title="Password must be at least 8 characters and contain at least one uppercase letter"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Phone Number:</Form.Label>
                        <Form.Control 
                            type="tel" 
                            required 
                            pattern="[0-9]{10}"
                            title="Enter a valid 10-digit phone number"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Country:</Form.Label>
                        <Form.Select required>
                            <option value="uk">Ukrain</option>
                            <option value="od">Odessa</option>
                            <option value="ky">Kiev</option>
                            <option value="lv">Lvov</option>
                        </Form.Select>
                    </Form.Group>

                    <Button type="submit" className="btn-auth">
                        Register
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default Register;