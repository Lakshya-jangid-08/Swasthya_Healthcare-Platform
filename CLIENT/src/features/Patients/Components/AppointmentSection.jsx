import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { MdCancel } from "react-icons/md";
import { bookAppointmentAPI } from "../../../service/apis";

function AppointmentSection({ doctor }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [description, setDescription] = useState("");

  const now = new Date();

  // Generate slots for selected day
  const generateSlots = () => {
    const slots = [];
    const START_HOUR = 10;
    const END_HOUR = 20;

    for (let hour = START_HOUR; hour < END_HOUR; hour++) {
      const slotTime = new Date(selectedDate);
      slotTime.setHours(hour, 0, 0, 0);

      slots.push({
        time: slotTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        dateTime: slotTime,
        isPast: slotTime < now,
      });
    }

    return slots;
  };

  const slots = generateSlots();

  const handleBooking = async () => {
    if (!selectedSlot) return alert("Select slot");

    await bookAppointmentAPI({
      doctorId: doctor._id,
      appointmentDateTime: selectedSlot.dateTime,
      description,
    });

    alert("Appointment booked!");
    setSelectedSlot(null);
    setDescription("");
  };

  return (
    <div className="px-4 sm:px-10 md:px-20 mt-10 grid md:grid-cols-2 gap-8">

      {/* CALENDAR */}
      <div className="bg-white p-5 rounded-2xl shadow border border-gray-100">
        <h2 className="font-semibold mb-4">Select Date</h2>

        <Calendar
          value={selectedDate}
          onChange={(date) => {
            setSelectedDate(date);
            setSelectedSlot(null);
          }}
          minDate={new Date()} // disable past dates
          className="rounded-lg border-none"
        />
      </div>

      {/* TIME SLOTS */}
      <div className="bg-white p-5 rounded-2xl shadow border border-gray-100">

        <h2 className="font-semibold mb-4">Available Slots</h2>

        <div className="flex flex-wrap gap-2">
          {slots.map((slot, idx) => (
            <button
              key={idx}
              disabled={slot.isPast}
              onClick={() => !slot.isPast && setSelectedSlot(slot)}
              className={`px-4 py-2 rounded-lg text-sm border transition

                ${
                  slot.isPast
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
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

        {/* SELECTED SLOT */}
        {selectedSlot && (
          <div className="relative mt-6 p-4 bg-green-50 rounded-lg border border-green-200">

            <p className="text-sm">
              Selected:
              <span className="font-semibold ml-2">
                {selectedSlot.dateTime.toLocaleDateString()} at {selectedSlot.time}
              </span>
            </p>

            <input
              type="text"
              placeholder="Describe your issue..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-3 w-full border px-3 py-2 rounded-lg"
            />

            <MdCancel
              className="absolute top-2 right-2 cursor-pointer"
              size={20}
              onClick={() => setSelectedSlot(null)}
            />
          </div>
        )}

        {/* BOOK BUTTON */}
        <button
          onClick={handleBooking}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full font-semibold"
        >
          Book Appointment
        </button>

      </div>
    </div>
  );
}

export default AppointmentSection;