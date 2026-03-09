import React from 'react'
import ChatHeader from '../Components/ChatHeader'
import ChatCard from '../Components/ChatCard'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext';

function PatientChat() {
    const {id} = useParams();
    const {user} = useAuth();
    
  return (
    <div className='min-h-screen w-full flex'>
      <div className='w-1/4 border-r-2 border-black'>
        {/* <ChatHeader ReceiverId = {id}/> */}
        {/* ChatPeople */}
      </div>
      <div className='flex flex-col flex-1 h-screen bg-blue-300'>
        <ChatCard SenderId = {user._id} ReceiverId = {id} />
      </div>
      {/* msgBox */}
      
    </div>
  )
}

export default PatientChat