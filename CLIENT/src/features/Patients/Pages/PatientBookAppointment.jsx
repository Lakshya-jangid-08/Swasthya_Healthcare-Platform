import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useParams } from "react-router-dom";
import { getDoctorAPI } from "../../../service/apis";
import DoctorProfile from "../Components/DoctorProfile";
import AppointmentSection from "../Components/AppointmentSection";

function PatientBookAppointment() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);

  const fetchDoctorDetails = async () => {
    const res = await getDoctorAPI(id);
    setDoctor(res.data.doctor);
  };

  useEffect(() => {
    fetchDoctorDetails();
  }, []);

  if (!doctor) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 relative">

      {/* BACK BUTTON */}
      <div className="absolute top-4 left-4 z-10">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 bg-white/80 backdrop-blur-md px-3 py-2 rounded-full shadow-md"
        >
          <MdOutlineKeyboardBackspace size={20} />
        </button>
      </div>

      {/* PROFILE */}
      <DoctorProfile doctor={doctor} />

      {/* BOOKING */}
      {doctor.status === "active" && (
        <AppointmentSection doctor={doctor} />
      )}
    </div>
  );
}

export default PatientBookAppointment;