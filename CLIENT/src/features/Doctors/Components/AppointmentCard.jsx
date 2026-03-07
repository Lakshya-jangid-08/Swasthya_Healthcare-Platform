import React from "react";

function AppointmentCard({ appointment }) {

  const patient = appointment.patientId?.userId;

  return (
    <div className="w-full border-t-2 py-4 flex flex-col gap-4 md:flex-row md:justify-between">

      {/* Left Section */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">

        {patient?.profileImage ? (
          <img
            src={patient.profileImage}
            className="object-contain w-full sm:w-40 bg-blue-50 rounded"
          />
        ) : (
          <div className="h-28 w-28 rounded-full bg-gray-200 flex items-center justify-center text-3xl text-gray-500">
            {patient?.fullname?.charAt(0)}
          </div>
        )}

        <div className="pl-0 sm:pl-2">
          <h1 className="font-semibold text-lg">
            {patient?.fullname}
          </h1>

          <h5 className="text-gray-600">
            Age: {appointment.patientId?.age} | {appointment.patientId?.gender}
          </h5>

          <h5 className="text-gray-600">
            {appointment.description}
          </h5>

          <h5>
            <span className="text-gray-700 font-semibold pr-2">
              Date & time
            </span>
            {new Date(appointment.appointmentDateTime).toLocaleDateString()} |{" "}
            {new Date(appointment.appointmentDateTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </h5>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-col justify-end gap-2 w-full md:w-auto">

        {appointment.status === "PENDING" && (
          <>
            <button className="w-full md:w-48 border-2 border-green-600 px-3 py-2 text-green-600 hover:bg-green-600 hover:text-white">
              Accept
            </button>

            <button className="w-full md:w-48 border-2 border-red-600 px-3 py-2 text-red-600 hover:bg-red-600 hover:text-white">
              Reject 
            </button>
          </>
        )}

        {appointment.status === "CONFIRMED" && (
          <div className="w-full md:w-48 text-center border-2 border-green-600 px-3 py-2 text-green-600">
            Confirmed
          </div>
        )}

        {appointment.status === "CANCELLED" && (
          <div className="w-full md:w-48 text-center border-2 border-red-600 px-3 py-2 text-red-600">
            Cancelled
          </div>
        )}

      </div>
    </div>
  );
}

export default AppointmentCard;