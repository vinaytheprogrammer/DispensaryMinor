// backend/controllers/appointmentController.js
const Appointment = require('../models/Appointment');

// Create a new appointment
exports.createAppointment = async (req, res) => {
  const appointmentData = req.body;

  try {
    const appointment = new Appointment(appointmentData);
    await appointment.save();
    res.json(appointment);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

// Get all appointments
exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (error) {
    res.status(500).send('Server error');
  }
};
