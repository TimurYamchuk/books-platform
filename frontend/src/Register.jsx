import React from 'react';
import './Auth.css';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();

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
        // Після успішної реєстрації переходимо до каталогу
        navigate('/books');
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2>Registration</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Email:</Form.Label>
                        {/* ВИПРАВЛЕНО: дефіс у pattern перенесено в кінець для уникнення SyntaxError */}
                        <Form.Control 
                            type="email" 
                            required 
                            pattern="[a-zA-Z0-9._%+ \-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$" 
                            title="Введіть коректний email"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control 
                            type="password" 
                            required 
                            pattern="(?=.*[A-Z]).{8,}" 
                            title="Мінімум 8 символів та 1 велика літера" 
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Phone Number:</Form.Label>
                        <Form.Control 
                            type="tel" 
                            required 
                            pattern="[0-9]{10}" 
                            title="Введіть 10 цифр номера телефону" 
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Country:</Form.Label>
                        <Form.Select required defaultValue="">
                            <option value="" disabled>Select your country</option>
                            {countries.map((c, i) => <option key={i} value={c.toLowerCase()}>{c}</option>)}
                        </Form.Select>
                    </Form.Group>

                    <Button type="submit" className="btn-auth">Register</Button>
                </Form>
            </div>
        </div>
    );
}

export default Register;