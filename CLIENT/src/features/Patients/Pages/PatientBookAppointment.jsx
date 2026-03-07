import React, { useEffect, useState } from 'react'
import {
  MdOutlineStarBorder,
  MdVerified,
  MdPeopleAlt,
} from "react-icons/md";
import { IoMdAlert } from "react-icons/io";
import { PiCurrencyInrBold } from "react-icons/pi";
import { FaStarHalfAlt, FaStar } from "react-icons/fa";
import { TbCircleDashedPlus, TbCircleDashedMinus } from "react-icons/tb";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { bookAppointmentAPI, getDoctorAPI } from "../../../service/apis";
import { useParams } from "react-router-dom";
import { MdCancel } from "react-icons/md";


function PatientBookAppointment() {

  const {id} = useParams();
  const [doctor, setDoctor] = useState(null);
  const [expand, setExpand] = useState(false);
  const [dateSlots, setDateSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [description, setDescription] = useState("its an checkup, please be on time");


  const handleBooking = async() => {
      if(!selectedSlot) {
        alert("Please select a time slot to book an appointment.");
        return;
      }

      const response = await bookAppointmentAPI({
        doctorId : doctor._id,
        appointmentDateTime : selectedSlot.dateTime,
        description
      })
      console.log(response);
      setSelectedSlot(null);
      setDescription("its an checkup, please be on time");
      alert(`Appointment booked on ${selectedSlot.dateTime.toLocaleString()} with Dr. ${doctor.userId.fullname}`);
  }

  const fetchDoctorDetails = async() => {
    const res = await getDoctorAPI(id);
    console.log(res);
    setDoctor(res.data.doctor);
    console.log("doctor\n", doctor);
  }

  useEffect(() => {
    if(doctor) {
      console.log("doctor updated\n", doctor);
    }
  }, [doctor]); 

  useEffect(() => {
    fetchDoctorDetails();
    setDateSlots(generateDateSlots());
  }, []);

  const StarRating = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) stars.push(<FaStar key={i} className="text-yellow-400" />);
      else if (rating >= i - 0.5)
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      else
        stars.push(
          <MdOutlineStarBorder key={i} className="text-gray-400" />
        );
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
      date.setHours(0, 0, 0, 0); // normalize date

      let time = new Date(date);
      time.setHours(START_HOUR, 0, 0, 0);

      const dailySlots = [];

      for (let j = 0; j < 12; j++) {
        const slotTime = new Date(time);

        dailySlots.push({
          time: slotTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          dateTime : slotTime,
          isPast: slotTime < now, // ⭐ key logic
        });

        time.setMinutes(time.getMinutes() + SLOT_GAP);
      }

      slots.push({
        date,
        slots: dailySlots,
      });
    }

    return slots;
  };



  if (!doctor) {
    return <div className="text-center mt-10">Loading doctor details...</div>;
  }


  return (

      <div className="min-h-screen w-full px-4 sm:px-10 md:px-20 py-6">
        <div><MdOutlineKeyboardBackspace className="text-2xl cursor-pointer mb-2" onClick={() => window.history.back()} /></div>
        {/* DOCTOR CARD */}
        <div className="flex flex-col md:flex-row gap-6 border rounded-xl shadow-xl p-5">

          {/* IMAGE */}
          {doctor.userId?.image ? (
            <img
              src={doctor.userId.image}
              alt={doctor.userId.fullname}
              className="h-28 w-28 rounded-full"
            />
          ) : (
            <div className="h-28 w-28 rounded-full bg-gray-200 flex items-center justify-center">
              {doctor.userId?.fullname?.charAt(4)}
            </div>
          )}

          {/* INFO */}
          <div className="flex-1 space-y-2">
            <h1 className="text-xl sm:text-2xl font-semibold flex items-center gap-2">
              {doctor.userId.fullname}
              {doctor?.isVerified ? (
                <MdVerified className="text-blue-600" />
              ) : (
                <IoMdAlert className="text-orange-500" />
              )}
            </h1>

            <p className="text-gray-700">
              {/* {doctor?.degree} */} MBBS
               • {doctor?.specialization} •{" "}
              {doctor?.yearsOfExperience} yrs experience
            </p>

            <div className="border my-3"></div>

            <p>
              <span className="font-semibold">Clinic:</span>{" "}
              {doctor?.clinicAddress}
            </p>

            <p>
              <span className="font-semibold">Contact:</span>{" "}
              {doctor.userId.contactNumber}
            </p>

            <p>
              <span className="font-semibold">License:</span>{" "}
              {doctor?.licenseNumber}
            </p>

            <p className="flex items-center gap-1">
              <span className="font-semibold">Fee:</span>{" "}
              {doctor?.consultationFee} <PiCurrencyInrBold />
            </p>

            <p>
              <span className="font-semibold">Status:</span>{" "}
              <span className="bg-emerald-300 px-2 rounded-full">
                {doctor?.status}
              </span>
            </p>

            <p>Patients handled: {doctor?.patientsHandle}</p>

            <div className="flex items-center gap-2">
              {StarRating(4.6)}
              <span>({4.6})</span>
              <MdPeopleAlt />
              {450} Patients
            </div>
          </div>
        </div>

        {/* APPOINTMENT SECTION */}
        <div className="mt-10 border rounded-xl shadow-xl p-4">
          <div
            className="flex justify-between items-center text-lg font-semibold cursor-pointer"
            onClick={() => setExpand(!expand)}
          >
            Book Appointment
            {expand ? (
              <TbCircleDashedMinus size={24} />
            ) : (
              <TbCircleDashedPlus size={24} />
            )}
          </div>

          {expand && (
            <>
              <div className="border my-4"></div>

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
                          onClick={() => setSelectedSlot(slot)}
                          disabled={slot.isPast}
                          className={`px-3 py-2 rounded border text-sm transition
                            ${
                              slot.isPast
                                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                : selectedSlot?.dateTime?.getTime() === slot.dateTime.getTime()
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white hover:bg-blue-400 hover:text-white"
                            }
                          `}
                        >
                        {slot.time}
                      </button>
                    ))}

                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {
          selectedSlot && (
            <div className="relative mt-6 p-4 border rounded-lg bg-green-50 text-green-800">
              <div>
                Selected Appointment:{" "}
                <span className="font-semibold">  
                  {selectedSlot.dateTime.toLocaleDateString()} at {selectedSlot.time}
                </span>
              </div>
              <div className="flex gap-2 items-center mt-2">
                <label className="text-black text-lg">Tell Us Reason ?</label>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="w-1/2 outline-none border rounded-lg border-black placeholder:text-gray-700 text-black px-2 py-2" placeholder="Write Description" />
              </div>
              <MdCancel color="red" className="absolute top-2 right-2 text-right cursor-pointer" size={25} onClick={()=>setSelectedSlot(null)}/>
            </div>
          )
        }
        {/* FINAL BUTTON */}
        <div className="flex justify-center md:justify-end mt-6">
          <button className="bg-blue-500 px-6 py-2 rounded-lg text-white font-semibold" onClick={handleBooking}>
            Book Appointment
          </button>
        </div>
      </div>
  );
}


export default PatientBookAppointment