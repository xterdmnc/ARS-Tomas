import React, { useState } from 'react';

const UserForm = ({ user, onSave, onCancel }) => {
    const [values, setValues] = useState({
        username: user?.username || '',
        password: '',
        role: user?.role || 'customer',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (window.confirm('Are you sure you want to save this user?')) {
            onSave(values);
        }
    };

    return (
        <div className="admin-form">
            <h2>{user ? 'Edit User' : 'Add User'}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    placeholder="Username"
                    required
                />
                {!user && (
                    <input
                        type="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        placeholder="Password"
                        required
                    />
                )}
                <select name="role" value={values.role} onChange={handleChange}>
                    <option value="customer">Customer</option>
                    <option value="staff">Staff</option>
                    <option value="admin">Admin</option>
                </select>
                <div className="form-buttons">
                    <button type="submit">Save</button>
                    {onCancel && <button type="button" onClick={onCancel}>Cancel</button>}
                </div>
            </form>
        </div>
    );
};

export default UserForm;
