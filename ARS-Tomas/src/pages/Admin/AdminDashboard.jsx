import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

// Import new components for each feature
import UserList from './UserList';
import UserForm from './UserForm';
import CrewAssignment from './CrewAssignment';
import FlightUpdates from './FlightUpdates';
import DelayCancellation from './DelayCancellation';
import SalesReports from './SalesReports';
import CustomerInsights from './CustomerInsights';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const { VITE_HOST } = import.meta.env;

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get(`${VITE_HOST}/api/users`);
            if (res.data.success && Array.isArray(res.data.users)) {
                setUsers(res.data.users);
            } else {
                setError('Failed to fetch users: Invalid response structure');
            }
        } catch (error) {
            setError(`Error fetching users: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${VITE_HOST}/api/users/${id}`);
            fetchUsers();
        } catch (error) {
            setError(`Error deleting user: ${error.message}`);
        }
    };

    const handleEdit = (user) => {
        setEditingUser(user);
        setShowForm(true);
    };

    const handleAddUser = () => {
        setEditingUser(null);
        setShowForm(true);
    };

    const handleSave = async (user) => {
        try {
            if (user._id) {
                await axios.put(`${VITE_HOST}/api/users/${user._id}`, user);
            } else {
                await axios.post(`${VITE_HOST}/api/createuser`, user); // Ensure the endpoint is correct
            }
            fetchUsers();
            setEditingUser(null);
            setShowForm(false);
            navigate('/admin');
        } catch (error) {
            setError(`Error saving user: ${error.message}`);
        }
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="admin-dashboard">
            <div className="sidebar">
                <ul>
                    <li><Link to="/admin/">User Management</Link></li>
                    <li><Link to="/admin/crew-assignment">Crew Management</Link></li>
                    <li><Link to="/admin/flight-updates">Flight Updates</Link></li>
                    <li><Link to="/admin/delay-cancellation">Delay & Cancellation</Link></li>
                    <li><Link to="/admin/sales-reports">Sales Reports</Link></li>
                    <li><Link to="/admin/customer-insights">Customer Insights</Link></li>
                </ul>
            </div>
            <div className="content">
                <Routes>
                    <Route path="/" element={
                        <>
                            <div className="user-list-header">
                                <h1>User Management</h1>
                                <div className="search-user">
                                    <input
                                        type="text"
                                        placeholder="Search users"
                                        value={searchQuery}
                                        onChange={handleSearch}
                                    />
                                    <button className="add-user-button" onClick={handleAddUser}>Add User</button>
                                </div>
                            </div>
                            {loading ? (
                                <p>Loading...</p>
                            ) : error ? (
                                <p>{error}</p>
                            ) : (
                                <>
                                    <div className="user-list-container">
                                        {filteredUsers.map(user => (
                                            <div key={user._id} className="user-card">
                                                <div className="user-details">
                                                    <p><strong>Username:</strong> {user.username}</p>
                                                    <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
                                                    <p><strong>Email:</strong> {user.email}</p>
                                                </div>
                                                <div className="user-actions">
                                                    <button onClick={() => handleEdit(user)}>Edit</button>
                                                    <button onClick={() => handleDelete(user._id)}>Delete</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    {showForm && <UserForm user={editingUser} onSave={handleSave} onCancel={() => setShowForm(false)} />}
                                </>
                            )}
                        </>
                    } />
                    <Route path="crew-assignment" element={<CrewAssignment />} />
                    <Route path="flight-updates" element={<FlightUpdates />} />
                    <Route path="delay-cancellation" element={<DelayCancellation />} />
                    <Route path="sales-reports" element={<SalesReports />} />
                    <Route path="customer-insights" element={<CustomerInsights />} />
                </Routes>
            </div>
        </div>
    );
};

export default AdminDashboard;
