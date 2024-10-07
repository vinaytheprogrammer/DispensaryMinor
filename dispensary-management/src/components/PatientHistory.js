import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const PatientHistory = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedRows, setExpandedRows] = useState({}); // To manage "hide/show" functionality

  // Fetch all patient appointment details from API
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

  // Handle search input change
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

  // Toggle expanded state for rows (hide/show functionality)
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
    <div className="min-h-screen p-8 bg-gray-100">
      
      <div className="container mx-auto bg-white p-8 rounded-lg shadow-lg">

      <Link
  to="/appointment"
  className=" top-4 left-4 bg-gray-200 hover:bg-gray-300 text-black py-2 px-4 rounded-lg"
>
  Back
</Link>

        <h2 className="text-3xl font-bold mb-6 text-center">Patient History</h2>
        

        {/* Search input */}
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by Patient Name or Phone Number"
          className="mb-6 p-2 border w-full rounded-lg"
        />

        {filteredAppointments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="py-2 px-4 border">Patient Name</th>
                  <th className="py-2 px-4 border">Age</th>
                  <th className="py-2 px-4 border">Phone</th>
                  <th className="py-2 px-4 border">Weight</th>
                  <th className="py-2 px-4 border">Height</th>
                  <th className="py-2 px-4 border">BP</th>
                  <th className="py-2 px-4 border">Complaints</th>
                  <th className="py-2 px-4 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.map((appointment, index) => (
                  <React.Fragment key={index}>
                    <tr className="hover:bg-gray-100">
                      <td className="py-2 px-4 border">{appointment.patientName}</td>
                      <td className="py-2 px-4 border">{appointment.patientAge}</td>
                      <td className="py-2 px-4 border">{appointment.patientPhone}</td>
                      <td className="py-2 px-4 border">{appointment.weight} kg</td>
                      <td className="py-2 px-4 border">{appointment.height} cm</td>
                      <td className="py-2 px-4 border">{appointment.BP} mmHg</td>
                      <td className="py-2 px-4 border">{appointment.complaints}</td>
                      <td className="py-2 px-4 border">
                        <button
                          onClick={() => toggleRowVisibility(index)}
                          className="bg-blue-500 text-white py-1 px-3 rounded-lg"
                        >
                          {expandedRows[index] ? 'Hide' : 'Show'} Details
                        </button>
                      </td>
                    </tr>

                    {/* Expanded details row */}
                    {expandedRows[index] && (
                      <tr>
                        <td colSpan="8" className="p-4">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p><strong>Medical History:</strong> {appointment.history}</p>
                            <p><strong>Doctor's Findings:</strong> {appointment.clinicalFinding}</p>
                            <p><strong>Medicines:</strong> {appointment.medicines}</p>
                            <p><strong>Advice:</strong> {appointment.advice}</p>
                            <p><strong>Consulted Doctor Name:</strong> {appointment.doctorName}</p>
                            <p><strong>Consulted Doctor Phone Number:</strong> {appointment.doctorPhone}</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
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
