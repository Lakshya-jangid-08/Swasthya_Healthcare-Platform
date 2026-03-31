const Appointment = require("../models/Appointment.model");
const Doctor = require("../models/Doctor.model");
const Patient = require("../models/Patient.model");
const Transaction = require("../models/Transaction.model");
const User = require("../models/Users.model");

const getDoctorLists  = async (req, res) => {
    try {
        const doctorList = await Doctor.find(
            {status : 'active'} ,
            "specialization clinicAddress consultationFee yearsOfExperience isVerified"
        ).populate("userId", "fullname email contactNumber");
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

const createAppointment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { doctorId, appointmentDateTime, description } = req.body;

    if (!doctorId || !appointmentDateTime) {
      return res.status(400).json({ message: "All required fields missing" });
    }

    const patient = await Patient.findOne({ userId });
    if (!patient) {
      return res.status(404).json({ message: "Patient profile not found" });
    }

    const doctor = await Doctor.findById(doctorId);
    if (!doctor || doctor.status !== "active") {
      return res.status(404).json({ message: "Doctor not available" });
    }

    const existingAppointment = await Appointment.findOne({
      doctorId,
      appointmentDateTime,
      status: { $in: ["PENDING", "CONFIRMED"] }
    });

    if (existingAppointment) {
      return res.status(409).json({ message: "Time slot already booked" });
    }

    const appointment = await Appointment.create({
      doctorId,
      patientId: patient._id,
      appointmentDateTime,
      description,
      status: "PENDING",
      paymentStatus: "PENDING"
    });

    return res.status(201).json({
      appointment,
      message: "Appointment booked successfully"
    });

  } catch (err) {
    return res.status(500).json({ message: "SERVER ERROR" });
  }
};

const getAppointmentLists  = async(req, res) => {
    try {
        const userId = req.user.id;
        
        const patient = await Patient.findOne({ userId });

        const appointmentList = await Appointment.find({
            patientId: patient._id
        })
         .populate({
            path: "doctorId",
            select: "specialization clinicAddress",
            populate: {
            path: "userId",
            select: "fullname profileImage",
            },
        })
        .sort({ appointmentDate: -1 });


        return res.status(200).json({appointmentList , message : "Fetch succesfully"});
    
    } catch(err) {
        return res.status(500).json({message : "SERVER ERROR !"})
    }
}

const getAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.params
        const userId = req.user.id;
        
        const patient = await Patient.findOne({ userId });
        if (!patient) {
            return res.status(404).json({ message: "Patient profile not found" });
        }

        const appointment = await Appointment.findById(appointmentId)
        .populate({
            path: "doctorId",
            select: "specialization clinicAddress consultationFee yearsOfExperience",
            populate: {
            path: "userId",
            select: "fullname email contactNumber image",
            },
        })
        .populate("patientId", "age gender bloodGroup");

        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        if (!appointment.patientId.equals(patient._id)) {
            return res.status(403).json({ message: "Forbidden access" });
        }

        return res.status(200).json({
            appointment,
            message: "Appointment fetched successfully"
        });    
    } catch(err) {
        return res.status(500).json({message : "SERVER ERROR !"})
    }
}

const cancelAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.params;
        const userId = req.user.id;
        
        const patient = await Patient.findOne({ userId });
        if (!patient) {
            return res.status(404).json({ message: "Patient profile not found" });
        }

        const appointment = await Appointment.findById(appointmentId)

        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        if (!appointment.patientId.equals(patient._id)) {
            return res.status(403).json({ message: "Forbidden access" });
        }
        
        if (appointment.status === "COMPLETED") {
            return res.status(400).json({ message: "Completed appointment cannot be cancelled" });
        }

        if (appointment.status === "CANCELLED") {
            return res.status(400).json({ message: "Appointment already cancelled" });
        }

        appointment.status = "CANCELLED";
        await appointment.save(); 
        return res.status(200).json({appointment , message : "Update Succesfully"});
    
    } catch(err) {
        return res.status(500).json({message : "SERVER ERROR !"})
    }
}

const confirmAppointment = async (req, res) => {
    try {
        const {appointmentId} = req.params;
        const userId = req.user.id;
        const patient = await Patient.findOne({ userId });
        if (!patient) {
            return res.status(404).json({ message: "Patient profile not found" });
        }
        const appointment = await Appointment.findById(appointmentId)

        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        if (!appointment.patientId.equals(patient._id)) {
            return res.status(403).json({ message: "Forbidden access" });
        }

        if (appointment.status === "COMPLETED") {
            return res.status(400).json({ message: "Completed appointment cannot be confirmed" });
        }

        if (appointment.status === "CONFIRMED") {
            return res.status(400).json({ message: "Appointment confirmed, already" });
        }

        // check patient has money or not
        
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const walletBalance = user.walletBalance;
        console.log("Patient userId:", patient.userId);
        const doctorId = appointment.doctorId;
        
        const doctor = await Doctor.findById(doctorId);
        if(!doctor) {
            return res.status(404).json({ message: "Doctor profile not found" });
        }
        console.log("Doctor userId:", doctor.userId);
        console.log(walletBalance , doctor.consultationFee);
        
        if(doctor.consultationFee > walletBalance) {
            throw new Error("Insufficient balance");
        }
        
        console.log("done1");
        
        await Transaction.create({
            sender : patient.userId,
            reciever : doctor.userId,
            amount : doctor.consultationFee,
            type : "DEBIT",
            status : "SUCCESS",
            purpose : "APPOINTMENT"
        })
        console.log("confirmed");
        
        user.walletBalance -= doctor.consultationFee;
        await user.save();
        appointment.status = "CONFIRMED";
        await appointment.save(); 
        return res.status(200).json({appointment , message : "Update Succesfully"});

    } catch(err) {
        return res.status(500).json({message : "Internal Server Error", error : err});
    }
}

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

const getProfile = async(req, res) => {
    try {
        const userId = req.user.id;

        const patient = await Patient.findOne({ userId })
        .populate("userId", "fullname email contactNumber");
        if(!patient) {
            return res.status(404).json({message : "user doesnot exist"})
        }
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
    getDoctorLists,
    getDoctor,
    createAppointment,
    getAppointmentLists,
    getAppointment,
    cancelAppointment,
    confirmAppointment,
    getTransactionLists,
    getProfile,
    updateProfile
}