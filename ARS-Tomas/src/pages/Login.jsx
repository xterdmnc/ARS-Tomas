import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './css/Login.css';
const { VITE_HOST } = import.meta.env;

const Login = () => {
    const [values, setValues] = useState({
        username: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${VITE_HOST}api/loginuser`, {
                username: values.username,
                password: values.password
            });

            if (res.data.success) {
                localStorage.setItem('userRole', res.data.role);

                if (res.data.role === 'admin') {
                    navigate('/admin');
                } else if (res.data.role === 'staff') {
                    navigate('/staff');
                } else {
                    navigate('/dashboard');
                }
            } else {
                alert(res.data.message || 'Login failed. Please try again.');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Failed to login. Please try again later.');
        }
    };

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setValues((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="login">
            <form onSubmit={handleLogin} className="login-form">
                <h2>Welcome to SkyEase!</h2>
                <h4>Login to Your Account</h4>
                <div className="form-group">
                    <input
                        type="text"
                        name="username"
                        value={values.username}
                        onChange={handleOnChange}
                        placeholder="Username"
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        name="password"
                        value={values.password}
                        onChange={handleOnChange}
                        placeholder="Password"
                        className="form-control"
                    />
                </div>
                <button type="submit" className="btn-primary">Login</button>
                <p className="signup-link">
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;