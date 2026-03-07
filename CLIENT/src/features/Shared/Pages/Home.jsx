import React from "react";
import { assets, specialityData } from "..//../../assets/assets_frontend/assets";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
      <div className="w-full min-h-screen">

        {/* HERO SECTION */}
        <div className="px-4 sm:px-10 md:px-20 py-5">
          <div className="bg-blue-700 w-full min-h-[450px] flex flex-col md:flex-row items-center justify-center rounded-xl">

            {/* LEFT */}
            <div className="w-full md:w-1/2 flex flex-col gap-5 py-10 px-5 md:pl-20 text-center md:text-left">
              <h1 className="text-white text-xl sm:text-3xl md:text-4xl xl:text-5xl font-bold">
                Book Appointment <br /> With Trusted Doctors
              </h1>

              <div className="flex flex-col sm:flex-row items-center gap-3 text-white justify-center md:justify-start">
                <img src={assets.group_profiles} className="h-10" />
                <p className="text-sm sm:text-base">
                  Simply browse through our extensive list of trusted doctors,
                  schedule your appointment hassle-free.
                </p>
              </div>

              <button
                onClick={() => navigate("/doctors")}
                className="mx-auto md:mx-0 px-4 py-2 font-semibold bg-white text-gray-600 rounded-full flex items-center w-fit"
              >
                Book Appointment
                <img src={assets.arrow_icon} className="pl-2" />
              </button>
            </div>

            {/* RIGHT IMAGE */}
            <div className="w-full md:w-1/2 h-60 md:h-full">
              <img
                src={assets.header_img}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>

        {/* SPECIALITY */}
        <div className="flex flex-col items-center py-6 px-4">
          <h1 className="text-xl sm:text-2xl font-semibold">
            Find by Speciality
          </h1>
          <p className="text-center text-gray-600 text-sm sm:text-lg">
            Simply browse through our extensive list of trusted doctors
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            {specialityData.map((speci, index) => (
              <div
                key={index}
                className="w-24 flex flex-col items-center hover:scale-105 transition"
              >
                <img src={speci.image} className="h-16 mb-2" />
                <h6 className="text-xs font-semibold text-center">
                  {speci.speciality}
                </h6>
              </div>
            ))}
          </div>
        </div>

        {/* CTA SECTION */}
        <div className="px-4 sm:px-10 md:px-20 mt-16">
          <div className="bg-blue-700 w-full flex flex-col md:flex-row items-center rounded-xl min-h-[350px]">

            <div className="w-full md:w-2/3 px-6 md:pl-20 py-10 text-center md:text-left">
              <h1 className="text-white text-2xl sm:text-4xl font-bold mb-6">
                Book Appointment <br /> With Trusted Doctors
              </h1>
              <button
                onClick={() => navigate("/signup")}
                className="px-6 py-2 bg-white text-gray-600 rounded-full font-semibold"
              >
                Create Account
              </button>
            </div>

            <div className="w-full md:w-1/3 h-60 md:h-full">
              <img
                src={assets.appointment_img}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
  );
}

export default Home;
