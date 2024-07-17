import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StaffDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [crewAssignments, setCrewAssignments] = useState([]);
  const [flightUpdates, setFlightUpdates] = useState([]);
  const [delaysCancellations, setDelaysCancellations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [bookingsPerPage] = useState(10); // Number of bookings per page

  useEffect(() => {
    fetchBookings();
    fetchCrewAssignments();
    fetchFlightUpdates();
    fetchDelaysCancellations();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://192.168.10.41:3001/api/bookings');
      setBookings(response.data.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const fetchCrewAssignments = async () => {
    try {
      const response = await axios.get('http://192.168.10.41:3001/api/crewAssignments');
      setCrewAssignments(response.data.data);
    } catch (error) {
      console.error('Error fetching crew assignments:', error);
    }
  };

  const fetchFlightUpdates = async () => {
    try {
      const response = await axios.get('http://192.168.10.41:3001/api/flightUpdates');
      setFlightUpdates(response.data.data);
    } catch (error) {
      console.error('Error fetching flight updates:', error);
    }
  };

  const fetchDelaysCancellations = async () => {
    try {
      const response = await axios.get('http://192.168.10.41:3001/api/delaysCancellations');
      setDelaysCancellations(response.data.data);
    } catch (error) {
      console.error('Error fetching delays and cancellations:', error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDeleteBooking = async (bookingId) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        await axios.delete(`http://192.168.10.41:3001/api/bookings/${bookingId}`);
        fetchBookings(); // Refresh the bookings list
      } catch (error) {
        console.error('Error deleting booking:', error);
      }
    }
  };

  const handleDeleteDelayCancellation = async (dcId) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        await axios.delete(`http://192.168.10.41:3001/api/delaysCancellations/${dcId}`);
        fetchDelaysCancellations(); // Refresh the delays/cancellations list
      } catch (error) {
        console.error('Error deleting record:', error);
      }
    }
  };

  const handleEditDelayCancellation = async (dcId, updatedData) => {
    try {
      await axios.put(`http://192.168.10.41:3001/api/delaysCancellations/${dcId}`, updatedData);
      fetchDelaysCancellations(); // Refresh the delays/cancellations list
    } catch (error) {
      console.error('Error editing record:', error);
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

  const filteredCrewAssignments = crewAssignments.filter((assignment) =>
    assignment.flightNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    assignment.crewMember.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredFlightUpdates = flightUpdates.filter((update) =>
    update.flightNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    update.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredDelaysCancellations = delaysCancellations.filter((dc) =>
    dc.flightNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dc.reason.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Staff Dashboard</h1>
      <input
        type="text"
        placeholder="Search bookings, crew, updates, delays..."
        value={searchTerm}
        onChange={handleSearch}
      />

      {/* Bookings Section */}
      <h2>Bookings</h2>
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
                <button onClick={() => handleDeleteBooking(booking._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Crew Assignments Section */}
      <h2>Crew Assignments</h2>
      <table>
        <thead>
          <tr>
            <th>Flight Number</th>
            <th>Crew Member</th>
          </tr>
        </thead>
        <tbody>
          {filteredCrewAssignments.map((assignment) => (
            <tr key={assignment._id}>
              <td>{assignment.flightNumber}</td>
              <td>{assignment.crewMember}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Flight Updates Section */}
      <h2>Flight Updates</h2>
      <table>
        <thead>
          <tr>
            <th>Flight Number</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredFlightUpdates.map((update) => (
            <tr key={update._id}>
              <td>{update.flightNumber}</td>
              <td>{update.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Delays and Cancellations Section */}
      <h2>Delays and Cancellations</h2>
      <table>
        <thead>
          <tr>
            <th>Flight Number</th>
            <th>Reason</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredDelaysCancellations.map((dc) => (
            <tr key={dc._id}>
              <td>{dc.flightNumber}</td>
              <td>{dc.reason}</td>
              <td>
                <button onClick={() => handleEditDelayCancellation(dc._id, { reason: 'Updated Reason' })}>Edit</button>
                <button onClick={() => handleDeleteDelayCancellation(dc._id)}>Delete</button>
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
