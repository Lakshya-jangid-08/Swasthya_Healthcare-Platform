import React from "react";
import { assets } from "../../../assets/assets_frontend/assets";

function About() {
  return (
    <div className="min-h-screen bg-gray-50 px-6 md:px-20 py-16">

      {/* HERO SECTION */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-20">

        {/* LEFT CONTENT */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            We Make Healthcare <span className="text-blue-600">Simple</span>
          </h1>

          <p className="text-gray-600 text-lg mb-4">
            Your trusted platform to connect with top doctors, book appointments, and manage your health journey — all in one place.
          </p>

          <p className="text-gray-600 text-lg">
            We believe healthcare should be accessible, transparent, and effortless for everyone.
          </p>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex justify-center">
          <img
            src={assets.about_image}
            className="w-full max-w-lg rounded-2xl shadow-xl"
            alt="About"
          />
        </div>
      </div>

      {/* INFO SECTION */}
      <div className="max-w-4xl mx-auto text-center mb-20">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6">
          About Our Platform
        </h2>

        <p className="text-gray-600 text-lg mb-4">
          We connect patients with verified doctors across multiple specialties,
          making it easier than ever to find the right healthcare provider.
        </p>

        <p className="text-gray-600 text-lg">
          With our intuitive platform, you can explore doctor profiles, read reviews,
          and book appointments in just a few clicks.
        </p>
      </div>

      {/* FEATURES SECTION */}
      <div className="grid md:grid-cols-3 gap-8">

        {/* CARD 1 */}
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Verified Doctors
          </h3>
          <p className="text-gray-600">
            Access trusted and experienced healthcare professionals across various fields.
          </p>
        </div>

        {/* CARD 2 */}
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Easy Booking
          </h3>
          <p className="text-gray-600">
            Schedule appointments quickly with a seamless and user-friendly interface.
          </p>
        </div>

        {/* CARD 3 */}
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Smart Analytics
          </h3>
          <p className="text-gray-600">
            Track your health insights and appointments with powerful analytics tools.
          </p>
        </div>

      </div>

    </div>
  );
}

export default About;