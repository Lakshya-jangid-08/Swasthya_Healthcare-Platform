const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const { getUserForSlidebar, getMessages } = require('../controllers/message.controller');
const chatRouter = express.Router();

chatRouter.get('/',  authMiddleware, getUserForSlidebar);
chatRouter.get('/:userId/messages', authMiddleware, getMessages);

module.exports = chatRouter;