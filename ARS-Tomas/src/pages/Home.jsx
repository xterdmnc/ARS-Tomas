import React from 'react';
import './css/Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="home">
            <div className="hero">
                <div className="hero-content">
                    <h1>Explore the World with SkyEase</h1>
                    <p>Book your flights with ease and comfort.</p>
                    <img src="/SkyEase.png" alt="Destination 1" />
                </div>
            </div>
            <section className="highlights">
                <div className="container">
                    <h2>Discover Our Latest Updates</h2>
                    <div className="highlight-cards">
                        <div className="highlight-card">
                            <h3>New Routes</h3>
                            <p>Explore our new destinations and plan your next adventure.</p>
                        </div>
                        <div className="highlight-card">
                            <h3>Promotions</h3>
                            <p>Check out our latest deals and exclusive offers.</p>
                        </div>
                        <div className="highlight-card">
                            <h3>Updates</h3>
                            <p>Stay informed with our latest news and service updates.</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="features">
                <div className="container">
                    <div className="feature">
                        <h2>Easy Booking Process</h2>
                        <p>Simple and intuitive booking system to save you time.</p>
                    </div>
                    <div className="feature">
                        <h2>Top Destinations</h2>
                        <p>Discover popular destinations around the globe.</p>
                    </div>
                    <div className="feature">
                        <h2>Exclusive Offers</h2>
                        <p>Get access to special deals and discounts.</p>
                    </div>
                </div>
            </section>
            <section className="picture-text">
                <div className="picture-text-content">
                    <h2>Experience Luxury Travel with SkyEase</h2>
                    <p>Explore new horizons with our top-class service and luxurious flights. Whether you're traveling for business or leisure, SkyEase ensures a comfortable and memorable journey.</p>
                </div>
            </section>
            <section className="testimonial">
                <div className="container">
                    <h2>What Our Customers Say</h2>
                    <div className="testimonial-cards">
                        <div className="testimonial-card">
                            <p>"SkyEase provided me with an exceptional travel experience. From booking to boarding, everything was seamless and comfortable."</p>
                            <span>- John Doe, Business Traveler</span>
                        </div>
                        <div className="testimonial-card">
                            <p>"I highly recommend SkyEase for their professional service and attention to detail. My family and I had a wonderful vacation thanks to them."</p>
                            <span>- Jane Smith, Leisure Traveler</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
