import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
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

  const [bookingDetails, setBookingDetails] = useState(null);
  const [price, setPrice] = useState(0);
  const [showPaymentForm, setShowPaymentForm] = useState(false); // State to control showing payment form

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const calculatePrice = () => {
    let basePrice = 4500; // Base price for the flight
    if (formData.tripType === 'roundTrip') basePrice *= 2.3; // Round trip costs 80% more
    if (formData.travelClass === 'business') basePrice *= 3.8; // Business class costs 50% more
    if (formData.travelClass === 'first') basePrice *= 5; // First class costs 150% more
    return basePrice * formData.passengers;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to book this flight?')) {
      const computedPrice = calculatePrice();
      setPrice(computedPrice);
      
      try {
        const res = await axios.post(`${VITE_HOST}/api/bookings`, {
          ...formData,
          price: computedPrice
        });
        setBookingDetails(res.data);
        setShowPaymentForm(true); // Show payment form after successful booking
      } catch (error) {
        console.error('Error booking flight:', error);
        // Handle error: show an error message or alert
      }
    }
  };

  const [feedbackData, setFeedbackData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleFeedbackChange = (e) => {
    const { name, value } = e.target;
    setFeedbackData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to submit this feedback?')) {
      try {
        const res = await axios.post(`${VITE_HOST}/api/feedback`, feedbackData);
        console.log(res?.data);
        // Show confirmation alert
        alert('Feedback sent successfully!');
        // Clear feedback form after successful submission
        setFeedbackData({
          name: '',
          email: '',
          message: ''
        });
      } catch (error) {
        console.error('Error submitting feedback:', error);
      }
    }
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to proceed with the payment?')) {
      try {
        const token = "$2b$10$02w8E3gOwSc1LQVDVOcLROLVseOGpHIN30SOwjojWIdZBwBDn2yjS"; // Your actual token
  
        const res = await axios.post(
          `http://192.168.10.14:3001/api/unionbank/transfertransaction`,
          {
            debitAccount: paymentDetails.debitAccount,
            creditAccount: paymentDetails.creditAccount,
            amount: price
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        console.log(res?.data?.message);
        alert(res?.data?.message)
        // Optionally reset form states or redirect to a success page
        setFormData({
          departureAirport: '',
          arrivalAirport: '',
          passengers: 1,
          tripType: 'oneWay',
          travelClass: 'economy'
        });
        setShowPaymentForm(false);
        setBookingDetails(null);
        setPrice(0);
      } catch (error) {
        console.error(error);
        alert(`Error processing payment: ${error.message}`);
      }
    }
  };

  const [paymentDetails, setPaymentDetails] = useState({
    debitAccount: '',
    creditAccount: ''
  });

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prev) => ({ ...prev, [name]: value }));
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
          <label htmlFor="numberOfPassengers">Number of Passengers:</label>
          <input
            type="number"
            id="numberOfPassengers"
            name="numberOfPassengers"
            value={formData.numberOfPassengers}
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
      
      {showPaymentForm && (
        <div className="payment-form">
          <h2>Payment Form</h2>
          <form onSubmit={handlePaymentSubmit}>
            <div className="form-group">
              <label htmlFor="debitAccount">Debit Account:</label>
              <input
                type="text"
                id="debitAccount"
                name="debitAccount"
                value={paymentDetails.debitAccount}
                onChange={handlePaymentChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="creditAccount">Credit Account:</label>
              <input
                type="text"
                id="creditAccount"
                name="creditAccount"
                value={paymentDetails.creditAccount}
                onChange={handlePaymentChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="amount">Amount:</label>
              <input
                type="text"
                id="amount"
                name="amount"
                value={price}
                readOnly
              />
            </div>
            <button type="submit">Submit Payment</button>
          </form>
        </div>
      )}

      <h2>Customer Feedback</h2>
      <form onSubmit={handleFeedbackSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={feedbackData.name}
            onChange={handleFeedbackChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={feedbackData.email}
            onChange={handleFeedbackChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={feedbackData.message}
            onChange={handleFeedbackChange}
            required
          />
        </div>
        <button type="submit">Submit Feedback</button>
      </form>
    </div>
  );
};

export default Dashboard;
