import React, { useEffect, useState } from "react";
import { assets } from "../../../assets/assets_frontend/assets";
import { cancelAppointmentAPI } from "../../../service/apis";
import { useNavigate } from "react-router-dom";

function AppointmentCard({ appointment }) {
  
  const [isActive, setIsActive] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const navigate = useNavigate();

  const handleCancelAppointment = async() => {
    const response = await cancelAppointmentAPI(appointment._id);
    alert("Appointment cancelled successfully");
    setIsCancelled(true);
  }

  useEffect(() => {
    if(appointment.status === "CANCELLED") {
      setIsCancelled(true);
    }
  }, [appointment.status, appointment]);

  return (
    <div className="w-full border-t-2 py-4 flex flex-col gap-4 md:flex-row md:justify-between">
      {/* Left Section */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        {
          appointment.doctorId?.userId?.profileImage ? (
            <img
              src={appointment.doctorId.userId.profileImage}
              className="object-contain h-28 w-28  bg-blue-50 rounded-full"
            />
          ) : (
            <div className="h-28 w-28 rounded-full bg-gray-200 flex items-center justify-center text-3xl text-gray-500">
              {appointment.doctorId?.userId?.fullname?.charAt(4)}
            </div>
          )
        }

        <div className="pl-0 sm:pl-2">
          <h1 className="font-semibold text-lg cursor-pointer"onClick={()=>navigate(`/book-appointment/${appointment.doctorId._id}`) } >{appointment.doctorId?.userId?.fullname}</h1>
          <h5 className="text-gray-600">{appointment.doctorId?.specialization}</h5>
          <h5 className="text-gray-600">
            <span className="text-gray-700 font-semibold pr-2">Address</span>
            {appointment.doctorId?.clinicAddress}
          </h5>
          <h5>
            <span className="text-gray-700 font-semibold pr-2">
              Date & time
            </span>
            {new Date(appointment.appointmentDateTime).toLocaleDateString()} | {new Date(appointment.appointmentDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </h5>
        </div>
      </div>

      {/* Right Section (Actions) */}
      <div className="flex flex-col justify-end gap-2 w-full md:w-auto">
        {isCancelled ? (
          <div
            className="w-full md:w-48 text-center border-2 border-red-600 px-3 py-2 cursor-pointer text-red-600"
            onClick={() => setIsCancelled(true)}
          >
            Appointment cancelled
          </div>
        ) : (
          <>
            {/* Razorpay */}
            <div
              className={`w-full md:w-48 flex justify-center items-center border-2 border-slate-600 px-3 py-2 cursor-pointer
            ${isActive ? "block" : "hidden"}`}
            >
              <img src={assets.razorpay_logo} className="h-6 object-contain" />
            </div>

            {/* Stripe */}
            <div
              className={`w-full md:w-48 flex justify-center items-center border-2 border-slate-600 px-3 py-2 cursor-pointer
            ${isActive ? "block" : "hidden"}`}
            >
              <img src={assets.stripe_logo} className="h-6 object-contain" />
            </div>

            {/* Pay Online */}
            <div
              className={`w-full md:w-48 text-center border-2 border-slate-600 px-3 py-2 cursor-pointer
            hover:bg-emerald-600 hover:text-white
            ${isActive ? "hidden" : ""}`}
              onClick={() => setIsActive(true)}
            >
              Pay Online
            </div>

            {/* Back / Cancel */}
            {isActive ? (
              <div
                className="w-full md:w-48 text-center border-2 border-slate-600 px-3 py-2 cursor-pointer
            hover:bg-gray-600 hover:text-white"
                onClick={() => setIsActive(false)}
              >
                Back
              </div>
            ) : (
              <div
                className="w-full md:w-48 text-center border-2 border-slate-600 px-3 py-2 cursor-pointer
            hover:bg-red-600 hover:text-white"
                onClick={handleCancelAppointment}
              >
                Cancel Appointment
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default AppointmentCard;
