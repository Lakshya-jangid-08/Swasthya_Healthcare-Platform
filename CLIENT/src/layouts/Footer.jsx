import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300 px-4 sm:px-10 md:px-20 py-10 mt-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

        {/* BRAND */}
        <div>
          <h2 className="text-white text-xl font-semibold mb-3">
            Your Health, Our Priority
          </h2>
          <p className="text-sm leading-relaxed">
            We connect you with trusted and verified doctors across multiple
            specialties. Book appointments easily and take control of your
            healthcare journey.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">Find Doctors</li>
            <li className="hover:text-white cursor-pointer">About Us</li>
            <li className="hover:text-white cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* SERVICES */}
        <div>
          <h3 className="text-white font-semibold mb-3">Services</h3>
          <ul className="space-y-2 text-sm">
            <li>Online Consultation</li>
            <li>Appointment Booking</li>
            <li>Verified Specialists</li>
            <li>Patient Reviews</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-white font-semibold mb-3">Contact Us</h3>
          <ul className="space-y-2 text-sm">
            <li>📍 India</li>
            <li>📞 +91 98765 43210</li>
            <li>✉️ support@healthcare.com</li>
          </ul>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t border-gray-800 mt-8 pt-4 text-center text-sm text-gray-400">
        © 2026 Healthcare Platform. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
