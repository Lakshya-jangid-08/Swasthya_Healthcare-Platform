import React, { useEffect, useState } from "react";
import DoctorCard from "../components/DoctorCard";
import { useAuth } from "../../../context/AuthContext";

function DoctorsLists() {
  const [filter, setFilter] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [price, setPrice] = useState("");
  const [docLists, setDocLists] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  const { getDoctors, allDoctors } = useAuth();

  // Fetch doctors
  useEffect(() => {
    getDoctors();
  }, []);

  // Apply filters
  useEffect(() => {
    if (!allDoctors) return;

    let filtered = allDoctors;

    // SEARCH
    if (filter) {
      filtered = filtered.filter((doctor) => {
        const name = doctor.userId?.fullname?.toLowerCase() || "";
        const spec = doctor.specialization?.toLowerCase() || "";

        return (
          name.includes(filter.toLowerCase()) ||
          spec.includes(filter.toLowerCase())
        );
      });
    }

    // SPECIALIZATION
    if (specialization) {
      filtered = filtered.filter(
        (doctor) =>
          doctor.specialization?.toLowerCase().trim() ===
          specialization.toLowerCase().trim()
      );
    }

    // PRICE
    if (price) {
      filtered = filtered.filter((doctor) => {
        const fee = Number(doctor.consultationFee);
        return price === "low" ? fee < 500 : fee >= 500;
      });
    }

    setDocLists(filtered);
  }, [filter, specialization, price, allDoctors]);

  return (
    <div className="px-4 sm:px-10 md:px-20 mt-7 min-h-screen">

      {/* TOP BAR */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-6">
        <h1 className="text-lg font-semibold">
          Browse through doctors
        </h1>

        <input
          placeholder="Search doctor..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-300 w-full sm:w-1/2 md:w-1/4 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* MOBILE FILTER BUTTON */}
      <button
        onClick={() => setShowFilter(true)}
        className="lg:hidden mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Open Filters
      </button>

      {/* ACTIVE FILTERS */}
      {(filter || specialization || price) && (
        <div className="mb-4 text-sm text-gray-600 flex flex-wrap gap-3">
          {filter && <span>🔍 {filter}</span>}
          {specialization && <span>🩺 {specialization}</span>}
          {price && <span>💰 {price === "low" ? "< ₹500" : "> ₹500"}</span>}
        </div>
      )}

      {/* OVERLAY (Mobile) */}
      {showFilter && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden"
          onClick={() => setShowFilter(false)}
        ></div>
      )}

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* FILTER PANEL */}
        <div
          className={`fixed lg:static top-0 right-0 h-full lg:h-fit w-3/4 sm:w-1/2 lg:w-auto bg-white border border-gray-100 rounded-l-2xl lg:rounded-2xl p-5 shadow-lg lg:shadow-sm z-50 transform transition-transform duration-300
          ${showFilter ? "translate-x-0" : "translate-x-full"} lg:translate-x-0 lg:sticky lg:top-24`}
        >

          {/* CLOSE BUTTON (Mobile) */}
          <div className="flex justify-between items-center mb-4 lg:hidden">
            <h2 className="text-lg font-semibold">Filters</h2>
            <button onClick={() => setShowFilter(false)}>✖</button>
          </div>

          <h2 className="text-lg font-semibold mb-4 hidden lg:block">Filters</h2>

          {/* SPECIALIZATION */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Specialization
            </label>

            <select
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Specializations</option>
              <option value="General Physician">General Physician</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Neurology">Neurology</option>
              <option value="Dermatology">Dermatology</option>
              <option value="Pediatrics">Pediatrics</option>
            </select>
          </div>

          {/* PRICE */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Consultation Fee
            </h3>

            <select
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
            >
              <option value="">All</option>
              <option value="low">Below ₹500</option>
              <option value="high">Above ₹500</option>
            </select>
          </div>

          {/* CLEAR */}
          <button
            onClick={() => {
              setFilter("");
              setSpecialization("");
              setPrice("");
            }}
            className="w-full bg-gray-100 hover:bg-gray-200 text-sm py-2 rounded-lg transition"
          >
            Clear Filters
          </button>
        </div>

        {/* DOCTORS LIST */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {docLists.length > 0 ? (
              docLists.map((doctor) => (
                <DoctorCard key={doctor._id} doctor={doctor} />
              ))
            ) : (
              <p className="text-gray-500">No doctors found</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default DoctorsLists;