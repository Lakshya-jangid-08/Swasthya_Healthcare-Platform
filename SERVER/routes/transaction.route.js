const express = require('express');
const { getTransactionLists, topUp } = require('../controllers/transaction.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const transactionRouter = express.Router();

transactionRouter.get('/', authMiddleware, getTransactionLists);
transactionRouter.post('/wallet/topup', authMiddleware, topUp)

module.exports = transactionRouter