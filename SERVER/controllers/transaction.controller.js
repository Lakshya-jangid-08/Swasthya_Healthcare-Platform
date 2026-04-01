const Transaction = require("../models/Transaction.model");
const User = require("../models/Users.model");


const getTransactionLists = async(req, res)=> {
    try {
        const userId = req.user.id;

        const Transactions = await Transaction.find({
            $or: [
                { sender: userId },
                { reciever: userId }
            ]
        })
        .sort({ createdAt: -1 })
        .populate('sender', 'fullname')
        .populate('reciever', 'fullname');

        res.json({
            success: true,
            Transactions
        });

    } catch(err) {
        return res.status(500).json({message : "Internal Server Error", error : err});
    }
}

const topUp = async(req, res) => {
    try {
        const {amount} = req.body;
        
        if (!amount) {
            return res.status(400).json({ success: false, msg : "Invalid amount" });
        }
        
        const userId = req.user.id;
        const user = await User.findById(userId);
        
        if(!user) return res.status(404).json({ success: false, msg : "User does not exist"});
        
        await Transaction.create({
            reciever : userId,
            amount,
            type : "DEBIT",
            status : "SUCCESS",
            purpose : "WALLET_TOPUP"
        })
        
        const val = Number(amount);
        user.walletBalance = user.walletBalance + val;
        await user.save();
        
        return res.status(201).json({
            success: true,
            msg : "Amount added successfully",
            walletBalance: user.walletBalance
        });

    } catch (err) {
        console.error("Add money error:", err);
        return res.status(500).json({ success: false, msg : "SERVER ERROR" , error : err.message})
    }
}

module.exports = {
    getTransactionLists,
    topUp
}