import React, { useEffect, useState } from "react";
import { MdVerified, MdOutlineKeyboardBackspace } from "react-icons/md";
import { IoMdAlert } from "react-icons/io";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { MdOutlineStarBorder } from "react-icons/md";
import { TbCircleDashedPlus, TbCircleDashedMinus } from "react-icons/tb";
import { MdCancel } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { bookAppointmentAPI, getDoctorAPI } from "../../../service/apis";

function PatientBookAppointment() {

  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [expand, setExpand] = useState(false);
  const [dateSlots, setDateSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [description, setDescription] = useState("");

  const fetchDoctorDetails = async () => {
    const res = await getDoctorAPI(id);
    setDoctor(res.data.doctor);
  };

  useEffect(() => {
    fetchDoctorDetails();
    setDateSlots(generateDateSlots());
  }, []);

  const handleBooking = async () => {
    if (!selectedSlot) {
      alert("Select a slot first");
      return;
    }

    await bookAppointmentAPI({
      doctorId: doctor._id,
      appointmentDateTime: selectedSlot.dateTime,
      description
    });

    alert(`Appointment booked with Dr. ${doctor.userId.fullname}`);
    setSelectedSlot(null);
    setDescription("");
  };

  const StarRating = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) stars.push(<FaStar key={i} className="text-yellow-400" />);
      else if (rating >= i - 0.5) stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      else stars.push(<MdOutlineStarBorder key={i} className="text-gray-400" />);
    }
    return <div className="flex gap-1">{stars}</div>;
  };

  const generateDateSlots = () => {
    const slots = [];
    const now = new Date();

    const START_HOUR = 10;
    const SLOT_GAP = 60;

    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(now.getDate() + i);
      date.setHours(0, 0, 0, 0);

      let time = new Date(date);
      time.setHours(START_HOUR, 0, 0, 0);

      const dailySlots = [];

      for (let j = 0; j < 10; j++) {
        const slotTime = new Date(time);

        dailySlots.push({
          time: slotTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          dateTime: slotTime,
          isPast: slotTime < now,
        });

        time.setMinutes(time.getMinutes() + SLOT_GAP);
      }

      slots.push({ date, slots: dailySlots });
    }

    return slots;
  };

  if (!doctor) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100">

      {/* BACK BUTTON */}
      <div className="px-6 pt-4">
        <MdOutlineKeyboardBackspace
          className="text-2xl cursor-pointer"
          onClick={() => window.history.back()}
        />
      </div>

      {/* COVER */}
      <div className="relative w-full h-56 bg-gray-800">

        {/* PROFILE IMAGE */}
        <img
          src={doctor.userId.profileImage}
          className="absolute -bottom-20 left-20 w-48 h-48 rounded-full border-4 border-white object-cover shadow-lg"
        />
        
      </div>
      {/* CONTENT */}
      <div className="px-4 sm:px-10 md:px-20 mt-24">

        <div className="flex gap-10">

          <div className="w-40"></div>

          {/* DOCTOR INFO */}
          <div className="flex-1">

            <div className="flex items-center gap-2 text-3xl">
              <h1 className="font-semibold">{doctor.userId.fullname}</h1>

              {doctor.isVerified
                ? <MdVerified className="text-blue-600"/>
                : <IoMdAlert className="text-orange-500"/>}
            </div>

            <div className="flex gap-2 mt-2 text-gray-700 font-medium">
              <span>{doctor.degree}</span>
              <span>•</span>
              <span>{doctor.specialization}</span>
              <span>•</span>
              <span>{doctor.yearsOfExperience} yrs experience</span>
            </div>

            {/* DETAILS */}
            <div className="mt-6 space-y-2">

              <p>
                <span className="font-semibold">Clinic:</span>{" "}
                {doctor.clinicAddress}
              </p>

              <p>
                <span className="font-semibold">Contact:</span>{" "}
                {doctor.userId.contactNumber}
              </p>

              <p>
                <span className="font-semibold">Consultation Fee:</span> ₹
                {doctor.consultationFee}
              </p>

              <p>
                <span className="font-semibold">Patients handled:</span>{" "}
                {doctor.patientsHandle}
              </p>
              <p>
                <span className="font-semibold"></span>{" "}
                {doctor.status == "active" ? <h1 className="text-green-500 font-semibold">ACTIVE</h1> : <h1 className="text-red-400 font-semibold">INACTIVE</h1>}
              </p>
            </div>

            {/* RATING */}
            <div className="flex items-center gap-2 mt-3">
              {StarRating(4.6)}
              <span className="text-gray-600">(4.6)</span>
              <span className="text-gray-500">• 450 patients</span>
            </div>
              {/* ACTION BUTTONS */}
            <div className="flex gap-3 mt-4">

              <button className="px-4 py-2 rounded-lg border border-emerald-200 text-emerald-600 font-medium hover:bg-emerald-500 hover:text-white">
                Follow
              </button>

              <Link to={`/patient/inbox/${id}`} className="px-4 py-2 rounded-lg border border-sky-400 text-sky-700 font-medium hover:bg-sky-500 hover:text-white">
                Message
              </Link>

            </div>

          </div>
        </div>
        {
          doctor.status == "active" && 
          <>
            {/* APPOINTMENT SECTION */}
            <div className="mt-16 border rounded-xl shadow p-6 bg-white">

              <div
                className="flex justify-between items-center text-lg font-semibold cursor-pointer"
                onClick={() => setExpand(!expand)}
              >
                Book Appointment
                {expand ? <TbCircleDashedMinus size={24}/> : <TbCircleDashedPlus size={24}/>}
              </div>

              {expand && (
                <div className="mt-6">

                  {dateSlots.map((day, index) => (
                    <div key={index} className="mb-5">

                      <h3 className="font-semibold mb-2">
                        {day.date.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </h3>

                      <div className="flex flex-wrap gap-2">
                        {day.slots.map((slot, idx) => (
                          <button
                            key={idx}
                            disabled={slot.isPast}
                            onClick={() => setSelectedSlot(slot)}
                            className={`px-3 py-2 rounded border text-sm transition
                              ${
                                slot.isPast
                                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                  : selectedSlot?.dateTime?.getTime() === slot.dateTime.getTime()
                                  ? "bg-blue-600 text-white"
                                  : "hover:bg-blue-500 hover:text-white"
                              }
                            `}
                          >
                            {slot.time}
                          </button>
                        ))}
                      </div>

                    </div>
                  ))}

                </div>
              )}

            </div>

            {/* SELECTED SLOT */}
            {selectedSlot && (
              <div className="relative mt-6 p-4 border rounded-lg bg-green-50">

                <div>
                  Selected Appointment:
                  <span className="font-semibold ml-2">
                    {selectedSlot.dateTime.toLocaleDateString()} at {selectedSlot.time}
                  </span>
                </div>

                <input
                  type="text"
                  placeholder="Describe your issue"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-3 w-full border px-3 py-2 rounded"
                />

                <MdCancel
                  className="absolute top-2 right-2 cursor-pointer"
                  size={24}
                  onClick={() => setSelectedSlot(null)}
                />

              </div>
            )}

            <div className="flex justify-end mt-6">
              <button
                className="bg-blue-600 px-6 py-2 rounded-lg text-white font-semibold"
                onClick={handleBooking}
              >
                Book Appointment
              </button>
            </div>
          </>
        }

      </div>

    </div>
  );
}

export default PatientBookAppointment;