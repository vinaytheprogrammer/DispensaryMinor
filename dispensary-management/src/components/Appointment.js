import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Appointment = () => {
  const navigate = useNavigate();

  const handleCreateAppointment = () => {
    toast.success('Appointment created successfully!');
    navigate('/create');
  };

  const handlePatientHistory = () => {
    toast.success('Patient history fetched successfully!');
    navigate('/patienthistory');
  };

  const handleAi = () => {
    toast.success('Take AI Assistance!');
    navigate('/ai');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-100 pt-16"> {/* Added pt-16 to create space below header */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-2xl font-bold mb-6">Welcome to Dispensary</h2>
        <button
          onClick={handleCreateAppointment}
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-200 mb-4"
        >
          Create New Appointment
        </button>
        <button
          onClick={handlePatientHistory}
          className="w-full bg-yellow-600 text-white py-2 rounded-lg hover:bg-yellow-700 transition duration-200 mb-4"
        >
          View Patient History
        </button>
        <button
          onClick={handleAi}
          className="w-full bg-yellow-600 text-white py-2 rounded-lg hover:bg-yellow-700 transition duration-200 mb-4"
        >
          Open AI Assistant
        </button>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Appointment;
