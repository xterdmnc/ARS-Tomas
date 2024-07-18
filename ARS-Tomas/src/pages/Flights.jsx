import React, { useState } from 'react';
import './Flights.css';

// Sample flight data
const flightsData = [
    {
        destination: 'Tokyo, Japan',
        airport: 'Haneda Airport (HND)',
        aircraft: 'Boeing 777',
        specialNote: 'Special VIP flights available.',
    },
    {
        destination: 'Singapore',
        airport: 'Changi Airport (SIN)',
        aircraft: 'Airbus A350',
        specialNote: 'Special VIP flights available.',
    },
    {
        destination: 'Sydney, Australia',
        airport: 'Sydney Airport (SYD)',
        aircraft: 'Boeing 787',
        specialNote: 'Special VIP flights available.',
    },
    {
        destination: 'Seoul, South Korea',
        airport: 'Incheon International Airport (ICN)',
        aircraft: 'Airbus A380',
        specialNote: 'Special VIP flights available.',
    },
    {
        destination: 'Hong Kong',
        airport: 'Hong Kong International Airport (HKG)',
        aircraft: 'Boeing 737',
        specialNote: 'Special VIP flights available.',
    },
    {
        destination: 'Los Angeles, USA',
        airport: 'Los Angeles International Airport (LAX)',
        aircraft: 'Boeing 777',
        specialNote: 'Special VIP flights available.',
    },
    {
        destination: 'Dubai, UAE',
        airport: 'Dubai International Airport (DXB)',
        aircraft: 'Airbus A380',
        specialNote: 'Special VIP flights available.',
    },
    {
        destination: 'London, UK',
        airport: 'Heathrow Airport (LHR)',
        aircraft: 'Boeing 787',
        specialNote: 'Special VIP flights available.',
    },
    {
        destination: 'Paris, France',
        airport: 'Charles de Gaulle Airport (CDG)',
        aircraft: 'Airbus A350',
        specialNote: 'Special VIP flights available.',
    },
    {
        destination: 'Bangkok, Thailand',
        airport: 'Suvarnabhumi Airport (BKK)',
        aircraft: 'Boeing 737',
        specialNote: 'Special VIP flights available.',
    },
    {
        destination: 'New York City, USA',
        airport: 'John F. Kennedy International Airport (JFK)',
        aircraft: 'Airbus A380',
        specialNote: 'Special VIP flights available.',
    },
    {
        destination: 'Rome, Italy',
        airport: 'Leonardo da Vinci–Fiumicino Airport (FCO)',
        aircraft: 'Boeing 777',
        specialNote: 'Special VIP flights available.',
    },
    {
        destination: 'Moscow, Russia',
        airport: 'Sheremetyevo International Airport (SVO)',
        aircraft: 'Airbus A350',
        specialNote: 'Special VIP flights unavailable.',
    },
];

const Flights = () => {
    const [fromDestination, setFromDestination] = useState('');
    const [toDestination, setToDestination] = useState('');
    const [passengers, setPassengers] = useState(1);
    const [tripType, setTripType] = useState('one-way');
    const [flightClass, setFlightClass] = useState('economy');

    const fromDestinationOptions = [
        'Ninoy Aquino International Airport, Philippines',
        'Clark International Airport, Philippines',
        'Laoag International Airport, Philippines',
        'Mactan-Cebu International Airport, Philippines',
        'Kalibo International Airport, Philippines',
    ];

    const handleBooking = () => {
        // Implement your booking logic here
        console.log(`Booking flight from ${fromDestination} to ${toDestination} for ${passengers} passengers (${tripType}, ${flightClass} class).`);
    };

    return (
        <div className="flights-container">
            <header className="flights-header">
                <h1>Explore the World with Comfort and Style</h1>
                <p>Experience luxury, comfort, and convenience with SkyEase. Book your next adventure today!</p>
            </header>
            <section className="flight-promotion">
                <div className="promotion-banner">
                    <h2>Special Offers!</h2>
                    <p>Enjoy exclusive deals and VIP treatment on all our flights.</p>
                </div>
                <div className="flight-destinations">
                    {flightsData.map((flight, index) => (
                        <div key={index} className="destination-card">
                            <h3>{flight.destination}</h3>
                            <p>{flight.airport}</p>
                            <p>{flight.aircraft}</p>
                            <p>{flight.specialNote}</p>
                        </div>
                    ))}
                </div>
            </section>
            <section className="flight-booking">
                <h2>Book Your Flight</h2>
                <div className="booking-form">
                    <div className="form-group">
                        <label htmlFor="fromDestination">From:</label>
                        <select
                            id="fromDestination"
                            value={fromDestination}
                            onChange={(e) => setFromDestination(e.target.value)}
                        >
                            <option value="">Select Departure Airport</option>
                            {fromDestinationOptions.map((option, index) => (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="toDestination">To:</label>
                        <select
                            id="toDestination"
                            value={toDestination}
                            onChange={(e) => setToDestination(e.target.value)}
                        >
                            <option value="">Select Destination</option>
                            {flightsData.map((flight, index) => (
                                <option key={index} value={flight.destination}>
                                    {flight.destination} - {flight.airport}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="passengers">Passengers:</label>
                        <input
                            type="number"
                            id="passengers"
                            value={passengers}
                            min="1"
                            onChange={(e) => setPassengers(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Trip Type:</label>
                        <div>
                            <label>
                                <input
                                    type="radio"
                                    value="one-way"
                                    checked={tripType === 'one-way'}
                                    onChange={() => setTripType('one-way')}
                                /> One Way
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="round-trip"
                                    checked={tripType === 'round-trip'}
                                    onChange={() => setTripType('round-trip')}
                                /> Round Trip
                            </label>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Class:</label>
                        <select
                            value={flightClass}
                            onChange={(e) => setFlightClass(e.target.value)}
                        >
                            <option value="economy">Economy Class</option>
                            <option value="business">Business Class</option>
                            <option value="first">First Class</option>
                        </select>
                    </div>
                    <button className="book-flight-button" onClick={handleBooking}>
                        Book Flight Now!
                    </button>
                </div>
            </section>
        </div>
    );
};

export default Flights;
