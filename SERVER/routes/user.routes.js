const express = require('express');
const { getProfileById } = require('../controllers/user.controller');
const userRoute = express.Router();

userRoute.get('/profile/:id', getProfileById);

module.exports = userRoute