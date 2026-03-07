import React, { useState } from 'react'
import PatientSignup from '../Components/PatientSignup';
import DoctorSignup from '../Components/DoctorSignup';

function Signup() {
    const [isPatientLogin, setIsPatientLogin] = useState(true);
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-300 to-emerald-100 px-4">
            <form className="w-full max-w-md">
                <div className="bg-white shadow-2xl">
                    <div className="flex items-center w-full bg-emerald-300 text-white mb-2">
                        <h1
                        className={`${isPatientLogin ? "bg-white text-black" : "bg-emerald-500 text-white"} w-1/2 text-center border-r-2 py-2 text-xl cursor-pointer border-black font-semibold underline`}
                        onClick={() => setIsPatientLogin(true)}
                        >
                        Signup as patient
                        </h1>
                        <h1
                        className={`${!isPatientLogin ? "bg-white text-black" : "bg-emerald-500 text-white"} w-1/2 text-center border-l-2 py-2 text-xl cursor-pointer border-black font-semibold underline`}
                        onClick={() => setIsPatientLogin(false)}
                        >
                        Signup as doctor
                        </h1>
                    </div>

                    { isPatientLogin ? <PatientSignup isPatientLogin={isPatientLogin}/> : <DoctorSignup isPatientLogin={isPatientLogin}/> }
                </div>
            </form>
        </div>
  )
}

export default Signup