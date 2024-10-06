import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify'; // For toast notifications
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'; // Import axios
import { useNavigate } from 'react-router-dom';

const DoctorReview = ({ appointmentDetails }) => {
  const navigate = useNavigate();
  const [doctorDetails, setDoctorDetails] = useState({
    clinicalFinding: '',
    medicines: '',
    reports: '',
    doctorName: '',
    doctorPhone: '',
    advice: ''
  });

  const handleChange = (e) => {
    setDoctorDetails({ ...doctorDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fullAppointmentDetails = {
      patientName: appointmentDetails.name,
      patientAge: appointmentDetails.age,
      patientPhone: appointmentDetails.phone,
      weight: appointmentDetails.weight,
      height: appointmentDetails.height,
      BP: appointmentDetails.BP,
      BG: appointmentDetails.BG,
      SPO2: appointmentDetails.SPO2,
      complaints: appointmentDetails.complaints,
      history: appointmentDetails.history,
      ...doctorDetails
    };

    try {
      const response = await axios.post('https://dispensaryminor-aa3dd5f90851.herokuapp.com/api/appointments', fullAppointmentDetails, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        toast.success('Appointment submitted successfully!', {
          position: "top-right", // Use string here instead of accessing POSITION
          
        });
      } else {
        toast.error('Error submitting appointment.', {
          position: "top-right", // Use string here instead of accessing POSITION
        });
      }
    } catch (error) {
      toast.error('An error occurred while submitting.', {
        position: "top-right", // Use string here instead of accessing POSITION
      });
    }
    setTimeout(() => {
      navigate('/appointment');
    }, 700); // 700ms delay
  };

  if (!appointmentDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl text-center">
          <h2 className="text-2xl font-bold mb-6">Loading appointment details...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center  bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-3xl font-bold mb-6 text-center">Make Prescription</h2>
        
        <div className="mb-8 border-b pb-4">
          <h3 className="text-2xl font-semibold mb-2">Patient Details:</h3>
          <div className="grid grid-cols-2 text-xl  gap-4">
            <p><strong>Name:</strong> {appointmentDetails.name}</p>
            <p><strong>Age:</strong> {appointmentDetails.age}</p>
            <p><strong>Phone:</strong> {appointmentDetails.phone}</p>
            <p><strong>Weight:</strong> {appointmentDetails.weight} kg</p>
            <p><strong>Height:</strong> {appointmentDetails.height} cm</p>
            <p><strong>BP:</strong> {appointmentDetails.BP} mmHg</p>
            <p><strong>BG:</strong> {appointmentDetails.BG} mg/dL</p>
            <p><strong>SPO2:</strong> {appointmentDetails.SPO2}%</p>
            <p className="col-span-2"><strong>Complaints:</strong> {appointmentDetails.complaints}</p>
            <p className="col-span-2"><strong>History:</strong> {appointmentDetails.history}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="clinicalFinding" className="block text-lg font-semibold mb-1">Clinical Findings</label>
            <textarea 
              id="clinicalFinding" 
              name="clinicalFinding" 
              value={doctorDetails.clinicalFinding} 
              onChange={handleChange} 
              className="w-full p-3 border rounded-lg" 
              placeholder="Enter clinical findings here" 
            />
          </div>

          <div className="mb-4">
            <label htmlFor="medicines" className="block text-lg font-semibold mb-1">Medicines</label>
            <textarea 
              id="medicines" 
              name="medicines" 
              value={doctorDetails.medicines} 
              onChange={handleChange} 
              className="w-full p-3 border rounded-lg" 
              placeholder="Enter prescribed medicines" 
            />
          </div>

          <div className="mb-4">
            <label htmlFor="reports" className="block text-lg font-semibold mb-1">Reports</label>
            <textarea 
              id="reports" 
              name="reports" 
              value={doctorDetails.reports} 
              onChange={handleChange} 
              className="w-full p-3 border rounded-lg" 
              placeholder="Enter reports if any" 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label htmlFor="doctorName" className="block text-lg font-semibold mb-1">Doctor's Name</label>
              <input 
                type="text" 
                id="doctorName" 
                name="doctorName" 
                value={doctorDetails.doctorName} 
                onChange={handleChange} 
                className="w-full p-3 border rounded-lg" 
                placeholder="Enter your name" 
                required 
              />
            </div>

            <div className="mb-4">
              <label htmlFor="doctorPhone" className="block text-lg font-semibold mb-1">Doctor's Phone</label>
              <input 
                type="text" 
                id="doctorPhone" 
                name="doctorPhone" 
                value={doctorDetails.doctorPhone} 
                onChange={handleChange} 
                className="w-full p-3 border rounded-lg" 
                placeholder="Enter your phone number" 
                required 
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="advice" className="block text-lg font-semibold mb-1">Advice</label>
            <textarea 
              id="advice" 
              name="advice" 
              value={doctorDetails.advice} 
              onChange={handleChange} 
              className="w-full p-3 border rounded-lg" 
              placeholder="Enter advice for the patient" 
            />
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white py-3 mt-5 mb-10 rounded-lg hover:bg-blue-700 transition duration-200">
            Submit and Save
          </button>
        </form>
      </div>
      
      {/* ToastContainer for notifications */}
      <ToastContainer />
    </div>
  );
};

export default DoctorReview;
