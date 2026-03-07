import React from "react";
import { assets } from "../../../assets/assets_frontend/assets";

function About() {
  return (
    
    <div className="min-h-screen w-full px-4 sm:px-10 md:px-20 py-10">

        <div className="flex flex-col md:flex-row items-center gap-10">

          {/* IMAGE */}
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src={assets.about_image}
              className="w-full max-w-md object-contain"
              alt="About us"
            />
          </div>

          {/* CONTENT */}
          <div className="w-full md:w-1/2">
            <h1 className="font-semibold text-2xl sm:text-3xl text-center underline mb-8">
              ABOUT US
            </h1>

            <div className="flex flex-col gap-4 text-base sm:text-lg text-gray-700">
              <p>
                Welcome to our healthcare platform, your trusted partner in
                connecting with top-notch medical professionals. Our mission is
                to make healthcare accessible and convenient for everyone by
                providing a comprehensive directory of experienced doctors
                across various specialties.
              </p>

              <p>
                Our platform offers an easy-to-use interface where you can
                browse through detailed profiles of doctors, read patient
                reviews, and book appointments online. We are committed to
                ensuring that you find the right healthcare provider that meets
                your needs.
              </p>

              <p>
                Thank you for choosing our platform for your healthcare needs.
                We are dedicated to supporting you on your journey to better
                health and well-being.
              </p>
            </div>
          </div>

        </div>
      </div>
  );
}

export default About;
