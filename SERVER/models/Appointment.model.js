const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    doctorId : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required : true,
    },
    description : {
        type : String,
        required : true,
    },
    patientId : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required : true,
    },
    appointmentDateTime : {
        type : Date,
        required : true,
    },
    status : {
        type : String,
        enum : ['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED'],
        default : 'PENDING',
    },
    paymentStatus : {
        type : String,
        enum : ['PENDING', 'PAID', 'FAILED'],
        default : 'PENDING',
    }
}, {timestamps: true});

const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;