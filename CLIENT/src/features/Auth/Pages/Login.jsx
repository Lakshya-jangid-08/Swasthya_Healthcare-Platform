import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../../context/AuthContext'

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { checkAuth } = useAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setLoading(true);
        
        try {
            const req = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, { email, password }, {withCredentials : true});
            if(req.status === 200){
                console.log("Login successful");
                // Refresh auth state immediately
                await checkAuth();
                navigate('/');
            } else {
                console.log("Login failed");
                setError("Login failed");
            } 
        } catch (err) {
            console.error("Login error:", err);
            setError(err.response?.data?.message || "Login failed. Please try again.");
        } finally {
            setLoading(false);
            setEmail("")
            setPassword("")
        }
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-300 to-emerald-100 px-4">
      <form className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8 transition hover:shadow-emerald-200">
          
          <h1 className="text-3xl font-semibold text-gray-700 mb-1">
            Login Account
          </h1>
          <p className="text-sm text-gray-400 mb-6">
            Please login to book appointments
          </p>

          {error && (
            <div className="mb-4 rounded-lg bg-red-100 px-4 py-2 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Username */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="text"
              autoComplete="off"
              value={email}
              onChange={(e)=>{setEmail(e.target.value)}}
              placeholder="Enter your email"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm 
              focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent
              transition"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e)=>{setPassword(e.target.value)}}
              placeholder="Enter your password"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm 
              focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent
              transition"
            />
          </div>

          {/* Button */}
          <button
            className="w-full rounded-lg bg-emerald-500 py-3 text-white font-semibold
            hover:bg-emerald-600 active:scale-[0.98] transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
            onClick={(e)=>{handleSubmit(e)}}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        <h1 className='text-gray-700 pt-1 text-sm'>
            Don't have an account ?
            <Link to={'/signup'} className='text-blue-300 px-1'>signup</Link>
        </h1> 

        </div>
      </form>
    </div>
  )
}

export default Login
