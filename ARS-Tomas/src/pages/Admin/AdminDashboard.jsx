import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route, Link } from 'react-router-dom';
import './AdminDashboard.css'; // Import the CSS file

// Import new components for each feature
import UserList from './UserList';
import UserForm from './UserForm';
import CrewAssignment from './CrewAssignment';
import FlightUpdates from './FlightUpdates';
import DelayCancellation from './DelayCancellation';
import SalesReports from './SalesReports';
import CustomerInsights from './CustomerInsights';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get('http://localhost:3001/api/users'); // Ensure the correct URL
            console.log('Full API response:', res.data); // Log the full response
            if (res.data.success && Array.isArray(res.data.users)) {
                setUsers(res.data.users);
            } else {
                setError('Failed to fetch users: Invalid response structure');
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching users:', error);
            setError(`Error fetching users: ${error.message}`);
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/api/users/${id}`); // Ensure the correct URL
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user', error);
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
                await axios.put(`http://localhost:3001/api/users/${user._id}`, user); // Ensure the correct URL
            } else {
                await axios.post('http://localhost:3001/api/users', user); // Ensure the correct URL
            }
            fetchUsers();
            setEditingUser(null);
            setShowForm(false);
        } catch (error) {
            console.error('Error saving user', error);
        }
    };

    return (
        <div className="admin-dashboard">
            <div className="sidebar">
                <ul>
                    <li><Link to="/admin/">User Management</Link></li> {/* Update to include /admin/ */}
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
                            <h1>User Management</h1>
                            {loading ? (
                                <p>Loading...</p>
                            ) : error ? (
                                <p>{error}</p>
                            ) : (
                                <>
                                    <div className="user-list-header">
                                        <h2>User List</h2>
                                        <button className="add-user-button" onClick={handleAddUser}>Add User</button>
                                    </div>
                                    <UserList users={users} onDelete={handleDelete} onEdit={handleEdit} />
                                    {showForm && <UserForm user={editingUser} onSave={handleSave} />}
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
