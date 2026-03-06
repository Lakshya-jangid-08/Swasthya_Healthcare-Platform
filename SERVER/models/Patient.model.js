const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: true, 
    },
    age: {
        type: Number,
        required: true,
    },
    bloodGroup: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
});

const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;