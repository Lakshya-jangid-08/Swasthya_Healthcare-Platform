const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    profileImage : {
        type : String,
        default : "https://res.cloudinary.com/DB_name/image/upload/v1772795306/Screenshot_2026-03-06_163806_dls6xa.png"
    },
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['doctor', 'patient', 'admin'],
        default: 'patient',
    },  
    address : {
        type: String,
    },
    contactNumber : {
        type: String,
    }, 
    walletBalance: {
        type: Number,
        default: function () {
            return this.role === "patient" ? 1000 : 500;
        }
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;