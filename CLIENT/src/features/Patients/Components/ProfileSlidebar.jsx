import React from 'react'
import { NavLink } from "react-router-dom";

function ProfileSidebar({ role }) {
  const linkClass = ({ isActive }) =>
    `block px-4 py-3 border-l-4 transition ${
      isActive
        ? "border-emerald-500 bg-emerald-50 text-emerald-600"
        : "border-transparent hover:bg-gray-100"
    }`;

  const patientSidebarLinks = [
    { label: "Profile", path: "/patient/profile" },
    { label: "Edit Profile", path: "/patient/edit-profile" },
    { label: "Appointments", path: "/patient/appointments" },
    { label: "Wallet Status", path: "/patient/wallet-status" },
    { label: "Analytics", path: "/patient/analytics" },
  ];

  const doctorSidebarLinks = [
    { label: "Profile", path: "/doctor/profile" },
    { label: "Edit Profile", path: "/doctor/edit-profile" },
    { label: "Payment Status", path: "/doctor/payments-status" },
    { label: "Appointments", path: "/doctor/appointments" },
    { label: "Reviews", path: "/doctor/reviews" },
  ];

  const links = role === "doctor" ? doctorSidebarLinks : patientSidebarLinks;

  return (
    <aside className="w-full md:w-64 border-r">
      <div className="py-6">
        {/* Back */}
        {role === "patient" && (
          <NavLink to="/" className={linkClass}>
            ← Back to Home
          </NavLink>
        )}

        {/* Sidebar Links */}
        {links.map(({ label, path }) => (
          <NavLink key={path} to={path} className={linkClass}>
            {label}
          </NavLink>
        ))}
      </div>
    </aside>
  );
}

export default ProfileSidebar;
