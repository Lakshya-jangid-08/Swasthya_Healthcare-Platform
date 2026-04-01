const express = require('express');
const { getProfileById, updateUser, deleteUser, getProfile } = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const { default: upload } = require('../middlewares/multer.middleware');
const userRouter = express.Router();

userRouter.get('/me', authMiddleware, getProfile);
userRouter.get('/:id', getProfileById);
userRouter.patch('/me', authMiddleware, upload.single("profileImage"), updateUser);
userRouter.delete('/me', authMiddleware, deleteUser);


module.exports = userRouter