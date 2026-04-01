const express = require('express');
const { doctorAppointmentLists, getDoctor, getDoctorLists } = require('../controllers/doctor.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const doctorRouter = express.Router();

doctorRouter.get('/', getDoctorLists);
doctorRouter.get('/appointments', authMiddleware, doctorAppointmentLists);
doctorRouter.get('/:doctorId', getDoctor);

module.exports = doctorRouter