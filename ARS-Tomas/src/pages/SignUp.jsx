import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/SignUp.css';
import axios from 'axios';
const { VITE_HOST } = import.meta.env;

const SignUp = () => {
    const [values, setValues] = useState({
        lastName: '',
        firstName: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        role: 'customer' // default role
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();

        const { lastName, firstName, email, username, password, confirmPassword, role } = values;

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            const res = await axios.post(`${VITE_HOST}/api/createuser`, {
                lastName,
                firstName,
                email,
                username,
                password,
                confirm: confirmPassword,
                role
            });
            if (res.data.success) {
                setMessage('Account successfully created');
                setTimeout(() => navigate('/login'), 3000); // Redirect after 3 seconds
            } else {
                setMessage(res.data.message);
            }
        } catch (error) {
            console.error(error);
            setMessage('Failed to sign up. Please try again later.');
        }
    };

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setValues((prev) => ({
            ...prev,
            [name]: value
        }));
        console.log(values)
    };

    return (
        <div className="signup">
            <div className="signup-overlay"></div>
            <form onSubmit={handleSignUp} className="signup-form">
                <h2>Create Your Account</h2>
                {message && <p className="message">{message}</p>}
                <div className="form-group">
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={values.lastName}
                        onChange={handleOnChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={values.firstName}
                        onChange={handleOnChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={values.email}
                        onChange={handleOnChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={values.username}
                        onChange={handleOnChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={values.password}
                        onChange={handleOnChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={values.confirmPassword}
                        onChange={handleOnChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <select
                        name="role"
                        value={values.role}
                        onChange={handleOnChange}
                        className="form-control"
                    >
                        <option value="customer">Customer</option>
                        {/* <option value="staff">Staff</option> */}
                    </select>
                </div>
                <button type="submit" className="btn-primary">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUp;