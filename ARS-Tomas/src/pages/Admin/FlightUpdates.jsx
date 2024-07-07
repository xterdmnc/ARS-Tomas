import React, { useState } from 'react';
import './FlightUpdates.css';

// Sample flight data
const flightsData = [
    {
        id: 1,
        destination: 'Tokyo, Japan',
        airport: 'Haneda Airport (HND)',
        aircraft: 'Boeing 777',
        specialNote: 'Special VIP flights available.',
    },
    {
        id: 2,
        destination: 'Singapore',
        airport: 'Changi Airport (SIN)',
        aircraft: 'Airbus A350',
        specialNote: 'Special VIP flights available.',
    },
    {
        id: 3,
        destination: 'Sydney, Australia',
        airport: 'Sydney Airport (SYD)',
        aircraft: 'Boeing 787',
        specialNote: 'Special VIP flights available.',
    },
    {
        id: 4,
        destination: 'Seoul, South Korea',
        airport: 'Incheon International Airport (ICN)',
        aircraft: 'Airbus A380',
        specialNote: 'Special VIP flights available.',
    },
    {
        id: 5,
        destination: 'Hong Kong',
        airport: 'Hong Kong International Airport (HKG)',
        aircraft: 'Boeing 737',
        specialNote: 'Special VIP flights available.',
    },
    {
        id: 6,
        destination: 'Los Angeles, USA',
        airport: 'Los Angeles International Airport (LAX)',
        aircraft: 'Boeing 777',
        specialNote: 'Special VIP flights available.',
    },
    {
        id: 7,
        destination: 'Dubai, UAE',
        airport: 'Dubai International Airport (DXB)',
        aircraft: 'Airbus A380',
        specialNote: 'Special VIP flights available.',
    },
    {
        id: 8,
        destination: 'London, UK',
        airport: 'Heathrow Airport (LHR)',
        aircraft: 'Boeing 787',
        specialNote: 'Special VIP flights available.',
    },
    {
        id: 9,
        destination: 'Paris, France',
        airport: 'Charles de Gaulle Airport (CDG)',
        aircraft: 'Airbus A350',
        specialNote: 'Special VIP flights available.',
    },
    {
        id: 10,
        destination: 'Bangkok, Thailand',
        airport: 'Suvarnabhumi Airport (BKK)',
        aircraft: 'Boeing 737',
        specialNote: 'Special VIP flights available.',
    },
    {
        id: 11,
        destination: 'New York City, USA',
        airport: 'John F. Kennedy International Airport (JFK)',
        aircraft: 'Airbus A380',
        specialNote: 'Special VIP flights available.',
    },
    {
        id: 12,
        destination: 'Rome, Italy',
        airport: 'Leonardo da Vinci–Fiumicino Airport (FCO)',
        aircraft: 'Boeing 777',
        specialNote: 'Special VIP flights available.',
    },
    {
        id: 13,
        destination: 'Moscow, Russia',
        airport: 'Sheremetyevo International Airport (SVO)',
        aircraft: 'Airbus A350',
        specialNote: 'Special VIP flights available.',
    },
];

const FlightUpdates = () => {
    const [editFlightId, setEditFlightId] = useState(null);
    const [deleteFlightId, setDeleteFlightId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const handleEdit = (id) => {
        setEditFlightId(id === editFlightId ? null : id);
        // Reset delete confirmation
        setDeleteFlightId(null);
    };

    const handleDelete = (id) => {
        setDeleteFlightId(id);
    };

    const handleCancelDelete = () => {
        setDeleteFlightId(null);
    };

    const handleConfirmDelete = (id) => {
        // Implement delete functionality here
        console.log(`Deleting flight with ID ${id}`);
        // Reset delete confirmation
        setDeleteFlightId(null);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // Filter flights based on search term
    const filteredFlights = flightsData.filter((flight) =>
        flight.destination.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flight-updates-container">
            <h2>Flight Updates</h2>
            <div className="search-container">
                <label htmlFor="search">Search Destination:</label>
                <input
                    type="text"
                    id="search"
                    placeholder="Enter destination..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
            <div className="flight-list">
                {filteredFlights.map((flight) => (
                    <div key={flight.id} className="flight-card">
                        <div className="flight-info">
                            <h3>{flight.destination}</h3>
                            <p><strong>Landing Airport:</strong> {flight.airport}</p>
                            <p><strong>Aircraft:</strong> {flight.aircraft}</p>
                            {flight.specialNote && <p className="special-note">{flight.specialNote}</p>}
                        </div>
                        <div className="flight-actions">
                            <button onClick={() => handleEdit(flight.id)}>Edit</button>
                            <button onClick={() => handleDelete(flight.id)}>Delete</button>
                        </div>
                        {editFlightId === flight.id && (
                            <div className="edit-flight-form">
                                <h3>Edit Flight Details</h3>
                                {/* Replace with your edit form fields */}
                                <label>Destination:</label>
                                <input type="text" defaultValue={flight.destination} />
                                <label>Landing Airport:</label>
                                <input type="text" defaultValue={flight.airport} />
                                <label>Aircraft:</label>
                                <input type="text" defaultValue={flight.aircraft} />
                                <label>Special Note:</label>
                                <textarea defaultValue={flight.specialNote}></textarea>
                                <button type="submit">Save Changes</button>
                            </div>
                        )}
                        {deleteFlightId === flight.id && (
                            <div className="delete-confirmation">
                                <p>Are you sure you want to delete this flight?</p>
                                <div className="delete-buttons">
                                    <button onClick={() => handleConfirmDelete(flight.id)}>Yes</button>
                                    <button onClick={handleCancelDelete}>No</button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FlightUpdates;
