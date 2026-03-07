import React from 'react'
import { useAuth } from '../../../context/AuthContext'
import ProfileSidebar from '../Components/ProfileSlidebar'

function PatientAnalytics() {

  const {user} = useAuth()

  return (
    <div className='w-full min-h-screen flex'>
      <ProfileSidebar role={user?.role}/>
      <div className='flex-1 p-8 flex flex-col gap-6'>
        <h1 className='text-lg font-semibold text-gray-500 underline'>Analytics Page</h1>
        <div  className='flex gap-4 flex-col'>
          <div>
            <h1>Title</h1>
            <input type="text" placeholder='Title' className='border-2 outline-none border-gray-600 px-2 py-1 rounded-md'/>
          </div>
          <div>
            <h1>Upload your report</h1>
            <input type="file" className='border-2 outline-none px-2 py-1 rounded-md'/>
          </div>
          <button className='bg-blue-500 rounded-lg w-fit px-4 py-2 text-white font-semibold'>Submit Report</button>
        </div>
      </div>
    </div>
  )
}

export default PatientAnalytics