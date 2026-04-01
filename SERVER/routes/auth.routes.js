const express = require('express');
const { loginUser, createDoctor, createPatient, logOutUser, getMe } = require('../controllers/auth.controller');
const authRouter = express.Router();

authRouter.post('/login', loginUser);
authRouter.post('/register/doctor', createDoctor);
authRouter.post('/register/patient', createPatient);
authRouter.post('/logout', logOutUser);
authRouter.get('/me', getMe);

module.exports = authRouter