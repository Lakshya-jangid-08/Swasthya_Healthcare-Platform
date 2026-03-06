const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    specialization: {
        type: String,
        required: true,
    },
    licenseNumber: {
        type: String,
        required: true,
        unique: true,
    },
    degree : {
        type: String,
        required: true,
    },
    yearsOfExperience: {
        type: Number,
        required: true,
    },
    clinicAddress: {
        type: String,
        required: true,
    },
    consultationFee: {
        type: Number,
        required: true,
    },
    status : {
        type: String,
        enum: ['active', 'inactive', 'suspended'],
        default: 'active',
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    rating: {
        type: Number,
        default: 0,
    },
    totalReviews: {
        type: Number,
        default: 0,
    },
    totalAppointments: {
    type: Number,
    default: 0,
    },
    totalPatientsHandled: {
        type: Number,
        default: 0,
    }
});

/**
 Have to add 
 rating, 
 review, 
 degree,
 patientId
 */

const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;