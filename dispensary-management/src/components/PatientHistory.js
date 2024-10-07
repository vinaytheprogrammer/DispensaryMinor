import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './PatientHistory.css'; // Add custom styles

const PatientHistory = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedRows, setExpandedRows] = useState({});

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('https://dispensaryminor-aa3dd5f90851.herokuapp.com/api/appointments');
        setAppointments(response.data);
        setFilteredAppointments(response.data);
        setLoading(false);
        toast.success('Appointments fetched successfully!', {
          position: 'top-right',
        });
      } catch (err) {
        setError('Failed to fetch appointments');
        setLoading(false);
        toast.error('Error fetching appointments', {
          position: 'top-right',
        });
      }
    };

    fetchAppointments();
  }, []);

  const handleSearchChange = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);
    const filtered = appointments.filter(
      (appointment) =>
        appointment.patientName.toLowerCase().includes(searchValue) ||
        appointment.patientPhone.includes(searchValue)
    );
    setFilteredAppointments(filtered);
  };

  const toggleRowVisibility = (index) => {
    setExpandedRows((prevExpandedRows) => ({
      ...prevExpandedRows,
      [index]: !prevExpandedRows[index],
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading patient history...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-8 bg-gray-100">
      <div className="container mx-auto bg-white p-6 sm:p-8 rounded-lg shadow-lg">
        <Link
          to="/appointment"
          className="block mb-4 bg-gray-200 hover:bg-gray-300 text-black py-2 px-4 rounded-lg w-fit"
        >
          Back
        </Link>

        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Patient History</h2>

        {/* Search input */}
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by Patient Name or Phone Number"
          className="mb-6 p-2 border w-full rounded-lg"
        />

        {filteredAppointments.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAppointments.map((appointment, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">{appointment.patientName}</h3>
                  <button
                    onClick={() => toggleRowVisibility(index)}
                    className="bg-blue-500 text-white py-1 px-3 rounded-lg"
                  >
                    {expandedRows[index] ? 'Hide' : 'Show'} Details
                  </button>
                </div>
                <p><strong>Age:</strong> {appointment.patientAge}</p>
                <p><strong>Phone:</strong> {appointment.patientPhone}</p>
                <p><strong>Weight:</strong> {appointment.weight} kg</p>
                <p><strong>Height:</strong> {appointment.height} cm</p>
                <p><strong>BP:</strong> {appointment.BP} mmHg</p>
                <p><strong>Complaints:</strong> {appointment.complaints}</p>

                {/* Expanded details */}
                {expandedRows[index] && (
                  <div className="mt-4 bg-gray-50 p-2 rounded-lg">
                    <p><strong>Medical History:</strong> {appointment.history}</p>
                    <p><strong>Doctor's Findings:</strong> {appointment.clinicalFinding}</p>
                    <p><strong>Medicines:</strong> {appointment.medicines}</p>
                    <p><strong>Advice:</strong> {appointment.advice}</p>
                    <p><strong>Consulted Doctor Name:</strong> {appointment.doctorName}</p>
                    <p><strong>Consulted Doctor Phone Number:</strong> {appointment.doctorPhone}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>No patient history found.</p>
        )}
      </div>

      {/* Toast notifications container */}
      <ToastContainer />
    </div>
  );
};

export default PatientHistory;
