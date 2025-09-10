import { RouteSignIn } from '@/helpers/RouteName';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AuthRouteProtection = () => {
  // Get user information from Redux store
  const user = useSelector(state => state.user);

  // If user is logged in, allow access to protected routes
  if (user && user.isLoggedIn) {
    return <Outlet />; // Render child routes
  } else {
    // If user is not logged in, redirect to SignIn page
    return <Navigate to={RouteSignIn} />;
  }
}

export default AuthRouteProtection;
