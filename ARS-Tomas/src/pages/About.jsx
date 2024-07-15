import React from 'react';
import './About.css';

const About = () => {
    return (
        <div className="about-container">
            <section className="hero">
                <div className="hero-text">
                    <h1>About SkyEase</h1>
                    <p>SkyEase is dedicated to creating an unparalleled travel experience where convenience meets the sky. We strive to offer our passengers more than just flights; we provide seamless journeys that blend comfort, efficiency, and exceptional service.</p>
                    <img src="/history.jpg" alt="SkyEase History" className="about-image" />
                </div>
            </section>

            <section className="content-section">
                <h2>Our History</h2>
                <p>Founded in 2005, SkyEase has been committed to providing exceptional travel experiences to our customers. Over the years, we have expanded our fleet and destinations, making us one of the leading airlines in the industry.</p>
                <img src="/history.jpg" alt="SkyEase History" className="about-image" />
            </section>

            <section className="content-section">
                <h2>Our Mission</h2>
                <p>Our mission is to offer safe, reliable, and affordable air travel. We strive to provide top-notch customer service and ensure that every journey with SkyEase is comfortable and enjoyable.</p>
                <img src="/mission.jpg" alt="SkyEase Mission" className="about-image" />
            </section>      

            <section className="content-section">
                <h2>Our Services</h2>
                <ul>
                    <li>Domestic and international flights</li>
                    <li>Luxury lounges</li>
                    <li>In-flight entertainment</li>
                    <li>Frequent flyer programs</li>
                    <li>Customer support 24/7</li>
                </ul>
                <img src="/service.jpg" alt="SkyEase Services" className="about-image" />
            </section>

            <section className="content-section">
                <h2>Our Fleet</h2>
                <p>We operate a modern and efficient fleet of aircraft, ensuring your safety and comfort during your travels. Our fleet includes:</p>
                <ul>
                    <li>Boeing 737</li>
                    <li>Airbus A320</li>
                    <li>Boeing 787 Dreamliner</li>
                    <li>Airbus A350</li>
                </ul>
                <img src="/fleet.jpg" alt="SkyEase Fleet" className="about-image" />
            </section>

            <section className="content-section">
                <h2>Meet Our Team</h2>
                <p>Our dedicated team of professionals is here to ensure that you have a seamless travel experience. From our pilots to our cabin crew and ground staff, we are committed to providing the best service possible.</p>
                <img src="/team.jpg" alt="SkyEase Team" className="about-image" />
            </section>

            <section className="content-section">
                <h2>Contact Us</h2>
                <p>If you have any questions or need assistance, please don't hesitate to contact our customer support team. We're here to help you 24/7.</p>
                <img src="/SkyEase.png" alt="SkyEase Contact" className="about-image" />
            </section>
        </div>
    );
};

export default About;
