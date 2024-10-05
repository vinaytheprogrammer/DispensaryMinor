// backend/models/Appointment.js
const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  patientAge: { type: Number, required: true },
  patientPhone: { type: String, required: true },
  weight: { type: Number },
  height: { type: Number },
  BP: { type: String },
  BG: { type: String },
  SPO2: { type: String },
  complaints: { type: String },
  history: { type: String },
  clinicalFinding: { type: String },
  medicines: { type: String },
  reports: { type: String },
  advice: { type: String },
  doctorName: { type: String, required: true },
  doctorPhone: { type: String, required: true },
});

const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;
    