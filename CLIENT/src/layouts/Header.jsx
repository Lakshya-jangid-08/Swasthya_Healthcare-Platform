import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets_frontend/assets";
import { useAuth } from "../context/AuthContext";
import { FaUser, FaBars } from "react-icons/fa";
import { IoChatbubbles } from "react-icons/io5";

function Header() {
  const { user, loading, logout, isLoggingOut } = useAuth();
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const nav = useNavigate();
  if (loading) return null;

  const renderDropdown = () => {
    if (user?.role === "doctor") {
      return (
        <>
          <Link to="/doctor/profile" className="block px-4 py-2 hover:bg-gray-100">
            Profile
          </Link>
          <Link to="/doctor/appointments" className="block px-4 py-2 hover:bg-gray-100">
            Appointments
          </Link>
          <Link to="/doctor/analytics" className="block px-4 py-2 hover:bg-gray-100">
            Analytics
          </Link>
        </>
      );
    }

    if (user?.role === "patient") {
      return (
        <>
          <Link to="/patient/profile" className="block px-4 py-2 hover:bg-gray-100">
            Profile
          </Link>
          <Link to="/patient/appointments" className="block px-4 py-2 hover:bg-gray-100">
            Appointments
          </Link>
          <Link to="/patient/analytics" className="block px-4 py-2 hover:bg-gray-100">
            Analytics
          </Link>
        </>
      );
    }

    return null;
  };

  return (
    <div className="px-4 sm:px-10 md:px-20">
      <div className="flex justify-between items-center py-4">

        {/* LOGO */}
        <img src={assets.logo} className="h-12 sm:h-16" />

        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-6 font-semibold text-sm">
          <Link to="/">HOME</Link>
          <Link to="/doctors">ALL DOCTORS</Link>
          <Link to="/about">ABOUT</Link>
          <Link to="/contact">CONTACT</Link>
        </div>

        {/* RIGHT ACTIONS */}
<div className="flex items-center gap-3">
  {user ? (
    <div className="relative flex items-center gap-2">

      {/* Chat Button */}
      <button
        onClick={() => nav("/inbox")}
        className="bg-black hover:bg-gray-800 transition p-2 rounded-full"
      >
        <IoChatbubbles size={18} className="text-white" />
      </button>

      {/* Profile Button */}
      <button
        onClick={() => setOpen(!open)}
        className="bg-blue-600 hover:bg-blue-700 transition p-2 rounded-full"
      >
        <FaUser size={18} className="text-white" />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white border rounded-xl shadow-lg z-50 overflow-hidden">

          <div className="py-1">
            {renderDropdown()}
          </div>

          <div className="border-t">
            <button
              onClick={logout}
              disabled={isLoggingOut}
              className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50 transition"
            >
              {isLoggingOut ? "Logging out..." : "Logout"}
            </button>
          </div>

        </div>
      )}
    </div>
  ) : (
    <Link
      to="/signup"
      className="hidden md:block bg-blue-500 hover:bg-blue-600 transition text-white px-4 py-2 rounded-full"
    >
      Create Account
    </Link>
  )}

          {/* MOBILE MENU */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <FaBars size={22} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden flex flex-col gap-3 py-4 border-t">
          <Link to="/">HOME</Link>
          <Link to="/doctors">ALL DOCTORS</Link>
          <Link to="/about">ABOUT</Link>
          <Link to="/contact">CONTACT</Link>
        </div>
      )}

      <div className="border-gray-700 border-b w-full"></div>
    </div>
  );
}

export default Header;