import React, { useEffect } from 'react'
import { useAuth } from '../../../context/AuthContext';
import ProfileSidebar from '../Components/ProfileSlidebar';

function PatientProfile() {

  const {user, loading, getProfile} = useAuth();

    useEffect( () => {
      getProfile();
    }, []);
  
    
    if (loading) {
      return <div>Loading...</div>;
    }
  

  return (
   <div className='w-full min-h-screen flex'>
      <div>
        <ProfileSidebar role={user?.role}/>
      </div>
      <div className="flex-1 p-8 flex flex-col gap-6">
        <img
          src={user?.profileImage}
          alt="profile"
          className="h-60 w-60 object-cover rounded-lg"
        />
          <h1 className='underline text-xl'>Basic Information</h1>
          <div>
            <h4 className='flex gap-2'> <span className='font-semibold w-40'>Name</span><span>{user?.fullname}</span></h4>
            <h4 className='flex gap-2'> <span className='font-semibold w-40'>Blood Group</span><span>{user?.roleData?.bloodGroup}</span></h4>
            <h4 className='flex gap-2'> <span className='font-semibold w-40'>Gender</span><span>{user?.roleData?.gender}</span></h4>
            <h4 className='flex gap-2'> <span className='font-semibold w-40'>Age</span><span>{user?.roleData?.age}</span></ h4>
          </div>
          <h1 className='underline text-xl'>Contact Information</h1>
          <div>
            <h4 className='flex gap-2'> <span className='font-semibold w-40'>Adress</span><span>{user?.address}</span></h4>
            <h4 className='flex gap-2'> <span className='font-semibold w-40'>Contact</span><span>{user?.contactNumber}</span></h4>
            <h4 className='flex gap-2'> <span className='font-semibold w-40'>Email</span><span>{user?.email}</span></h4>
          </div>
        </div>

    </div>
  )
}

export default PatientProfile