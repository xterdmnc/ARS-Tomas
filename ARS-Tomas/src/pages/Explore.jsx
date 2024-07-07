import React from 'react';
import './Explore.css';

const Explore = () => {
    return (
        <div className="explore-container">
            <header className="explore-header">
                <h1>Explore the World with SkyEase</h1>
                <p>Your journey to the most amazing destinations begins here.</p>
            </header>
            <section className="destinations">
                <h2>Popular Destinations</h2>
                <div className="destination-grid">
                    <div className="destination-card">
                        <img src="/images/destination1.jpg" alt="Destination 1" />
                        <h3>Paris, France</h3>
                        <p>The city of lights and love. Discover the iconic Eiffel Tower and indulge in French cuisine.</p>
                    </div>
                    <div className="destination-card">
                        <img src="/images/destination2.jpg" alt="Destination 2" />
                        <h3>Tokyo, Japan</h3>
                        <p>Experience the perfect blend of tradition and modernity in this vibrant city.</p>
                    </div>
                    <div className="destination-card">
                        <img src="/images/destination3.jpg" alt="Destination 3" />
                        <h3>New York, USA</h3>
                        <p>The city that never sleeps. Explore Times Square, Central Park, and world-class museums.</p>
                    </div>
                </div>
            </section>
            <section className="travel-tips">
                <h2>Travel Tips</h2>
                <ul>
                    <li>Check travel restrictions and guidelines before booking your flight.</li>
                    <li>Pack light and keep your essentials in a carry-on bag.</li>
                    <li>Arrive at the airport at least 2 hours before your flight.</li>
                    <li>Stay hydrated and move around during long flights.</li>
                </ul>
            </section>
            <section className="promotions">
                <h2>Promotional Offers</h2>
                <div className="promotion-grid">
                    <div className="promotion-card">
                        <h3>Summer Sale</h3>
                        <p>Get up to 30% off on flights to Europe this summer. Book now and save!</p>
                    </div>
                    <div className="promotion-card">
                        <h3>Family Discounts</h3>
                        <p>Travel with your family and enjoy special discounts on group bookings.</p>
                    </div>
                    <div className="promotion-card">
                        <h3>Frequent Flyer Program</h3>
                        <p>Join our frequent flyer program and earn miles on every flight. Redeem for exciting rewards.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Explore;
