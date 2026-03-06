const { getDoctorLists, getDoctor, getAppointmentLists, getAppointment, cancelAppointment, getProfile, updateProfile, createAppointment } = require('../controllers/patient.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const patientRouter = require('express').Router();

// Get patient profile (personal + medical info)
patientRouter.get('/profile', authMiddleware, getProfile);

// Update patient profile (age, gender, blood group etc.)
patientRouter.patch('/profile',authMiddleware, updateProfile);

// Get list of all verified doctors
patientRouter.get('/doctors', getDoctorLists);

// Get single doctor details by doctorId
patientRouter.get('/doctors/:doctorId', getDoctor);

// Create a new appointment with a doctor
patientRouter.post('/appointments',authMiddleware, createAppointment);

// Get all appointments of logged-in patient
patientRouter.get('/appointments',authMiddleware, getAppointmentLists);

// Get appointment details
patientRouter.get('/appointments/:appointmentId',authMiddleware, getAppointment);

// Cancel an appointment (before confirmed/completed)
patientRouter.patch('/appointments/:appointmentId/cancel',authMiddleware, cancelAppointment);

// -- yet not implement --

// Get all messages of an appointment chat
// patientRouter.get('/appointments/:appointmentId/messages');

// Send message in appointment chat
// patientRouter.post('/appointments/:appointmentId/messages');

// Upload health report (PDF / image)
// patientRouter.post('/health-reports');

// Get all health reports of logged-in patient
// patientRouter.get('/health-reports');

// Get single health report details
// patientRouter.get('/health-reports/:reportId');

module.exports = patientRouter;
