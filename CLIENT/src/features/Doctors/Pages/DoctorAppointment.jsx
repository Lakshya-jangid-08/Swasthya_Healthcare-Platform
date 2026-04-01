import React from 'react'
import ProfileSidebar from '../Components/ProfileSlidebar'
import { useAuth } from '../../../context/AuthContext';
import { doctorAppointments } from '../../../service/apis';
import { useState } from 'react';
import { useEffect } from 'react';
import AppointmentCard from '../Components/AppointmentCard';

function DoctorAppointment() {

    const [appointments, setAppointments] = useState(null);
    const { user } = useAuth();
  
    const fetchAppointments = async() => {
      const response = await doctorAppointments();
      setAppointments(response.data.list);
    }
  
    useEffect(() => {
      fetchAppointments();
    }, []);
    
    if(!appointments) {
      return <div>Loading...</div>
    }

  return (
    <div className='w-full min-h-screen flex'>
        <ProfileSidebar role={"doctor"} />
        <div className='flex-1 p-8'>
            <h1 className='underline text-xl text-semibold'>Upcoming Appointments</h1>
            <div className='flex flex-col'>
              {appointments && appointments.map((appointment) => (
                <AppointmentCard key={appointment._id} appointment={appointment} />
              ))}
            </div>
        </div>
    </div>
  )
}

export default DoctorAppointment