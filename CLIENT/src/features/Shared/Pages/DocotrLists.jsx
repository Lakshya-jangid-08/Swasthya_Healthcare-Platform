import React from "react";
import { useEffect, useState } from "react";
import DoctorCard from "../components/DoctorCard";
import { useAuth } from "../../../context/AuthContext";

function DoctorsLists() {
  const [filter, setFilter] = useState("");
  const [docLists, setDocLists] = useState([]);

  const {getDoctors, allDoctors} = useAuth();

  useEffect(() => {
    getDoctors();
  }, [])

  useEffect(() => {
    if (allDoctors)
      setDocLists(allDoctors);
  }, [allDoctors]);
  

  const handleFilter = (event) => {
    const value = event.target.value.toLowerCase();
    setFilter(value);

    if (!value) {
      setDocLists(allDoctors); // RESET list
      return;
    }

    const filteredDoctors = allDoctors.filter(
      (doctor) =>
        doctor.userId?.fullname.toLowerCase().includes(value) ||
        doctor.specialization.toLowerCase().includes(value)
    );

    setDocLists(filteredDoctors);
  };


  return (
      <div className="px-4 sm:px-10 md:px-20 mt-7 min-h-screen">

        {/* TOP BAR */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 justify-between items-start sm:items-center">
          <h1 className="text-base sm:text-lg font-semibold">
            Browse through the doctors specialist.
          </h1>

          <input
            placeholder="Search (eg. category, name)"
            value={filter}
            onChange={handleFilter}
            className="border border-gray-400 w-full sm:w-1/2 md:w-1/4 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* DOCTORS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6 px-14">
          { docLists.length > 0 && docLists.map((doctor) => (
            <DoctorCard key={doctor._id} doctor={doctor} />
          ))}
        </div>
      </div>
  );
}

export default DoctorsLists;
