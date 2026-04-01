const Patient = require("../models/Patient.model");

const getProfile = async(req, res) => {
    try {
        const userId = req.user.id;
        console.log("called by ", userId);
        
        const patient = await Patient.findOne({ userId })
        .populate("userId", "fullname email contactNumber");
        if(!patient) {
            return res.status(404).json({message : "user doesnot exist"})
        }
        console.log("sending " , patient);
        
        return res.status(200).json ({
            patientData : patient,
            message : "Fetch successfull !"
        })

    } catch(err) {
        return res.status(500).json({message : "SERVER ERROR !"})
    }
}

const updateProfile = async(req, res) => {
    try {
        const {age, bloodGroup, gender} = req.body;
        const userId = req.user.id;
        const patient = await Patient.findOne({ userId });
        if(!patient) {
            return res.status(404).json({message : "user doesnot exist"})
        }

        patient.age = age || patient.age
        patient.bloodGroup = bloodGroup || patient.bloodGroup
        patient.gender = gender || patient.gender

        await patient.save();

        return res.status(200).json ({
            patientData : patient,
            message : "update successfull !"
        })

    } catch(err) {
        return res.status(500).json({message : "SERVER ERROR !"})
    }
}

module.exports = {
    getProfile,
    updateProfile
}