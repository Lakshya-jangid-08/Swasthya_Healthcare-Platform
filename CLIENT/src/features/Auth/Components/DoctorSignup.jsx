import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { doctorSignupAPI } from "../../../service/apis";

function DoctorSignup({ isPatientLogin }) {

  const navigate = useNavigate();
  const { checkAuth } = useAuth();
  const [step, setStep] = useState(1);

  const [fullname, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [password, setPassword] = useState("");

  // STEP 2
  const [error, setError] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [degree, setDegree] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [clinicAddress, setClinicAddress] = useState("");

  // STEP 3
  const [licenseNumber, setLicenseNumber] = useState("");
  const [consultationFee, setConsultationFee] = useState("");

  const [loading, setLoading] = useState(false);

  const handleDoctorSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await doctorSignupAPI({
        fullname,
        email,
        contactNumber,
        password,
        clinicAddress,
        specialization,
        degree,
        yearsOfExperience,
        licenseNumber,
        consultationFee,
      });

      if (res.status == 201) {
        await checkAuth();
        navigate("/");
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Signup failed");
      } else {
        setError("Server not reachable. Please try again later.");
      }
    } finally {
      setLoading(false);
      setName("");
      setEmail("");
      setContactNumber("");
      setPassword("");
      setClinicAddress("");
      setSpecialization("");
      setDegree("");
      setLicenseNumber("");
      setConsultationFee("");
      setYearsOfExperience("");
      setStep(1);
    }
  };

  useEffect(() => {
    setStep(1);
    setSpecialization("");
    setDegree("");
    setYearsOfExperience("");
    setClinicAddress("");
    setLicenseNumber("");
    setConsultationFee("");
  }, [isPatientLogin]);

  return (
    <div className="px-8 pb-8">
      <h1 className="text-3xl font-semibold text-gray-700 mb-1">
        Create Account - Doctor
      </h1>
      <p className="text-sm text-gray-400 mb-6">Step {step} of 3</p>

      {/* ================= STEP 1 ================= */}
      {step === 1 && (
        <>
          {/* Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={fullname}
              placeholder="Enter Name"
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 text-sm 
                                      focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 text-sm 
                                      focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          {/* Contact */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Contact Number
            </label>
            <input
              type="text"
              placeholder="Enter Contact Number"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 text-sm 
                                      focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 text-sm 
                                      focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          <button
            type="button"
            onClick={() => setStep(step + 1)}
            className="w-full rounded-lg bg-emerald-500 py-3 text-white font-semibold"
          >
            Next
          </button>
        </>
      )}

      {/* ================= STEP 2 ================= */}
      {step === 2 && (
        <>
          {/* Address + clinic Adress*/}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Clinic Address
            </label>
            <input
              type="text"
              value={clinicAddress}
              placeholder="Enter Clinic Address"
              onChange={(e) => setClinicAddress(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 text-sm 
              focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          {/* Degree */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Degree
            </label>

            <select
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 text-sm 
                    focus:ring-2 focus:ring-emerald-400"
            >
              <option value="">Select Degree</option>

              {/* Undergraduate */}
              <option value="MBBS">MBBS</option>
              <option value="BDS">BDS</option>
              <option value="BAMS">BAMS</option>
              <option value="BHMS">BHMS</option>
              <option value="BUMS">BUMS</option>

              {/* Postgraduate */}
              <option value="MD">MD</option>
              <option value="MS">MS</option>
              <option value="MDS">MDS</option>
              <option value="DNB">DNB</option>

              {/* Super Speciality */}
              <option value="DM">DM</option>
              <option value="MCh">MCh</option>

              {/* Diplomas */}
              <option value="Diploma">Diploma</option>

              {/* Allied / Others */}
              <option value="BPT">BPT (Physiotherapy)</option>
              <option value="MPT">MPT (Physiotherapy)</option>
              <option value="BSc Nursing">BSc Nursing</option>
              <option value="MSc Nursing">MSc Nursing</option>
              <option value="PharmD">PharmD</option>
            </select>
          </div>

          {/* Specializtion */}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Specialization
            </label>

            <select
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 text-sm
                      focus:ring-2 focus:ring-emerald-400"
            >
              <option value="">Select Specialization</option>

              {/* General */}
              <option value="General Physician">General Physician</option>
              <option value="Family Medicine">Family Medicine</option>
              <option value="Internal Medicine">Internal Medicine</option>

              {/* Surgical */}
              <option value="General Surgery">General Surgery</option>
              <option value="Orthopedic">Orthopedic</option>
              <option value="Neurosurgery">Neurosurgery</option>
              <option value="Plastic Surgery">Plastic Surgery</option>
              <option value="Cardiothoracic Surgery">
                Cardiothoracic Surgery
              </option>

              {/* Medical */}
              <option value="Cardiology">Cardiology</option>
              <option value="Neurology">Neurology</option>
              <option value="Endocrinology">Endocrinology</option>
              <option value="Gastroenterology">Gastroenterology</option>
              <option value="Nephrology">Nephrology</option>
              <option value="Pulmonology">Pulmonology</option>
              <option value="Rheumatology">Rheumatology</option>
              <option value="Oncology">Oncology</option>

              {/* Women & Child */}
              <option value="Gynecology">Gynecology</option>
              <option value="Obstetrics">Obstetrics</option>
              <option value="Pediatrics">Pediatrics</option>
              <option value="Neonatology">Neonatology</option>

              {/* Skin & Sensory */}
              <option value="Dermatology">Dermatology</option>
              <option value="Ophthalmology">Ophthalmology</option>
              <option value="ENT">ENT (Ear, Nose, Throat)</option>

              {/* Mental Health */}
              <option value="Psychiatry">Psychiatry</option>
              <option value="Psychology">Psychology</option>

              {/* Diagnostics */}
              <option value="Radiology">Radiology</option>
              <option value="Pathology">Pathology</option>
              <option value="Microbiology">Microbiology</option>

              {/* Emergency & Critical */}
              <option value="Emergency Medicine">Emergency Medicine</option>
              <option value="Anesthesiology">Anesthesiology</option>
              <option value="Critical Care">Critical Care</option>

              {/* Alternative Medicine */}
              <option value="Ayurveda">Ayurveda</option>
              <option value="Homeopathy">Homeopathy</option>
              <option value="Unani">Unani</option>
              <option value="Yoga & Naturopathy">Yoga & Naturopathy</option>

              {/* Allied Health */}
              <option value="Physiotherapy">Physiotherapy</option>
              <option value="Nutritionist">Nutritionist</option>
              <option value="Dietician">Dietician</option>
              <option value="Speech Therapy">Speech Therapy</option>

              {/* Dental */}
              <option value="Dentistry">Dentistry</option>
              <option value="Orthodontics">Orthodontics</option>
              <option value="Oral Surgery">Oral & Maxillofacial Surgery</option>
            </select>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="w-1/3 rounded-lg border border-gray-300 py-3 
                      text-gray-700 font-medium hover:bg-gray-100 transition"
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="w-2/3 rounded-lg bg-emerald-500 py-3 text-white font-semibold"
            >
              Next
            </button>
          </div>
        </>
      )}

      {step === 3 && (
        <>
          {/* License Number */}

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Year of Experience
            </label>
            <input
              value={yearsOfExperience}
              type="number"
              onChange={(e) => setYearsOfExperience(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm
        focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
              placeholder="Enter Years of Experience"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              License Number
            </label>
            <input
              type="text"
              value={licenseNumber}
              placeholder="Enter Valid License Number"
              onChange={(e) => setLicenseNumber(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 text-sm 
                                        focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          {/* Fee */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Consultation Fee
            </label>
            <input
              type="number"
              value={consultationFee}
              placeholder="Enter Consultation Fee"
              onChange={(e) => setConsultationFee(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 text-sm 
                                        focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="w-1/3 rounded-lg border border-gray-300 py-3 
                      text-gray-700 font-medium hover:bg-gray-100 transition"
            >
              Back
            </button>

            <button
              type="button"
              onClick={handleDoctorSignup}
              disabled={loading}
              className={`w-2/3 rounded-lg py-3 text-white font-semibold transition
                          ${
                            loading
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-emerald-500 hover:bg-emerald-600"
                          }
                        `}
            >
              {loading ? "Creating Account..." : "Signup"}
            </button>
          </div>
        </>
      )}

      {error && (
        <div className="mb-4 rounded-lg bg-red-100 px-4 py-2 text-sm text-red-700">
          {error}
        </div>
      )}

      <h1 className="text-gray-700 pt-2 text-sm">
        Already have an account?
        <Link to="/login" className="text-blue-300 px-1">
          login
        </Link>
      </h1>
    </div>
  );
}

export default DoctorSignup;
