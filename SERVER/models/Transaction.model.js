const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    sender : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    reciever: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        enum: ['CREDIT', 'DEBIT'],
        required: true,
    },
    status: {
        type: String,
        enum: ['SUCCESS', 'FAILED', 'PENDING'],
        default: 'SUCCESS',
    },
    purpose: {
        type: String,
        enum: ['APPOINTMENT', 'REFUND', 'WALLET_TOPUP'],
        required: true,
    }

}, { timestamps: true });

const Transaction = mongoose.model('Transaction', TransactionSchema);
module.exports = Transaction;