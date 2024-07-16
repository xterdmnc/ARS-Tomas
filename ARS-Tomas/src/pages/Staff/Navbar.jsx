import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css'; // Import CSS for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <NavLink exact to="/staff-dashboard/flights" activeClassName="active">Flights</NavLink>
        </li>
        <li>
          <NavLink to="/staff-dashboard/bookings" activeClassName="active">Booking</NavLink>
        </li>
        <li>
          <NavLink to="/staff-dashboard/payments" activeClassName="active">Payment List</NavLink>
        </li>
        <li>
          <NavLink to="/staff-dashboard/crew-assignment" activeClassName="active">Crew Assignment</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
