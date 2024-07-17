import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import './SalesReports.css';

const SalesReports = () => {
    const [seatSales, setSeatSales] = useState({
        economy: 0,
        business: 0,
        firstClass: 0,
    });
    const [ticketSales, setTicketSales] = useState(0);
    const [refundedSeats, setRefundedSeats] = useState(0);
    const [totalIncome, setTotalIncome] = useState(0);
    const chartRef = useRef(null);

    useEffect(() => {
        // Simulated API call or database fetch for sales data
        const initialData = {
            seatSales: {
                economy: 150,
                business: 80,
                firstClass: 30,
            },
            ticketSales: 400,
            refundedSeats: 20,
            totalIncome: 1230500,
        };
        setSeatSales(initialData.seatSales);
        setTicketSales(initialData.ticketSales);
        setRefundedSeats(initialData.refundedSeats);
        setTotalIncome(initialData.totalIncome);
    }, []);

    useEffect(() => {
        if (chartRef.current) {
            chartRef.current.destroy();
        }

        const ctx = document.getElementById('myChart').getContext('2d');
        chartRef.current = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Economy', 'Business', 'First Class'],
                datasets: [
                    {
                        label: 'Seat Sales',
                        data: [seatSales.economy, seatSales.business, seatSales.firstClass],
                        backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe'],
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
            },
        });

        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [seatSales]);

    return (
        <div className="sales-reports-container">
            <h2>Sales Reports</h2>
            <div className="chart-container">
                <canvas id="myChart"></canvas>
            </div>
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
                <p>Total Income This Month: ₱ {totalIncome}</p>
            </div>
        </div>
    );
};

export default SalesReports;
