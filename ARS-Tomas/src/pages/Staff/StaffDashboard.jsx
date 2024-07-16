import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StaffDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [bookingsPerPage] = useState(10); // Number of bookings per page

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://192.168.10.41:3001/api/bookings');
      setBookings(response.data.data); // Accessing data property
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = async (bookingId) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        await axios.delete(`http://192.168.10.41:3001/api/bookings/${bookingId}`);
        fetchBookings(); // Refresh the bookings list
      } catch (error) {
        console.error('Error deleting booking:', error);
      }
    }
  };

  // Pagination logic
  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = bookings.slice(indexOfFirstBooking, indexOfLastBooking);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Filtered bookings based on search term
  const filteredBookings = currentBookings.filter((booking) =>
    booking.departureAirport.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.arrivalAirport.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.passengers.toString().includes(searchTerm) ||
    booking.tripType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.travelClass.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Staff Dashboard</h1>
      <input
        type="text"
        placeholder="Search bookings..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <table>
        <thead>
          <tr>
            <th>Departure</th>
            <th>Arrival</th>
            <th>Passengers</th>
            <th>Trip Type</th>
            <th>Class</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredBookings.map((booking) => (
            <tr key={booking._id}>
              <td>{booking.departureAirport}</td>
              <td>{booking.arrivalAirport}</td>
              <td>{booking.passengers}</td>
              <td>{booking.tripType}</td>
              <td>{booking.travelClass}</td>
              <td>
                <button onClick={() => handleDelete(booking._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: Math.ceil(bookings.length / bookingsPerPage) }, (_, index) => (
          <button key={index} onClick={() => paginate(index + 1)}>{index + 1}</button>
        ))}
      </div>
    </div>
  );
};

export default StaffDashboard;
