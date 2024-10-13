import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Header from './components/Header';
import LoginSignup from './components/LoginSignup';
import Appointment from './components/Appointment';
import Ai from './components/Ai';
import CreateAppointment from './components/CreateAppointment';
import DoctorReview from './components/DoctorReview';
import PatientHistory from './components/PatientHistory';
import NavigationButtons from './components/NavigationButtons';
import PreviewSlip from './components/PreviewSlip';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [appointmentDetails, setAppointmentDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
      // Optionally, fetch user details using the token here
    }
    setIsLoading(false);
  }, []);

  const pages = [
    { name: 'Login', path: '/' },
    { name: 'Appointment', path: '/appointment' },
    { name: 'AI Assistance', path: '/ai' },
    { name: 'Create Appointment', path: '/create' },
    { name: 'Doctor Review', path: '/review' },
    { name: 'Patient History', path: '/patienthistory' },
  ];  

  if (isLoading) {
    return <div>Loading...</div>; // Or any loading indicator
  }

  return (
    <Router>
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
  const location = useLocation();
  
  const hideNavigationPaths = ['/', '/appointment'];

  return (
    <>
      <Header 
        isLoggedIn={isLoggedIn} 
        handleLogout={() => {
          setIsLoggedIn(false);
          localStorage.removeItem('authToken');
        }} 
      />
      <Routes>
        <Route 
          path="/" 
          element={isLoggedIn ? <Navigate to="/appointment" /> : <LoginSignup setUser={setUser} setIsLoggedIn={setIsLoggedIn} />} 
        />

        <Route 
          path="/appointment" 
          element={isLoggedIn ? <Appointment /> : <Navigate to="/" />} 
        />
        <Route 
          path="/ai" 
          element={isLoggedIn ? <Ai /> : <Navigate to="/" />}
        />
        <Route 
          path="/create" 
          element={isLoggedIn ? <CreateAppointment sendToDoctor={setAppointmentDetails} /> : <Navigate to="/" />} 
        />
        <Route 
          path="/review" 
          element={isLoggedIn ? <DoctorReview appointmentDetails={appointmentDetails} sendToDoctor={setAppointmentDetails} /> : <Navigate to="/" />} 
        />
        <Route 
          path="/preview-slip" 
          element={isLoggedIn ? <PreviewSlip appointmentDetails={appointmentDetails} /> : <Navigate to="/" />} 
        />
        <Route 
          path="/patienthistory" 
          element={isLoggedIn ? <PatientHistory /> : <Navigate to="/" />} 
        />
        <Route path="*" element={<Navigate to={isLoggedIn ? "/appointment" : "/"} />} />
      </Routes>
      
      {!hideNavigationPaths.includes(location.pathname) && <NavigationButtons pages={pages} />}
    </>
  );
}

export default App;