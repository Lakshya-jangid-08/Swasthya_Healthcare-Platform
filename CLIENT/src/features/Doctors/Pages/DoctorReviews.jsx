import React from 'react'
import ProfileSidebar from '../Components/ProfileSlidebar'

function DoctorReviews() {
  return (
    <div className='w-full min-h-screen flex'>
        <ProfileSidebar role="doctor"/>
        <div className='flex-1 p-8'>
            <h1 className='text-2xl font-bold mb-4 underline'>See Reviews</h1>
            <p>View reviews from your patients here.</p>
            <div>
                <div className='w-fit px-10 py-10 rounded-xl border-2 my-10 '>
                    <h1>See Over all rating</h1>
                    <h1 className='text-3xl text-yellow-500'>4.6</h1>
                </div>
                <div>
                    <div>
                        <h2 className='text-xl font-semibold mb-4'>Ratings Breakdown</h2>
                        <div className='flex flex-col gap-2 mb-10'>
                            <div className='flex items-center gap-4'>
                                <span>5 stars</span>
                                <div className='w-64 bg-gray-200 rounded-full h-4'>
                                    <div className='bg-yellow-300 h-4 rounded-full' style={{width: '80%'}}></div>
                                </div>
                                <span>80%</span>
                            </div>

                            <div className='flex items-center gap-4'>
                                <span>4 stars</span>
                                <div className='w-64 bg-gray-200 rounded-full h-4'>
                                    <div className='bg-yellow-300 h-4 rounded-full' style={{width: '10%'}}></div>
                                </div>
                                <span>10%</span>
                            </div>
                            <div className='flex items-center gap-4'>
                                <span>3 stars</span>
                                <div className='w-64 bg-gray-200 rounded-full h-4'>
                                    <div className='bg-yellow-300 h-4 rounded-full' style={{width: '5%'}}></div>
                                </div>
                                <span>5%</span>
                            </div>
                            <div className='flex items-center gap-4'>
                                <span>2 stars</span>
                                <div className='w-64 bg-gray-200 rounded-full h-4'>
                                    <div className='bg-yellow-300 h-4 rounded-full' style={{width: '3%'}}></div>
                                </div>

                                <span>3%</span>
                            </div>
                            <div className='flex items-center gap-4'>
                                <span>1 star</span>
                                <div className='w-64 bg-gray-200 rounded-full h-4'>
                                    <div className='bg-yellow-300 h-4 rounded-full' style={{width: '2%'}}></div>
                                </div>
                                <span>2%</span>
                            </div>
                        </div>

                    </div>
                    <h2 className='text-xl font-semibold mb-4'>Patient Reviews</h2>


                    <div className='flex flex-col gap-6'>
                        <div className='border-2 p-4 rounded-lg'>
                            <h3 className='font-semibold'>John Doe</h3>
                            <p>⭐⭐⭐⭐⭐</p>
                            <p>Great experience! The doctor was very attentive and knowledgeable.</p>
                        </div>
                        <div className='border-2 p-4 rounded-lg'>
                            <h3 className='font-semibold'>Jane Smith</h3>
                            <p>⭐⭐⭐⭐</p>
                            <p>Good service, but the wait time was a bit long.</p>
                        </div>
                        <div className='border-2 p-4 rounded-lg'>
                            <h3 className='font-semibold'>Alice Johnson</h3>
                            <p>⭐⭐⭐⭐⭐</p>
                            <p>Excellent care and friendly staff. Highly recommend!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DoctorReviews