import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isLoggedIn, children }) => {
  // If user is not logged in, redirect to the login page
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  
  // If the user is logged in, render the protected component
  return children;
};

export default ProtectedRoute;
