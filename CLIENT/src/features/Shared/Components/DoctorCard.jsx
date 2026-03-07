import React from "react";
import { MdVerified } from "react-icons/md";
import { IoMdAlert } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function DoctorCard({ doctor }) {
  const navigate = useNavigate();

  return (
    <div className="border border-gray-300 rounded-xl p-4 flex flex-col items-center gap-4 hover:shadow-lg transition">
      
      {doctor.userId?.image ? (
        <img
          src={doctor.userId.image}
          alt={doctor.userId.fullname}
          className="h-28 w-28 rounded-full object-cover"
        />
      ) : (
        <div className="h-28 w-28 rounded-full bg-gray-200 flex items-center justify-center text-3xl text-gray-500">
          {doctor.userId?.fullname?.charAt(4)}
        </div>
      )}

      <div className="text-center">
        <h2 className="text-lg font-semibold flex items-center gap-1">
          {doctor.userId?.fullname}
          {doctor.isVerified ? <MdVerified color="blue" /> : <IoMdAlert color="orange" />}
        </h2>
        <p className="text-gray-600 text-sm">{doctor.specialization}</p>
      </div>

      <div className="flex justify-between items-center w-full px-2">
        <p className="font-semibold text-sm">
          Fees: ₹{doctor.consultationFee}
        </p>

        <FaArrowRight
          size={24}
          className="text-white px-3 py-1 cursor-pointer hover:scale-110 transition bg-blue-600 w-10 rounded-lg"
          onClick={() => navigate(`/book-appointment/${doctor._id}`)}
        />
      </div>
    </div>
  );
}

export default DoctorCard;
