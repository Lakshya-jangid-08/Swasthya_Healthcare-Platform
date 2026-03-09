const express = require('express');
const { getUserForSlidebar, getMessages } = require('../controllers/message.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const chatRouter = express.Router();


chatRouter.get('/user-list',authMiddleware, getUserForSlidebar)

chatRouter.get('/message/:otherUserId', authMiddleware, getMessages);

// chatRouter.get('/send/:otherUserId', authMiddleware, sendMessage)

module.exports = {
    chatRouter
}