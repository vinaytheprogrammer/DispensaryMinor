import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateAppointment = ({ sendToDoctor }) => {
  const [patientDetails, setPatientDetails] = useState({
    name: '',
    age: '',
    phone: '',
    weight: '',
    height: '',
    BP: '',
    BG: '',
    SPO2: '',
    complaints: '',
    history: '',
  });
  const navigate = useNavigate(); // to navigate to review page

  const handleChange = (e) => {
    setPatientDetails({ ...patientDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success(`Appointment created successfully!`);
    sendToDoctor(patientDetails); // pass patient details to DoctorReview
    
    setTimeout(() => {
      navigate('/review');
    }, 800); // Slight delay to allow toast to show
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
      <Link
  to="/appointment"
  className=" top-4 left-4 bg-gray-200 hover:bg-gray-300 text-black py-2 px-4 rounded-lg"
>
  Back
</Link>
        <h2 className="text-2xl font-bold mb-6 text-center">New Appointment</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Patient Basic Details */}
          <input name="name" placeholder="Name" value={patientDetails.name} onChange={handleChange} className="px-4 py-2 border rounded-lg" required />
          <input name="age" placeholder="Age" value={patientDetails.age} onChange={handleChange} className="px-4 py-2 border rounded-lg" required />
          <input name="phone" placeholder="Phone" value={patientDetails.phone} onChange={handleChange} className="px-4 py-2 border rounded-lg" required />
          {/* Vitals */}
          <input name="weight" placeholder="Weight" value={patientDetails.weight} onChange={handleChange} className="px-4 py-2 border rounded-lg" required />
          <input name="height" placeholder="Height" value={patientDetails.height} onChange={handleChange} className="px-4 py-2 border rounded-lg" required />
          <input name="BP" placeholder="Blood Pressure" value={patientDetails.BP} onChange={handleChange} className="px-4 py-2 border rounded-lg" required />
          <input name="BG" placeholder="Blood Glucose" value={patientDetails.BG} onChange={handleChange} className="px-4 py-2 border rounded-lg" required />
          <input name="SPO2" placeholder="SPO2" value={patientDetails.SPO2} onChange={handleChange} className="px-4 py-2 border rounded-lg" required />
        </div>
        {/* Complaints & History */}
        <textarea name="complaints" placeholder="Chief Complaints" value={patientDetails.complaints} onChange={handleChange} className="w-full mt-4 px-4 py-2 border rounded-lg"></textarea>
        <textarea name="history" placeholder="Medical History" value={patientDetails.history} onChange={handleChange} className="w-full mt-4 px-4 py-2 border rounded-lg"></textarea>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200 mt-6">Send to Doctor</button>
      </form>
      
      {/* Add the ToastContainer here */}
      <ToastContainer />
    </div>
  );
};

export default CreateAppointment;
