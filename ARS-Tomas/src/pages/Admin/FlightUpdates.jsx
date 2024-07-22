import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FlightUpdates.css';

const FlightUpdates = () => {
    const [flights, setFlights] = useState([]);
    const [editFlightId, setEditFlightId] = useState(null);
    const [deleteFlightId, setDeleteFlightId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [newFlight, setNewFlight] = useState({
        destination: '',
        airport: '',
        aircraft: ''
    });

    useEffect(() => {
        fetchFlights();
    }, []);

    const fetchFlights = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_HOST}/api/flight`);
            setFlights(response.data);
        } catch (error) {
            console.error('Error fetching flights:', error);
        }
    };

    const handleEdit = (id) => {
        setEditFlightId(id === editFlightId ? null : id);
        setDeleteFlightId(null);
    };

    const handleDelete = (id) => {
        setDeleteFlightId(id);
    };

    const handleCancelDelete = () => {
        setDeleteFlightId(null);
    };

    const handleConfirmDelete = async (id) => {
        try {
            await axios.delete(`${import.meta.env.VITE_HOST}/api/flight/${id}`);
            setFlights(flights.filter((flight) => flight.id !== id));
            setDeleteFlightId(null);
        } catch (error) {
            console.error('Error deleting flight:', error);
        }
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewFlight({ ...newFlight, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_HOST}/api/flight`, newFlight);
            setFlights([...flights, response.data]);
            setNewFlight({
                destination: '',
                airport: '',
                aircraft: ''
            });
        } catch (error) {
            console.error('Error adding flight:', error);
        }
    };

    const handleSaveChanges = async (id) => {
        const updatedFlight = flights.find((flight) => flight.id === id);
        try {
            await axios.put(`${import.meta.env.VITE_HOST}/api/flight/${id}`, updatedFlight);
            setEditFlightId(null);
        } catch (error) {
            console.error('Error updating flight:', error);
        }
    };

    const handleEditChange = (id, event) => {
        const { name, value } = event.target;
        setFlights(
            flights.map((flight) =>
                flight.id === id ? { ...flight, [name]: value } : flight
            )
        );
    };

    // Filter flights based on search term
    const filteredFlights = flights.filter((flight) =>
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
            <div className="new-flight-form">
                <h3>Add New Flight</h3>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="destination">Destination:</label>
                    <input
                        type="text"
                        id="destination"
                        name="destination"
                        value={newFlight.destination}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="airport">Airport:</label>
                    <input
                        type="text"
                        id="airport"
                        name="airport"
                        value={newFlight.airport}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="aircraft">Aircraft:</label>
                    <input
                        type="text"
                        id="aircraft"
                        name="aircraft"
                        value={newFlight.aircraft}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">Add Flight</button>
                </form>
            </div>
            <div className="flight-list">
                {filteredFlights.map((flight) => (
                    <div key={flight.id} className="flight-card">
                        {editFlightId === flight.id ? (
                            <div>
                                <h3>Edit Flight</h3>
                                <form>
                                    <label htmlFor={`destination-${flight.id}`}>Destination:</label>
                                    <input
                                        type="text"
                                        id={`destination-${flight.id}`}
                                        name="destination"
                                        value={flight.destination}
                                        onChange={(event) => handleEditChange(flight.id, event)}
                                    />
                                    <label htmlFor={`airport-${flight.id}`}>Airport:</label>
                                    <input
                                        type="text"
                                        id={`airport-${flight.id}`}
                                        name="airport"
                                        value={flight.airport}
                                        onChange={(event) => handleEditChange(flight.id, event)}
                                    />
                                    <label htmlFor={`aircraft-${flight.id}`}>Aircraft:</label>
                                    <input
                                        type="text"
                                        id={`aircraft-${flight.id}`}
                                        name="aircraft"
                                        value={flight.aircraft}
                                        onChange={(event) => handleEditChange(flight.id, event)}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleSaveChanges(flight.id)}
                                    >
                                        Save Changes
                                    </button>
                                    <button type="button" onClick={() => handleEdit(flight.id)}>
                                        Cancel
                                    </button>
                                </form>
                            </div>
                        ) : (
                            <div>
                                <div className="flight-info">
                                    <h3>{flight.destination}</h3>
                                    <p>Airport: {flight.airport}</p>
                                    <p>Aircraft: {flight.aircraft}</p>
                                </div>
                                <div className="flight-actions">
                                    <button onClick={() => handleEdit(flight.id)}>Edit</button>
                                    <button onClick={() => handleDelete(flight.id)}>Delete</button>
                                </div>
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
