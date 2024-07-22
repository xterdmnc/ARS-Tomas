import React, { useState, useEffect } from 'react';

const UserForm = ({ user, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        lastName: '',
        firstName: '',
        email: '',
        username: '',
        password: '',
        role: 'customer'
    });

    useEffect(() => {
        if (user) {
            setFormData({
                lastName: user.lastName || '',
                firstName: user.firstName || '',
                email: user.email || '',
                username: user.username || '',
                password: '',
                role: user.role || 'customer'
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                required
            />
            <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                required
            />
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
            />
            <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                required
            />
            <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                // Password is optional for updates, so no 'required'
            />
            <select
                name="role"
                value={formData.role}
                onChange={handleChange}
            >
                <option value="customer">Customer</option>
                <option value="staff">Staff</option>
                <option value="admin">Admin</option>
            </select>
            <button type="submit">Save</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </form>
    );
};

export default UserForm;
