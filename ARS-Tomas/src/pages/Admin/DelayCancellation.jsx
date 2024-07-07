// DelayCancellation.jsx

import React, { useState } from 'react';
import './DelayCancellation.css';

// Sample flight data
const flightsData = [
    {
        id: 1,
        destination: 'Tokyo, Japan',
        airport: 'Haneda Airport (HND)',
        aircraft: 'Boeing 777',
        specialNote: 'Special VIP flights available.',
        scheduledTime: '2024-07-15T10:30:00Z',
        status: 'On-time',
        delayReason: '',
    },
    {
        id: 2,
        destination: 'Singapore',
        airport: 'Changi Airport (SIN)',
        aircraft: 'Airbus A350',
        specialNote: 'Special VIP flights available.',
        scheduledTime: '2024-07-16T12:00:00Z',
        status: 'On-time',
        delayReason: '',
    },
    {
        id: 3,
        destination: 'Sydney, Australia',
        airport: 'Sydney Airport (SYD)',
        aircraft: 'Boeing 787',
        specialNote: 'Special VIP flights available.',
        scheduledTime: '2024-07-17T11:15:00Z',
        status: 'On-time',
        delayReason: '',
    },
    {
        id: 4,
        destination: 'Seoul, South Korea',
        airport: 'Incheon International Airport (ICN)',
        aircraft: 'Airbus A380',
        specialNote: 'Special VIP flights available.',
        scheduledTime: '2024-07-18T09:45:00Z',
        status: 'On-time',
        delayReason: '',
    },
    {
        id: 5,
        destination: 'Hong Kong',
        airport: 'Hong Kong International Airport (HKG)',
        aircraft: 'Boeing 737',
        specialNote: 'Special VIP flights available.',
        scheduledTime: '2024-07-19T08:00:00Z',
        status: 'On-time',
        delayReason: '',
    },
    {
        id: 6,
        destination: 'Los Angeles, USA',
        airport: 'Los Angeles International Airport (LAX)',
        aircraft: 'Boeing 777',
        specialNote: 'Special VIP flights available.',
        scheduledTime: '2024-07-20T14:30:00Z',
        status: 'On-time',
        delayReason: '',
    },
    {
        id: 7,
        destination: 'Dubai, UAE',
        airport: 'Dubai International Airport (DXB)',
        aircraft: 'Airbus A380',
        specialNote: 'Special VIP flights available.',
        scheduledTime: '2024-07-21T13:45:00Z',
        status: 'On-time',
        delayReason: '',
    },
    {
        id: 8,
        destination: 'London, UK',
        airport: 'Heathrow Airport (LHR)',
        aircraft: 'Boeing 787',
        specialNote: 'Special VIP flights available.',
        scheduledTime: '2024-07-22T16:00:00Z',
        status: 'On-time',
        delayReason: '',
    },
    {
        id: 9,
        destination: 'Paris, France',
        airport: 'Charles de Gaulle Airport (CDG)',
        aircraft: 'Airbus A350',
        specialNote: 'Special VIP flights available.',
        scheduledTime: '2024-07-23T17:30:00Z',
        status: 'On-time',
        delayReason: '',
    },
    {
        id: 10,
        destination: 'Bangkok, Thailand',
        airport: 'Suvarnabhumi Airport (BKK)',
        aircraft: 'Boeing 737',
        specialNote: 'Special VIP flights available.',
        scheduledTime: '2024-07-24T18:45:00Z',
        status: 'On-time',
        delayReason: '',
    },
    {
        id: 11,
        destination: 'New York City, USA',
        airport: 'John F. Kennedy International Airport (JFK)',
        aircraft: 'Airbus A380',
        specialNote: 'Special VIP flights available.',
        scheduledTime: '2024-07-25T20:00:00Z',
        status: 'On-time',
        delayReason: '',
    },
    {
        id: 12,
        destination: 'Rome, Italy',
        airport: 'Leonardo da Vinci–Fiumicino Airport (FCO)',
        aircraft: 'Boeing 777',
        specialNote: 'Special VIP flights available.',
        scheduledTime: '2024-07-26T21:15:00Z',
        status: 'On-time',
        delayReason: '',
    },
    {
        id: 13,
        destination: 'Moscow, Russia',
        airport: 'Sheremetyevo International Airport (SVO)',
        aircraft: 'Airbus A350',
        specialNote: 'Special VIP flights available.',
        scheduledTime: '2024-07-27T22:30:00Z',
        status: 'On-time',
        delayReason: '',
    },
    // Add more flights as needed
];

const DelayCancellation = () => {
    const [flights, setFlights] = useState(flightsData);
    const [selectedFlight, setSelectedFlight] = useState(null);
    const [delayReasons, setDelayReasons] = useState([
        'Weather conditions',
        'Technical issues',
        'Crew availability',
        'Air traffic control',
        'Operational reasons',
    ]);
    const [searchTerm, setSearchTerm] = useState('');

    // Function to handle editing a flight
    const handleEditFlight = (id) => {
        const flightToEdit = flights.find((flight) => flight.id === id);
        setSelectedFlight(flightToEdit);
    };

    // Function to handle deleting a flight
    const handleDeleteFlight = (id) => {
        if (window.confirm('Are you sure you want to delete this flight?')) {
            const updatedFlights = flights.filter((flight) => flight.id !== id);
            setFlights(updatedFlights);
        }
    };

    // Function to handle saving delay reason
    const handleSaveDelayReason = (id, reason) => {
        const updatedFlights = flights.map((flight) =>
            flight.id === id ? { ...flight, delayReason: reason } : flight
        );
        setFlights(updatedFlights);
        setSelectedFlight(null); // Clear selected flight after saving reason
    };

    // Function to handle cancelling or delaying a flight
    const handleCancelOrDelayFlight = (id, status) => {
        if (window.confirm(`Are you sure you want to ${status.toLowerCase()} this flight?`)) {
            const updatedFlights = flights.map((flight) =>
                flight.id === id ? { ...flight, status: status } : flight
            );
            setFlights(updatedFlights);
        }
    };

    // Function to handle searching for a flight
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    // Filter flights based on search term
    const filteredFlights = flights.filter((flight) =>
        flight.destination.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="delay-cancellation-container">
            <header className="delay-cancellation-header">
                <h1>Flight Delay & Cancellation Management</h1>
                <p>Manage and update flight status, delay reasons, and cancellations.</p>
            </header>
            <section className="flight-list">
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search by destination..."
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>
                {filteredFlights.length > 0 ? (
                    filteredFlights.map((flight) => (
                        <div key={flight.id} className="flight-card">
                            <div className="flight-info">
                                <h2>{flight.destination}</h2>
                                <p><strong>Landing Airport:</strong> {flight.airport}</p>
                                <p><strong>Aircraft:</strong> {flight.aircraft}</p>
                                <p><strong>Scheduled Time:</strong> {new Date(flight.scheduledTime).toLocaleString()}</p>
                                <p><strong>Status:</strong> {flight.status}</p>
                                {flight.delayReason && (
                                    <p><strong>Delay Reason:</strong> {flight.delayReason}</p>
                                )}
                                {flight.specialNote && <p className="special-note">{flight.specialNote}</p>}
                                {selectedFlight && selectedFlight.id === flight.id && (
                                    <div className="edit-section">
                                        <select onChange={(e) => handleSaveDelayReason(flight.id, e.target.value)}>
                                            <option value="">Select delay reason...</option>
                                            {delayReasons.map((reason, index) => (
                                                <option key={index} value={reason}>{reason}</option>
                                            ))}
                                        </select>
                                        <button onClick={() => handleCancelOrDelayFlight(flight.id, 'Delayed')}>
                                            Delay
                                        </button>
                                        <button onClick={() => handleCancelOrDelayFlight(flight.id, 'Cancelled')}>
                                            Cancel
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div className="flight-actions">
                                <button onClick={() => handleEditFlight(flight.id)}>Edit</button>
                                <button onClick={() => handleDeleteFlight(flight.id)}>Delete</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No flights found.</p>
                )}
            </section>
        </div>
    );
};

export default DelayCancellation;
