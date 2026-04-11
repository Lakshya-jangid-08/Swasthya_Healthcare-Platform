import React, { useState, useRef, useEffect } from "react";
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
  const dropdownRef = useRef();

  // Close dropdown on outside click ✅
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (loading) return null;

  const renderDropdown = () => {
    if (user?.role === "doctor") {
      return (
        <>
          <Link to="/doctor/profile" className="dropdown-item">
            Profile
          </Link>
          <Link to="/doctor/appointments" className="dropdown-item">
            Appointments
          </Link>
        </>
      );
    }

    if (user?.role === "patient") {
      return (
        <>
          <Link to="/patient/profile" className="dropdown-item">
            Profile
          </Link>
          <Link to="/patient/appointments" className="dropdown-item">
            Appointments
          </Link>
          <Link to="/patient/analytics" className="dropdown-item">
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
        <img src={assets.logo} className="h-12 sm:h-16 cursor-pointer" onClick={() => nav("/")} />

        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-6 font-semibold text-sm text-gray-700">
          {user?.role !== "doctor" && (
            <>
              <Link className="hover:text-blue-600 transition" to="/">HOME</Link>
              <Link className="hover:text-blue-600 transition" to="/doctors">ALL DOCTORS</Link>
            </>
          )}
          <Link className="hover:text-blue-600 transition" to="/about">ABOUT</Link>
          <Link className="hover:text-blue-600 transition" to="/contact">CONTACT</Link>
        </div>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-3 relative" ref={dropdownRef}>
          {user ? (
            <div className="flex items-center gap-2">

              {/* Chat */}
              <button
                onClick={() => nav("/inbox")}
                className="bg-gray-900 hover:bg-black transition p-2 rounded-full"
              >
                <IoChatbubbles size={18} className="text-white" />
              </button>

              {/* Profile */}
              <button
                onClick={() => setOpen(!open)}
                className="bg-blue-600 hover:bg-blue-700 transition p-2 rounded-full"
              >
                <FaUser size={18} className="text-white" />
              </button>

              {/* DROPDOWN */}
              {open && (
                <div className="absolute right-0 top-full mt-3 w-64 bg-white/90 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-2xl z-50 overflow-hidden animate-fadeIn">

                  {/* USER INFO */}
                  <div className="px-4 py-3 border-b bg-gray-50">
                    <p className="text-sm font-semibold text-gray-800">
                      {user?.fullname || "User"}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">
                      {user?.role}
                    </p>
                  </div>

                  {/* MENU */}
                  <div className="py-2 text-sm text-gray-700">
                    {renderDropdown()}
                  </div>

                  {/* LOGOUT */}
                  <div className="border-t">
                    <button
                      onClick={logout}
                      disabled={isLoggingOut}
                      className="w-full flex items-center gap-2 px-4 py-3 text-red-500 hover:bg-red-50 transition"
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
              className="hidden md:block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full transition"
            >
              Create Account
            </Link>
          )}

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <FaBars size={22} />
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden flex flex-col gap-3 py-4 border-t text-gray-700">
          {user?.role !== "doctor" && (
            <>
              <Link to="/">HOME</Link>
              <Link to="/doctors">ALL DOCTORS</Link>
            </>
          )}
          <Link to="/about">ABOUT</Link>
          <Link to="/contact">CONTACT</Link>
        </div>
      )}

      <div className="border-b w-full"></div>

      {/* STYLES */}
      <style>
        {`
          .dropdown-item {
            display: block;
            padding: 10px 16px;
            margin: 0 8px;
            border-radius: 10px;
            transition: 0.2s;
          }

          .dropdown-item:hover {
            background: #f3f4f6;
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(-6px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-fadeIn {
            animation: fadeIn 0.2s ease-out;
          }
        `}
      </style>
    </div>
  );
}

export default Header;