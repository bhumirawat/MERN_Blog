// ==============================
// AdminAccess.jsx
// Protects routes for admin users only
// Redirects non-admins to Sign In page
// ==============================

import { RouteSignIn } from '@/helpers/RouteName';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AdminAccess = () => {
    // Get current user from Redux store
    const user = useSelector(state => state.user);

    // Allow access if user is logged in and role is 'admin'
    if (user && user.isLoggedIn && user.user.role === 'admin') {
        return <Outlet />; // Render nested routes
    } else {
        return <Navigate to={RouteSignIn} />; // Redirect non-admins
    }
};

export default AdminAccess;
