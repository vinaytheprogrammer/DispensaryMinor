// src/context/AppContext.js
import React, { createContext, useState } from 'react';

// Create context
export const AppContext = createContext();

// Create provider component
export const AppProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [appointmentDetails, setAppointmentDetails] = useState(null);

  return (
    <AppContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, user, setUser, appointmentDetails, setAppointmentDetails }}
    >
      {children}
    </AppContext.Provider>
  );
};
