import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('userRole');
        navigate('/login');
    };

    const userRole = localStorage.getItem('userRole');

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <img src="/SkyEase.png" alt="SkyEase Logo" className="navbar-logo" /> {/* Replace with your airline logo */}
                <Link to="/" className="navbar-title">SkyEase: Where Convenience Meets the Sky</Link>
            </div>
            <div className="navbar-links">
                <ul className="navbar-menu">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About Us</Link></li>
                    <li><Link to="/flights">Discover Flights</Link></li>
                    <li><Link to="/explore">Explore</Link></li>
                </ul>
                {!userRole ? (
                    <Link to="/login" className="navbar-login">Login</Link>
                ) : (
                    <div className="user-links">
                        {userRole === 'admin' && (
                            <>
                                <Link to="/admin/audit-logs">Audit Logs</Link> {/* Add Audit Logs Link */}
                                <Link to="/admin">Admin Dashboard</Link>
                            </>
                        )}
                        {userRole === 'staff' && <Link to="/staff">Staff Dashboard</Link>}
                        {userRole === 'customer' && <Link to="/dashboard">Dashboard</Link>}
                        <button onClick={handleLogout} className="navbar-logout">Logout</button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
