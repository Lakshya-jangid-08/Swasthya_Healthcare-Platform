import React, { useEffect, useState } from 'react'
import { getUserDataApi } from '../../../service/apis'

function ChatHeader({ReceiverId}) {

  const [receiver, setReceiver] = useState(null)

  useEffect(() => {
    const fetchUser = async()=> {
      const res = await getUserDataApi(ReceiverId);
      setReceiver(res.data.user)
    }
    
    if (ReceiverId) fetchUser(); 
    
  }, [ReceiverId])
  console.log(receiver);
  

  if(!receiver) return <div>loding.....</div>
  return (
    <div className='w-full bg-slate-600 h-16 flex items-center px-5 text-white'>
      <div className='flex items-center gap-2'>
        <img src={receiver.profileImage} className='rounded-full bg-blue h-10 w-10' />
        <div className='flex flex-col'>
          <h1 className='text-2xl font-bold'>
            {receiver.fullname}
          </h1>
          <h1 className='text-gray-300 text-md'>{receiver.contactNumber}</h1>
        </div>

      </div>
    </div>
  )
}

export default ChatHeader