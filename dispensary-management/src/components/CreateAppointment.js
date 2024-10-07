import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './CreateAppointment.css'; // Ensure this CSS file exists

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
  const navigate = useNavigate(); // for navigation

  const handleChange = (e) => {
    setPatientDetails({ ...patientDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success(`Appointment created successfully!`);
    sendToDoctor(patientDetails); // pass details to DoctorReview

    setTimeout(() => {
      navigate('/review');
    }, 800); // Delay for toast display
  };

  return (
    <div className="create-appointment-container">
      <form onSubmit={handleSubmit} className="create-appointment-form">
        <Link to="/appointment" className="create-appointment-back-button">
          Back
        </Link>
        <h2 className="create-appointment-title">New Appointment</h2>
        <div className="create-appointment-grid">
          {/* Patient Basic Details */}
          <input name="name" placeholder="Name" value={patientDetails.name} onChange={handleChange} className="create-appointment-input" required />
          <input name="age" placeholder="Age" value={patientDetails.age} onChange={handleChange} className="create-appointment-input" required />
          <input name="phone" placeholder="Phone" value={patientDetails.phone} onChange={handleChange} className="create-appointment-input" required />
          {/* Vitals */}
          <input name="weight" placeholder="Weight" value={patientDetails.weight} onChange={handleChange} className="create-appointment-input" required />
          <input name="height" placeholder="Height" value={patientDetails.height} onChange={handleChange} className="create-appointment-input" required />
          <input name="BP" placeholder="Blood Pressure" value={patientDetails.BP} onChange={handleChange} className="create-appointment-input" required />
          <input name="BG" placeholder="Blood Glucose" value={patientDetails.BG} onChange={handleChange} className="create-appointment-input" required />
          <input name="SPO2" placeholder="SPO2" value={patientDetails.SPO2} onChange={handleChange} className="create-appointment-input" required />
        </div>
        {/* Complaints & History */}
        <textarea name="complaints" placeholder="Chief Complaints" value={patientDetails.complaints} onChange={handleChange} className="create-appointment-textarea" />
        <textarea name="history" placeholder="Medical History" value={patientDetails.history} onChange={handleChange} className="create-appointment-textarea" />
        <button type="submit" className="create-appointment-submit">Send to Doctor</button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default CreateAppointment;
