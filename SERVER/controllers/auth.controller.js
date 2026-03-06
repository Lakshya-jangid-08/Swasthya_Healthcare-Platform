const User = require("../models/Users.model");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRES_IN } = require("../configs/env");
const Patient = require("../models/Patient.model");
const Doctor = require("../models/Doctor.model");

const getMe = async (req, res) => {
  try {
    const token = req.cookies.accessToken;
    
    if (!token) {
      return res.status(401).json({ authenticated: false });
    }

    const decoded = jsonwebtoken.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({ authenticated: false });
    }

    res.status(200).json({
      authenticated: true,
      user,
    });
  } catch (err) {
    return res.status(401).json({ authenticated: false });
  }
};

const createPatient = async (req, res) => {
  try {
    console.log("Headers:", req.headers);
    console.log("Body:", req.body);
    if (!req.body || Object.keys(req.body).length === 0) {
      console.error("createPatient: empty req.body");
      return res.status(400).json({ message: "Request body is required" });
    }

    const {
      fullname, email, password, address, contactNumber, gender, age, bloodGroup,
    } = req.body || {};
    console.log("recieve request");

    if (!email || !password || !fullname) {
      return res
        .status(400)
        .json({ message: "Email and Password and Full Name required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exist " });
    }
    console.log("user not exist");

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      fullname,
      email,
      password: hashPassword,
      role: "patient",
      address,
      contactNumber,
    });

    if (!user) {
      return res.status(404).json({ message: "Error occur while creating" });
    }

    const patient = await Patient.create({
      userId: user._id,
      gender,
      age,
      bloodGroup,
    });
    console.log("token generated");

    const token = jsonwebtoken.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN },
    );
    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000 * 24, // 1 hour * 24
    });

    return res.status(201).json({
      message: "Successfully Created !",
    });
  } catch (err) {
    res.status(500).json({ message: err.message || "SERVER ERROR" });
  }
};

const createDoctor = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      console.error("createDoctor: empty req.body");
      return res.status(400).json({ message: "Request body is required" });
    }
    const {
      fullname, email, password, address, contactNumber, specialization, 
      licenseNumber, yearsOfExperience, clinicAddress, consultationFee, degree
    } = req.body || {};

    if (
      !email || !password || !fullname || !specialization || !licenseNumber 
      || !yearsOfExperience || !clinicAddress || !consultationFee || !degree
    ) {
      return res.status(400).json({ message: "All Field Required" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }
    const user = await User.create({
      fullname,
      email,
      password: hashPassword,
      role: "doctor",
      address,
      contactNumber,
    });
    if (!user) {
      return res.status(404).json({ message: "Error occur while creating" });
    }
    const docotr = await Doctor.create({
      userId: user._id,
      specialization,
      licenseNumber,
      yearsOfExperience,
      clinicAddress,
      consultationFee,
      degree,
    });

    const token = jsonwebtoken.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN },
    );
    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000 * 24, // 1 hour * 24
    });

    res.status(201).json({
      message: "Successfully Created !",
    });
  } catch (err) {
    res.status(500).json({ message: err.message || "SERVER ERROR" });
  }
};

const loginUser = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      console.error("loginUser: empty req.body");
      return res.status(400).json({ message: "Request body is required" });
    }
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const existUser = await User.findOne({ email });

    if (!existUser) {
      return res.status(400).json({ message: "Invalid !" });
    }

    const verifyPassword = await bcrypt.compare(password, existUser.password);
    if (!verifyPassword) {
      return res.status(400).json({ message: "Invalid !" });
    }

    const token = jsonwebtoken.sign(
      { userId: existUser._id, role: existUser.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN },
    );

    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000 * 24, // 1 hour * 24
    });

    res.status(200).json({
      role: existUser.role,
      message: "Successfully login !",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message || "SERVER ERROR" });
  }
};

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

const logOutUser = async (req, res) => {
    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });
    res.status(200).json({ message: "successfullly logout user" });
};

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
  getMe,
  createPatient,
  createDoctor,
  loginUser,
  updateUser,
  deleteUser,
  logOutUser,
  getProfile
};
