import React from 'react'
import { NavLink, useLocation } from "react-router-dom";

function ProfileSidebar({ role }) {

  const location = useLocation();   // ← YOU MISSED THIS

  const linkClass = (isActive) =>
    `block px-4 py-3 border-l-4 transition ${
      isActive
        ? "border-emerald-500 bg-emerald-50 text-emerald-600"
        : "border-transparent hover:bg-gray-100"
    }`;

  const patientSidebarLinks = [
    { label: "Profile", path: "/patient/profile" },
    { label: "Edit Profile", path: "/patient/edit-profile" },
    { label: "Appointments", path: "/patient/appointments" },
    { label: "Analytics", path: "/patient/analytics" },
  ];

  const doctorSidebarLinks = [
    { label: "Profile", path: "/doctor/profile", match: ["/doctor/", "/doctor/profile"] },
    { label: "Edit Profile", path: "/doctor/edit-profile" },
    { label: "Payment Status", path: "/doctor/payments-status" },
    { label: "Appointments", path: "/doctor/appointments" },
    { label: "Reviews", path: "/doctor/reviews" },
  ];

  const links = role === "doctor" ? doctorSidebarLinks : patientSidebarLinks;

  return (
    <aside className="w-full md:w-64 border-r">
      <div className="py-6">

        {role === "patient" && (
          <NavLink to="/" className={({isActive}) => linkClass(isActive)}>
            ← Back to Home
          </NavLink>
        )}

        {links.map(({ label, path, match }) => {

          const isActive = match
            ? match.includes(location.pathname)
            : location.pathname === path;

          return (
            <NavLink key={path} to={path} className={() => linkClass(isActive)}>
              {label}
            </NavLink>
          );
        })}

      </div>
    </aside>
  );
}

export default ProfileSidebar;