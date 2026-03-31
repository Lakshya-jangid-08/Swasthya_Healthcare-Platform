const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const { addedMoney } = require('../controllers/shared.controller');
const sharedRouter = express.Router();

sharedRouter.post("/add-money", authMiddleware, addedMoney);

module.exports = {
    sharedRouter
}