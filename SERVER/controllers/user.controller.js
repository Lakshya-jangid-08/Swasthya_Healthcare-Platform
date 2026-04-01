const User = require("../models/Users.model");
const bcrypt = require("bcrypt");
const Patient = require("../models/Patient.model");
const Doctor = require("../models/Doctor.model");
const { uploadOnCloudinary } = require("../utils/Cloudinary");

const updateUser = async (req, res) => {
  try {
    if (!req.body) {
      console.error("updateUser: empty req.body");
      return res.status(400).json({ message: "Request body is required" });
    }
    
    const { fullname, email, password, address, contactNumber, age, gender, 
      bloodGroup , specialization, clinicAddress, consultationFee, yearsOfExperience
    } = req.body || {};
    const userId = req.user.id;
    const role = req.user.role;
    
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(400).json({ message: "Invalid !" });
    }

    if(req.file) {
      const cloudinaryResponse = await uploadOnCloudinary(req.file.path);

      if (!cloudinaryResponse) {
        return res.status(500).json({ message: "Cloudinary upload failed" });
      }

      user.profileImage = cloudinaryResponse.secure_url;
      
    }

    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res.status(409).json({ message: "Email already in use" });
      }
    }

    user.fullname = fullname || user.fullname;
    user.email = email || user.email;
    user.address = address || user.address;
    user.contactNumber = contactNumber || user.contactNumber;

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }
    await user.save();
    
    if (role === "patient") {
      await Patient.findOneAndUpdate(
        { userId },
        {
          ...(age !== undefined && { age }),
          ...(gender && { gender }),
          ...(bloodGroup && { bloodGroup }),
        },
        { new: true }
      );
    }

    if (role === "doctor") {
      await Doctor.findOneAndUpdate(
        { userId },
        {
          ...(specialization && { specialization }),
          ...(clinicAddress && { clinicAddress }),
          ...(consultationFee !== undefined && { consultationFee }),
          ...(yearsOfExperience !== undefined && { yearsOfExperience }),
        },
        { new: true }
      );
    }

    res.status(200).json({
      message: "Profile updated successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message || "SERVER ERROR" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.user.id;

    await Patient.deleteOne({ userId });
    await Doctor.deleteOne({ userId });
    await User.findByIdAndDelete(userId);

    res.status(200).json({
      message: "Successfully deleted !",
    });
  } catch (err) {
    res.status(500).json({ message: err.message || "SERVER ERROR" });
  }
};

const getProfileById = async(req, res) => {
    try {
        const {id} = req.params;
    
        const user = await User.findById(id).select("profileImage fullname role contactNumber");
        if(!user) {
            return res.status(400).json({message : "Can't exist"})
        }
        return res.status(200).json({user : user, message : "successfully fetch !"});
    } catch(err) {
        console.log(err);
        return res.status(500).json({ message: "SERVER ERROR" });
    }
}

const getProfile = async (req, res) => {
  try {
    const { id, role } = req.user;

    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let roleData = null;

    if (role === "patient") {
      roleData = await Patient.findOne({ userId: id });
    }

    if (role === "doctor") {
      roleData = await Doctor.findOne({ userId: id });
    }

    res.status(200).json({
      user,
      roleData,
    });
  } catch (err) {
    res.status(500).json({ message: "SERVER ERROR" });
  }
};



module.exports = {
    updateUser,
    deleteUser,
    getProfileById,
    getProfile
}