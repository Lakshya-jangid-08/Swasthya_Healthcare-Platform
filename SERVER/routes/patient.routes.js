const express = require('express');
const { getAppointment, getAppointmentLists, createAppointment, cancelAppointment, confirmAppointment } = require('../controllers/appointment.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const patientRouter = express.Router();

patientRouter.get('/appointments', authMiddleware, getAppointmentLists);
patientRouter.get('/appointments/:appointmentId', authMiddleware, getAppointment);
patientRouter.post('/appointments', authMiddleware, createAppointment);
patientRouter.patch('/appointments/:appointmentId/cancel', authMiddleware, cancelAppointment);
patientRouter.patch('/appointments/:appointmentId/confirm', authMiddleware, confirmAppointment);

module.exports = patientRouter  