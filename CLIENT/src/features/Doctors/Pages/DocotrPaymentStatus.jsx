import React from 'react'
import ProfileSidebar from '../Components/ProfileSlidebar'

function DocotrPaymentStatus() {
  return (
    <div className='w-full min-h-screen flex'>
      <ProfileSidebar role="doctor"/>
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-4 underline">Payments Status</h1>
        <p>View your payment status here.</p>
        <div className='flex gap-5'>
          <div className='w-1/3 bg-blue-600 text-white p-4 rounded-lg mt-6'>
            Last 7 days earnings
            <div className='text-3xl text-center font-bold mt-4'>$0.00 </div><div> relative to last week <span className='text-red-500'>-2.4%</span></div>
          </div>
           <div className='w-1/3 bg-blue-600 text-white p-4 rounded-lg mt-6'>
            Total earnings
            <div className='text-3xl text-center font-bold mt-4'>$200.65</div>
          </div>
        </div>
        <div className='px-2 py-2 mt-20 border-t-2 border-gray-400'>
          <div className='flex items-center justify-between px-7 pr-14 border-b-2 border-gray-400 pb-2 mb-4'>
            <div className='flex gap-4 border-gray-400 pb-2 mb-4 items-center'>
              <div className='bg-slate-600 p-4 rounded-lg w-20 h-20'></div>
              <div className='w-1/2'>
                <h1 className='font-semibold'>Harsh Choduary</h1>
                <div>for appointment at : 12th Jan, 2024</div>
                <div> description : Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem, veritatis. Distinctio explicabo vitae, reprehenderit dolores architecto similique? Unde eveniet velit ea minus. Perferendis est fugit illo debitis. Quisquam, ipsa impedit.</div>
              </div>
            </div>
            <div className='font-bold text-lg text-green-500'>$20.00</div>
          </div>
          <div className='flex items-center justify-between px-7 pr-14 border-b-2 border-gray-400 pb-2 mb-4'>
            <div className='flex gap-4 border-gray-400 pb-2 mb-4 items-center'>
              <div className='bg-slate-600 p-4 rounded-lg w-20 h-20'></div>
              <div className='w-1/2'>
                <h1 className='font-semibold'>Harsh Choduary</h1>
                <div>for appointment at : 12th Jan, 2024</div>
                <div> description : Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem, veritatis. </div>
              </div>
            </div>
            <div className='font-bold text-lg text-green-500'>$20.00</div>
          </div>
          <div className='flex items-center justify-between px-7 pr-14 border-b-2 border-gray-400 pb-2 mb-4'>
            <div className='flex gap-4 border-gray-400 pb-2 mb-4 items-center'>
              <div className='bg-slate-600 p-4 rounded-lg w-20 h-20'></div>
              <div className='w-1/2 min-w-fit'>
                <h1 className='font-semibold'>Harsh Choduary</h1>
                <div>for appointment at : 12th Jan, 2024</div>
                {/* <div> description </div> */}
              </div>
            </div>
            <div className='font-bold text-lg text-green-500'>$20.00</div>
          </div>
          <div className='flex items-center justify-between px-7 pr-14 border-b-2 border-gray-400 pb-2 mb-4'>
            <div className='flex gap-4 border-gray-400 pb-2 mb-4 items-center'>
              <div className='bg-slate-600 p-4 rounded-lg w-20 h-20'></div>
              <div className='w-1/2'>
                <h1 className='font-semibold'>Harsh Choduary</h1>
                <div>for appointment at : 12th Jan, 2024</div>
                <div> description : Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem, veritatis. Distinctio explicabo vitae, reprehenderit dolores architecto similique? Unde eveniet velit ea minus. Perferendis est fugit illo debitis. Quisquam, ipsa impedit.</div>
              </div>
            </div>
            <div className='font-bold text-lg text-green-500'>$20.00</div>
          </div>
          {/* <h2 className='text-xl font-semibold mb-4'>No Payments Available</h2>
          <p>You currently have no payment records to display.</p> */}
        </div>
      </div>
    </div>
  )
}
export default DocotrPaymentStatus