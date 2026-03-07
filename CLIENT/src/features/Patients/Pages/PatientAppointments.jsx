import React, { useEffect, useState } from 'react'
import { getAppointmentsAPI } from '../../../service/apis';
import { useAuth } from '../../../context/AuthContext';
import ProfileSidebar from '../Components/ProfileSlidebar';
import AppointmentCard from '../Components/AppointmentCard';

function PatientAppointment() {
  
  const [appointments, setAppointments] = useState(null);
  const { user } = useAuth();

  const fetchAppointments = async() => {
    const response = await getAppointmentsAPI();
    setAppointments(response.data.appointmentList);
  }

  useEffect(() => {
    fetchAppointments();
  }, []);
  
  if(!appointments) {
    return <div>Loading...</div>
  }

  return (
    <div className='min-h-screen w-full flex'>
      <div>
        <ProfileSidebar role={user?.role}/>
      </div>
      <div className='flex-1 p-8 gap-8 flex flex-col'>
        <h1 className='text-lg font-semibold text-gray-500 underline'>
          My appointments
        </h1>
        <div className='flex flex-col'>
          {appointments && appointments.map((appointment) => (
            <AppointmentCard key={appointment._id} appointment={appointment} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default PatientAppointment