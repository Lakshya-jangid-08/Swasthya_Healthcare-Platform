const Appointment = require("../models/Appointment.model");
const Doctor = require("../models/Doctor.model");

const getDoctorLists  = async (req, res) => {
    try {
        const doctorList = await Doctor.find(
            {status : 'active'} ,
            "specialization clinicAddress consultationFee yearsOfExperience isVerified"
        ).populate("userId", "fullname email contactNumber  profileImage");
        return res.status(200).json({doctorList , message : "Fetch succesfully"});
    
    } catch(err) {
        return res.status(500).json({message : "SERVER ERROR !"})
    }
}

const getDoctor = async (req, res) => {
    try {
        const { doctorId } = req.params
        
        const doctor = await Doctor.findById(doctorId)
        .populate("specialization degree clinicAddress consultationFee isVerified status")
        .populate("userId", "fullname email profileImage contactNumber");
        return res.status(200).json({doctor , message : "Fetch succesfully"});
    
    } catch(err) {
        return res.status(500).json({message : "SERVER ERROR !"})
    }
}

const doctorAppointmentLists = async(req, res) => {
    try {
        const userId = req.user.id;
        
        const doctor = await Doctor.findOne({ userId });
        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }
        
        
        const list = await Appointment.find({ doctorId : doctor._id })
                    .populate({
                        path : "patientId",
                        select : "gender age",
                        populate : {
                            path: "userId",
                            select: "fullname profileImage",
                        }
                    })
                    .sort({ appointmentDate: -1 });
        
        return res.status(200).json({list , message : "Fetch succesfully"});
    
    } catch(err) {
        return res.status(500).json({message : "SERVER ERROR !"})
    }
}

module.exports = {
    getDoctorLists,
    getDoctor,
    doctorAppointmentLists
}