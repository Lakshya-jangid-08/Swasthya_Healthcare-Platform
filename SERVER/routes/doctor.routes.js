const { getAppointmentLists } = require('../controllers/doctor.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const doctorRouter = require('express').Router();

doctorRouter.get('/doctors', (req, res) => {
    res.send('List of doctors');
});

doctorRouter.get('/appointments', authMiddleware, getAppointmentLists)

module.exports = doctorRouter;