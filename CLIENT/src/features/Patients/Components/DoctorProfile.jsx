import React from "react";
import { MdVerified } from "react-icons/md";
import { IoMdAlert } from "react-icons/io";
import { Link } from "react-router-dom";

function DoctorProfile({ doctor }) {
  return (
    <>
      {/* COVER */}
      <div className="relative w-full h-56 bg-gradient-to-r from-blue-600 to-indigo-600">

        <img
          src={doctor.userId.profileImage}
          className="absolute -bottom-20 left-10 sm:left-20 w-36 h-36 sm:w-48 sm:h-48 rounded-full border-4 border-white object-cover shadow-xl ring-4 ring-blue-100"
        />
      </div>

      {/* CONTENT */}
      <div className="px-4 sm:px-10 md:px-20 mt-24">

        <div className="flex flex-col sm:flex-row gap-6">
          <div className="hidden sm:block w-40"></div>

          <div className="flex-1">

            <div className="flex items-center gap-2 text-2xl sm:text-3xl">
              <h1 className="font-semibold">{doctor.userId.fullname}</h1>

              {doctor.isVerified
                ? <MdVerified className="text-blue-600"/>
                : <IoMdAlert className="text-orange-500"/>}
            </div>

            <div className="flex flex-wrap gap-2 mt-2 text-gray-700">
              <span>{doctor.degree}</span>
              <span>•</span>
              <span>{doctor.specialization}</span>
              <span>•</span>
              <span>{doctor.yearsOfExperience} yrs</span>
            </div>

            <div className="mt-4 text-gray-700 space-y-1">
              <p><b>Clinic:</b> {doctor.clinicAddress}</p>
              <p><b>Fee:</b> ₹{doctor.consultationFee}</p>
            </div>

            <div className="mt-4">
              <Link
                to={`/inbox/${doctor.userId._id}`}
                className="px-4 py-2 rounded-lg border border-sky-400 text-sky-700 hover:bg-sky-500 hover:text-white"
              >
                Message
              </Link>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default DoctorProfile;