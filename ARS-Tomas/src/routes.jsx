import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Customer/Dashboard'; // Updated path
import AdminDashboard from './pages/Admin/AdminDashboard';
import StaffDashboard from './pages/Staff/StaffDashboard.jsx';
import ProtectedRoute from './ProtectedRoute';
import Layout from './components/Layout';
import { roles } from './roles';

// Admin sub-routes
import CrewAssignment from './pages/Admin/CrewAssignment';
import FlightUpdates from './pages/Admin/FlightUpdates';
import DelayCancellation from './pages/Admin/DelayCancellation';
import SalesReports from './pages/Admin/SalesReports';
import CustomerInsights from './pages/Admin/CustomerInsights';

// Import new page components
import About from './pages/About';
import Flights from './pages/Flights';
import Explore from './pages/Explore';

const Routes = createBrowserRouter([
    {
        path: '/',
        element: <Layout><Home /></Layout>,
    },
    {
        path: '/login',
        element: <Layout><Login /></Layout>,
    },
    {
        path: '/signup',
        element: <Layout><SignUp /></Layout>,
    },
    {
        path: '/about',
        element: <Layout><About /></Layout>, // Add About route
    },
    {
        path: '/flights',
        element: <Layout><Flights /></Layout>, // Add Flights route
    },
    {
        path: '/explore',
        element: <Layout><Explore /></Layout>, // Add Explore route
    },
    {
        path: '/dashboard',
        element: (
            <ProtectedRoute allowedRoles={[roles.CUSTOMER, roles.STAFF, roles.ADMIN]}>
                <Layout><Dashboard /></Layout>
            </ProtectedRoute>
        ),
    },
    {
        path: '/admin/*',  // Notice the trailing "/*"
        element: (
            <ProtectedRoute allowedRoles={[roles.ADMIN]}>
                <Layout><AdminDashboard /></Layout>
            </ProtectedRoute>
        ),
        children: [
            { path: 'crew-assignment', element: <CrewAssignment /> },
            { path: 'flight-updates', element: <FlightUpdates /> },
            { path: 'delay-cancellation', element: <DelayCancellation /> },
            { path: 'sales-reports', element: <SalesReports /> },
            { path: 'customer-insights', element: <CustomerInsights /> },
        ],
    },
    {
        path: '/staff',
        element: (
            <ProtectedRoute allowedRoles={[roles.STAFF]}>
                <Layout><StaffDashboard /></Layout>
            </ProtectedRoute>
        ),
    },

    // {
    //     path: '/admin/audit-log',
    //     element: (
    //         <ProtectedRoute allowedRoles={[roles.ADMIN]}>
    //             <Layout><AuditLog /></Layout>
    //         </ProtectedRoute>
    //     ),
    // },
]);

export default Routes;
