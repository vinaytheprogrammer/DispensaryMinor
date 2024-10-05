import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import LoginSignup from './components/LoginSignup';
import Appointment from './components/Appointment';
import Ai from './components/Ai';
import CreateAppointment from './components/CreateAppointment';
import DoctorReview from './components/DoctorReview';
import PatientHistory from './components/PatientHistory';
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // Authentication state
  const [user, setUser] = useState(null);
  const [appointmentDetails, setAppointmentDetails] = useState(null);

  return (
    <Router>
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
    </Router>
  );
}

export default App;
