import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../context/AuthContext';
import { updateProfile } from '../../../service/apis';
import ProfileSidebar from '../Components/ProfileSlidebar';

function PatientEditProfile() {

  const {user, loading, setUser, getProfile} = useAuth();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [profileImage, setProfileImage] = useState(null)

  useEffect( () => {
    getProfile();
  }, []);

  const handleEditProfile = async(e) => {
    e.preventDefault();
    try {      
      const formData = new FormData();

      if (profileImage) {
        formData.append("profileImage", profileImage);
      }

      formData.append("fullname", fullname);
      formData.append("email", email);
      formData.append("contactNumber", contactNumber);
      formData.append("address", address);
      
      await updateProfile(formData);
      
      await getProfile(); 
        alert("Profile updated successfully");
    } catch(error) {
      console.error("Error updating profile:", error);
      alert(error);
    } 
  }

  useEffect(() => {
    if (user) {
      setFullname(user.fullname || "");
      setEmail(user.email || "");
      setContactNumber(user.contactNumber || "");
      setAddress(user.address || "");
      setBloodGroup(user.roleData?.bloodGroup || "");
      setAge(user.roleData?.age || "");
      setGender(user.roleData?.gender || "");
    }
  }, [user]);


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen w-full">
    <ProfileSidebar role={user?.role} />
      <main className="flex-1 px-6 sm:px-10 py-8">
    <section className="max-w-lg">
      <h2 className="text-xl font-semibold underline mb-6">
        Edit Profile
      </h2>

      <div className="space-y-4">
        <input type="file" accept="image/*" className="w-full border px-3 py-2 rounded-md" onChange={(e) => setProfileImage(e.target.files[0])}/>
        <input className="w-full border px-3 py-2 rounded-md" value={fullname} onChange={(e) => setFullname(e.target.value)}  placeholder="Full Name" />
        <input className="w-full border px-3 py-2 rounded-md" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input className="w-full border px-3 py-2 rounded-md" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} placeholder="Phone" />
        <input className="w-full border px-3 py-2 rounded-md" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" />
        <input className="w-full border px-3 py-2 rounded-md" value={bloodGroup} disabled placeholder="Blood Group" />
        <input className="w-full border px-3 py-2 rounded-md" value={age} disabled placeholder="Age" />
        <input className="w-full border px-3 py-2 rounded-md" value={gender} disabled placeholder="Gender" />
        <button className="bg-emerald-500 text-white px-6 py-2 rounded-md"
          onClick={(e)=>{handleEditProfile(e)}}
        >
          Save Changes
        </button>
      </div>
    </section>
      </main>
    </div>
  );
}

export default PatientEditProfile