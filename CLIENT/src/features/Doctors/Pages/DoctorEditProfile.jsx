import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { updateProfile } from "../../../service/apis";
import ProfileSidebar from "../Components/ProfileSlidebar";

function DoctorEditProfile() {

  const { user, loading, getProfile } = useAuth();

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [clinicAddress, setClinicAddress] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [degree, setDegree] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [consultationFee, setConsultationFee] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    if (user) {
      setFullname(user.fullname || "");
      setEmail(user.email || "");
      setContactNumber(user.contactNumber || "");

      setClinicAddress(user.roleData?.clinicAddress || "");
      setSpecialization(user.roleData?.specialization || "");
      setDegree(user.roleData?.degree || "");
      setYearsOfExperience(user.roleData?.yearsOfExperience || "");
      setConsultationFee(user.roleData?.consultationFee || "");
      setLicenseNumber(user.roleData?.licenseNumber || "");
    }
  }, [user]);

  const handleEditProfile = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      if (profileImage) {
        formData.append("profileImage", profileImage);
      }

      formData.append("fullname", fullname);
      formData.append("email", email);
      formData.append("contactNumber", contactNumber);

      formData.append("clinicAddress", clinicAddress);
      formData.append("specialization", specialization);
      formData.append("degree", degree);
      formData.append("yearsOfExperience", yearsOfExperience);
      formData.append("consultationFee", consultationFee);

      await updateProfile(formData);

      await getProfile();

      alert("Profile updated successfully");

    } catch (error) {
      console.error(error);
      alert("Error updating profile");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex min-h-screen w-full">
      <ProfileSidebar role={user?.role} />

      <main className="flex-1 px-6 sm:px-10 py-8">

        <section className="max-w-lg">

          <h2 className="text-xl font-semibold underline mb-6">
            Edit Doctor Profile
          </h2>

          <div className="space-y-4">

            <input
              type="file"
              accept="image/*"
              className="w-full border px-3 py-2 rounded-md"
              onChange={(e) => setProfileImage(e.target.files[0])}
            />

            <input
              className="w-full border px-3 py-2 rounded-md"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              placeholder="Full Name"
            />

            <input
              className="w-full border px-3 py-2 rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />

            <input
              className="w-full border px-3 py-2 rounded-md"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              placeholder="Phone"
            />

            <input
              className="w-full border px-3 py-2 rounded-md"
              value={clinicAddress}
              onChange={(e) => setClinicAddress(e.target.value)}
              placeholder="Clinic Address"
            />

            <input
              className="w-full border px-3 py-2 rounded-md"
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
              placeholder="Degree"
            />

            <input
              className="w-full border px-3 py-2 rounded-md"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              placeholder="Specialization"
            />

            <input
              type="number"
              className="w-full border px-3 py-2 rounded-md"
              value={yearsOfExperience}
              onChange={(e) => setYearsOfExperience(e.target.value)}
              placeholder="Years of Experience"
            />

            <input
              type="number"
              className="w-full border px-3 py-2 rounded-md"
              value={consultationFee}
              onChange={(e) => setConsultationFee(e.target.value)}
              placeholder="Consultation Fee"
            />

            <input
              className="w-full border px-3 py-2 rounded-md bg-gray-100"
              value={licenseNumber}
              disabled
              placeholder="License Number"
            />

            <button
              onClick={handleEditProfile}
              className="bg-emerald-500 text-white px-6 py-2 rounded-md"
            >
              Save Changes
            </button>

          </div>
        </section>

      </main>
    </div>
  );
}

export default DoctorEditProfile;