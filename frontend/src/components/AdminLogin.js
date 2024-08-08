import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

function AdminLogin() {
    const [username, setUsername] = useState('Ankit');
    const [password, setPassword] = useState('8959634');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username === 'Ankit' && password === '8959634') {
            localStorage.setItem('isAdmin', 'true');
            navigate('/admin-dashboard');
        } else {
            setError('Invalid credentials');
        }
    };

    return (
        <form className="admin-login-form" onSubmit={handleSubmit}>
            <h2>Admin Login</h2>
            {error && <div className="error">{error}</div>}
            <label>Username</label>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <label>Password</label>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Login</button>
        </form>
    );
}

export default AdminLogin;
