import React, { useEffect, useState } from "react";

function PatientSignup({isPatientLogin}) {

  const navigate = useNavigate();
  const { checkAuth } = useAuth();
  const [step, setStep] = useState(1);

  // STEP 1
  const [fullname, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [password, setPassword] = useState("");

  // STEP 2
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePatientSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/create-patient`,
        {
          fullname,
          email,
          contactNumber,
          password,
          address,
          gender,
          age,
          bloodGroup,
        },
        { withCredentials: true },
      );

      if (res.status === 201) {
        // Refresh auth state immediately
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
      setAddress("");
      setAge("");
      setBloodGroup("");
      setGender("");
      setStep(1);
    }
  };

  useEffect(() => {
    setStep(1);
    setAddress("");
    setGender("");
    setAge("");
    setBloodGroup("");
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
        Create Account {isPatientLogin ? " - Patient" : " - Doctor"}
      </h1>
      <p className="text-sm text-gray-400 mb-6">
        Step {step} of {isPatientLogin ? 2 : 3}
      </p>

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
              Address
            </label>
            <input
              type="text"
              value={address}
              placeholder="Enter Address"
              onChange={(e) => setAddress(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 text-sm 
                        focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          {/* Gender */}
          {/* adress */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Gender
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm
                    focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Age - Degree */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Age
            </label>
            <input
              type="number"
              value={age}
              placeholder="Enter Age"
              onChange={(e) => setAge(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 text-sm 
                        focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          {/* Blood Group */}
          {/* Specializtion */}

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Blood Group
            </label>
            <select
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm
                    focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
            >
              <option value="">Select blood group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
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
              onClick={handlePatientSignup}
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
          {/* BACK + SIGNUP BUTTONS */}
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

export default PatientSignup;
