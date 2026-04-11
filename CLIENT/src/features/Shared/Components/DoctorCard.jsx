import React from "react";
import { MdVerified } from "react-icons/md";
import { IoMdAlert } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function DoctorCard({ doctor }) {
  const navigate = useNavigate();

  return (
    <div className="hover:scale-105 border border-gray-100 hover:shadow-2xl shadow-lg rounded-xl p-4 flex flex-col items-center gap-4  transition">
      
      {doctor.userId?.profileImage ? (
        <img
          src={doctor.userId.profileImage}
          alt={doctor.userId.fullname}
          className="h-28 w-28 rounded-full object-cover ring-4 ring-black shadow-md"
        />
      ) : (
        <div className="h-28 w-28 rounded-full bg-gray-200 flex items-center justify-center text-3xl text-gray-500 ring-4 ring-gray-100 shadow-md">
          {doctor.userId?.fullname?.charAt(0)}
        </div>
      )}

      <div className="text-center">
        <h2 className="text-lg font-semibold flex items-center gap-1">
          {doctor.userId?.fullname}
          {doctor.isVerified ? <MdVerified color="blue" /> : <IoMdAlert color="orange" />}
        </h2>
        <p className="text-gray-600 text-sm">{doctor.specialization}</p>
      </div>

      <div className="flex flex-col justify-between items-center w-full px-2 gap-2">
        <p className="font-semibold text-sm">
          ₹{doctor.consultationFee} / consultation
        </p>
        <div
          onClick={() => navigate(`/book-appointment/${doctor._id}`)}
          className="
            relative overflow-hidden flex items-center justify-center gap-2 
            px-4 py-2 rounded-lg 
            text-white cursor-pointer 
            bg-blue-600
            transition-all duration-300
            group
            whitespace-nowrap
          "
        >
          <span className="relative z-10 flex items-center gap-2">
            Book Appointment
            <FaArrowRight size={18} />
          </span>

          {/* HOVER OVERLAY */}
          <span className="
            absolute inset-0 
            bg-gradient-to-r from-blue-500 to-blue-700 
            translate-x-[-100%] 
            group-hover:translate-x-0 
            transition-transform duration-300
          "></span>
        </div>
      </div>
    </div>
  );
}

export default DoctorCard;
