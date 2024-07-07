import React, { useState, useEffect } from 'react';
import './SalesReports.css'; // Assuming you will style this component

const SalesReports = () => {
    const [seatSales, setSeatSales] = useState({
        economy: 0,
        business: 0,
        firstClass: 0,
    });
    const [ticketSales, setTicketSales] = useState(0);
    const [refundedSeats, setRefundedSeats] = useState(0);
    const [totalIncome, setTotalIncome] = useState(0);

    useEffect(() => {
        // Simulated API call or database fetch for sales data
        // This would typically fetch from a database or server
        // For demo purposes, initializing with sample data
        const initialData = {
            seatSales: {
                economy: 150, // Replace with actual fetched data
                business: 80, // Replace with actual fetched data
                firstClass: 30, // Replace with actual fetched data
            },
            ticketSales: 400, // Replace with actual fetched data
            refundedSeats: 20, // Replace with actual fetched data
            totalIncome: 12000, // Replace with actual fetched data
        };
        setSeatSales(initialData.seatSales);
        setTicketSales(initialData.ticketSales);
        setRefundedSeats(initialData.refundedSeats);
        setTotalIncome(initialData.totalIncome);
    }, []);

    return (
        <div className="sales-reports-container">
            <h2>Sales Reports</h2>
            <div className="sales-summary">
                <h3>Seat Sales by Class</h3>
                <ul>
                    <li>Economy Class: {seatSales.economy}</li>
                    <li>Business Class: {seatSales.business}</li>
                    <li>First Class: {seatSales.firstClass}</li>
                </ul>
            </div>
            <div className="sales-updates">
                <h3>Updates on Plane Ticket Sales</h3>
                <p>Total Plane Ticket Sales: {ticketSales}</p>
                <p>Refunded Seats: {refundedSeats}</p>
            </div>
            <div className="sales-analytics">
                <h3>Total Income Report</h3>
                <p>Total Income This Month: ${totalIncome}</p>
            </div>
        </div>
    );
};

export default SalesReports;
