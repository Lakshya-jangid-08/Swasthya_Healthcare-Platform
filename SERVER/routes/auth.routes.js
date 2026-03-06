const express = require('express');
const { loginUser, updateUser, deleteUser, createPatient, createDoctor, getMe, logOutUser, getProfile } = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const authRouter = express.Router();

authRouter.get('/me', getMe);

authRouter.get('/profile',authMiddleware, getProfile);

authRouter.post('/create-doctor', createDoctor);

authRouter.post('/create-patient', createPatient);

authRouter.post('/login', loginUser);

authRouter.put('/update-user',authMiddleware, updateUser)

authRouter.delete('/delete-user',authMiddleware, deleteUser)

authRouter.post('/logout-user',authMiddleware, logOutUser)

module.exports = authRouter;