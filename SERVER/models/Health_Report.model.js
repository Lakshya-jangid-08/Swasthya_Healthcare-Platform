const mongoose = require('mongoose');

const healthReportSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true,
    },
    fileUrl: {
        type: String,
        required: true,
    },
    extractedData: {
        type: Object,
        required: true,
    },
}, { timestamps: true });

const Health_Report = mongoose.model('Health_Report', healthReportSchema);
module.exports = Health_Report;