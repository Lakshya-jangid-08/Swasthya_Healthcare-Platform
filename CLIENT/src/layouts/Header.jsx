import React, { useState } from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets_frontend/assets";
import { useAuth } from "../context/AuthContext";
import { FaUser, FaBars } from "react-icons/fa";

function Header() {
  const { user, loading, logout, isLoggingOut } = useAuth();
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
        <div className="flex items-center gap-4">

          {user ? (
            <div className="relative">
              <button
                onClick={() => setOpen(!open)}
                className="bg-blue-600 p-2 rounded-full"
              >
                <FaUser size={18} color="white" />
              </button>

              {open && (
                <div className="absolute right-0 mt-3 w-48 bg-white shadow rounded-xl border z-50">

                  {renderDropdown()}

                  <button
                    onClick={logout}
                    disabled={isLoggingOut}
                    className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                  >
                    {isLoggingOut ? "Logging out..." : "Logout"}
                  </button>

                </div>
              )}
            </div>
          ) : (
            <Link
              to="/signup"
              className="hidden md:block bg-blue-500 text-white px-4 py-2 rounded-full"
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