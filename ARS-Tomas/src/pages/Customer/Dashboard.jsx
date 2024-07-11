import React, { useState } from 'react';
import axios from 'axios';
import './Dashboard.css'; // Assuming you have a Dashboard.css file for styling

const Dashboard = () => {
  const { VITE_HOST } = import.meta.env;
    const [formData, setFormData] = useState({
        departureAirport: '',
        arrivalAirport: '',
        passengers: 1,
        tripType: 'oneWay',
        travelClass: 'economy'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
          ...prev,
          [name]:value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
      
          const res = await axios.post(`${VITE_HOST}/api/bookings`, formData);
            console.log(res?.data)
              // console.log('Booking successful:', res.data);
              // Optionally, you can redirect or show a success message here
        } catch (error) {
            console.error('Error booking flight:', error);
            // Handle error: show an error message or alert
        }
    };

    return (
        <div className="dashboard-container">
            <h2>Book a Flight</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="departureAirport">From:</label>
                    <select
                        id="departureAirport"
                        name="departureAirport"
                        value={formData.departureAirport}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Departure Airport</option>
                        <option value="Ninoy Aquino International Airport, Philippines">Ninoy Aquino International Airport, Philippines</option>
                        <option value="Clark International Airport, Philippines">Clark International Airport, Philippines</option>
                        <option value="Laoag International Airport, Philippines">Laoag International Airport, Philippines</option>
                        <option value="Mactan-Cebu International Airport, Philippines">Mactan-Cebu International Airport, Philippines</option>
                        <option value="Kalibo International Airport, Philippines">Kalibo International Airport, Philippines</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="arrivalAirport">To:</label>
                    <select
                        id="arrivalAirport"
                        name="arrivalAirport"
                        value={formData.arrivalAirport}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Arrival Airport</option>
                        <option value="Tokyo, Japan">Tokyo, Japan - Haneda Airport (HND)</option>
                        <option value="Singapore">Singapore - Changi Airport (SIN)</option>
                        <option value="Sydney, Australia">Sydney, Australia - Sydney Airport (SYD)</option>
                        <option value="Seoul, South Korea">Seoul, South Korea - Incheon International Airport (ICN)</option>
                        <option value="Hong Kong">Hong Kong - Hong Kong International Airport (HKG)</option>
                        <option value="Los Angeles, USA">Los Angeles, USA - Los Angeles International Airport (LAX)</option>
                        <option value="Dubai, UAE">Dubai, UAE - Dubai International Airport (DXB)</option>
                        <option value="London, UK">London, UK - Heathrow Airport (LHR)</option>
                        <option value="Paris, France">Paris, France - Charles de Gaulle Airport (CDG)</option>
                        <option value="Bangkok, Thailand">Bangkok, Thailand - Suvarnabhumi Airport (BKK)</option>
                        <option value="New York City, USA">New York City, USA - John F. Kennedy International Airport (JFK)</option>
                        <option value="Rome, Italy">Rome, Italy - Leonardo da Vinci–Fiumicino Airport (FCO)</option>
                        <option value="Moscow, Russia">Moscow, Russia - Sheremetyevo International Airport (SVO)</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="passengers">Number of Passengers:</label>
                    <input
                        type="number"
                        id="passengers"
                        name="passengers"
                        value={formData.passengers}
                        onChange={handleChange}
                        min="1"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="tripType">Trip Type:</label>
                    <select
                        id="tripType"
                        name="tripType"
                        value={formData.tripType}
                        onChange={handleChange}
                        required
                    >
                        <option value="oneWay">One-Way</option>
                        <option value="roundTrip">Round Trip</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="travelClass">Travel Class:</label>
                    <select
                        id="travelClass"
                        name="travelClass"
                        value={formData.travelClass}
                        onChange={handleChange}
                        required
                    >
                        <option value="economy">Economy Class</option>
                        <option value="business">Business Class</option>
                        <option value="first">First Class</option>
                    </select>
                </div>
                <button type="submit">Book Flight</button>
            </form>
        </div>
    );
};

export default Dashboard;
