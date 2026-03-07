import React, { useEffect } from 'react'
import ProfileSidebar from '../Components/ProfileSlidebar';
import { useAuth } from '../../../context/AuthContext';

function DoctorProfile() {

  const {user, loading, getProfile} = useAuth();

  useEffect( () => {
    getProfile();
  }, []);

  useEffect(()=>{
    if(user){
      console.log(user);
    }
  },[user]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className='min-h-screen flex justify-center'>
        <ProfileSidebar role={user?.role}/>
        <div className="flex-1 p-8 flex flex-col gap-6">
        {/* Profile Image Placeholder */}
        <img
          src={user?.profileImage}
          alt="profile"
          className="h-60 w-60 object-cover rounded-lg"
        />

        {/* ================= BASIC INFO ================= */}
        <div className="flex gap-3 flex-col">
          <h1 className="underline text-xl">Basic Information</h1>

          <div>
            <h4 className="flex gap-2">
              <span className="font-semibold w-40">Name</span>
              <span>{user?.fullname}</span>
            </h4>

            <h4 className="flex gap-2">
              <span className="font-semibold w-40">Degree</span>
              <span>{user?.roleData?.degree}</span>
            </h4>

            <h4 className="flex gap-2">
              <span className="font-semibold w-40">Specialization</span>
              <span>{user?.roleData?.specialization}</span>
            </h4>

            <h4 className="flex gap-2">
              <span className="font-semibold w-40">Experience</span>
              <span>{user?.roleData?.yearsOfExperience} years</span>
            </h4>

            <h4 className="flex gap-2">
              <span className="font-semibold w-40">License No</span>
              <span>{user?.roleData?.licenseNumber}</span>
            </h4>

            <h4 className="flex gap-2">
              <span className="font-semibold w-40">Verification</span>
              <span>
                {user?.roleData?.isVerified ? "Verified" : "Not Verified"}
              </span>
            </h4>
          </div>

          {/* ================= CLINIC INFO ================= */}
          <h1 className="underline text-xl">Clinic Information</h1>

          <div>
            <h4 className="flex gap-2">
              <span className="font-semibold w-40">Clinic Address</span>
              <span className="w-1/2">{user?.roleData?.clinicAddress}</span>
            </h4>

            <h4 className="flex gap-2">
              <span className="font-semibold w-40">Consultation Fee</span>
              <span>₹ {user?.roleData?.consultationFee}</span>
            </h4>

            <h4 className="flex gap-2">
              <span className="font-semibold w-40">Status</span>
              <span className="capitalize">
                {user?.roleData?.status}
              </span>
            </h4>
          </div>

          {/* ================= CONTACT INFO ================= */}
          <h1 className="underline text-xl">Contact Information</h1>

          <div>
            <h4 className="flex gap-2">
              <span className="font-semibold w-40">Contact</span>
              <span>{user?.contactNumber}</span>
            </h4>

            <h4 className="flex gap-2">
              <span className="font-semibold w-40">Email</span>
              <span>{user?.email}</span>
            </h4>
          </div>

          {/* ================= STATS ================= */}
          {/* <h1 className="underline text-xl">Statistics</h1>

          <div>
            <h4 className="flex gap-2">
              <span className="font-semibold w-40">Rating</span>
              <span>{user?.roleData?.rating}</span>
            </h4>

            <h4 className="flex gap-2">
              <span className="font-semibold w-40">Total Reviews</span>
              <span>{user?.roleData?.totalReviews}</span>
            </h4>

            <h4 className="flex gap-2">
              <span className="font-semibold w-40">Appointments</span>
              <span>{user?.roleData?.totalAppointments}</span>
            </h4>

            <h4 className="flex gap-2">
              <span className="font-semibold w-40">Patients Handled</span>
              <span>{user?.roleData?.totalPatientsHandled}</span>
            </h4> */}
          {/* </div> */}
        </div>
      </div>
    </div>
  )
}

export default DoctorProfile