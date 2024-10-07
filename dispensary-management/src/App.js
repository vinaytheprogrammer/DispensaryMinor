import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import LoginSignup from './components/LoginSignup';
import Appointment from './components/Appointment';
import Ai from './components/Ai';
import CreateAppointment from './components/CreateAppointment';
import DoctorReview from './components/DoctorReview';
import PatientHistory from './components/PatientHistory';
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute
import NavigationButtons from './components/NavigationButtons';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // Authentication state
  const [user, setUser] = useState(null);
  const [appointmentDetails, setAppointmentDetails] = useState(null);

  const pages = [
    { name: 'Login', path: '/' },
    { name: 'Appointment', path: '/appointment' },
    { name: 'AI Assistance', path: '/ai' },
    { name: 'Create Appointment', path: '/create' },
    { name: 'Doctor Review', path: '/review' },
    { name: 'Patient History', path: '/patienthistory' },
  ];  
  
  return (
    <Router>
      {/* Now useLocation is inside Router */}
      <LocationAwareComponent 
        isLoggedIn={isLoggedIn} 
        setUser={setUser} 
        setIsLoggedIn={setIsLoggedIn} 
        pages={pages} 
        appointmentDetails={appointmentDetails} 
        setAppointmentDetails={setAppointmentDetails}
      />
    </Router>
  );
}

function LocationAwareComponent({ isLoggedIn, setUser, setIsLoggedIn, pages, appointmentDetails, setAppointmentDetails }) {
  const location = useLocation(); // This is now inside Router context
  
  // Define the paths where you want to hide the navigation buttons
  const hideNavigationPaths = ['/', '/appointment'];

  return (
    <>
      <Header isLoggedIn={isLoggedIn} handleLogout={() => setIsLoggedIn(false)} />
      <Routes>
        {/* Public Route */}
        <Route 
          path="/" 
          element={<LoginSignup setUser={setUser} setIsLoggedIn={setIsLoggedIn} />} 
        />

        {/* Protected Routes */}
        <Route 
          path="/appointment" 
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Appointment />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/ai" 
          element={
            
              <Ai />
           
          }
        />
        <Route 
          path="/create" 
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <CreateAppointment sendToDoctor={setAppointmentDetails} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/review" 
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <DoctorReview appointmentDetails={appointmentDetails} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/patienthistory" 
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <PatientHistory />
            </ProtectedRoute>
          } 
        />
      </Routes>
      {/* Conditionally render Navigation Buttons based on the current path
      {!hideNavigationPaths.includes(location.pathname) && <NavigationButtons pages={pages} />} */}
    </>
  );
}

export default App;
