const Appointment = require("../models/Appointment.model");
const Doctor = require("../models/Doctor.model");

const getAppointmentLists = async(req, res) => {
    try {
        const userId = req.user.id;
        console.log(userId);
        
        const doctor = await Doctor.findOne({ userId });

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
    getAppointmentLists
}