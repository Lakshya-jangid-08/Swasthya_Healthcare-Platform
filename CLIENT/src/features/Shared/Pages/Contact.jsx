import React, { useState } from 'react'
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setSuccessMessage('')
    setErrorMessage('')

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setErrorMessage('Please fill in all required fields')
      setLoading(false)
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setErrorMessage('Please enter a valid email address')
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/api/contact/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setSuccessMessage('Thank you! Your message has been sent successfully.')
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        })
      } else {
        setErrorMessage('Failed to send message. Please try again later.')
      }
    } catch (error) {
      console.error('Error sending message:', error)
      setErrorMessage('An error occurred. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

return (
  <div className="min-h-screen bg-[#eef2f7] flex items-center justify-center px-6">
    
    <div className="w-full max-w-6xl grid md:grid-cols-2 gap-10">
      
      {/* LEFT SECTION */}
      <div className="flex flex-col justify-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Contact Us
        </h1>

        <p className="text-gray-600 mb-6 max-w-md">
          Email, call, or complete the form to learn how we can solve your problem.
        </p>

        <div className="space-y-2 text-gray-700 mb-8">
          <p>info@swasthya.com</p>
          <p>+91 8001234567</p>
          <p className="underline cursor-pointer">Customer Support</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-gray-600">
          <div>
            <h3 className="font-semibold text-gray-800 mb-1">Customer Support</h3>
            <p>We are available 24/7 to help you with your queries.</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-1">Feedback</h3>
            <p>Your feedback helps us improve our services.</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-1">Media</h3>
            <p>For press inquiries, contact our media team.</p>
          </div>
        </div>
      </div>

      {/* RIGHT SECTION (FORM CARD) */}
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md mx-auto">
        
        <h2 className="text-2xl font-semibold text-gray-900 mb-1">
          Get in Touch
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          You can reach us anytime
        </p>

        {successMessage && (
          <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg text-sm">
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="First name"
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <input
              type="text"
              placeholder="Last name"
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Email */}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Your email"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />

          {/* Phone */}
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Phone number"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />

          {/* Subject */}
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            placeholder="Subject"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />

          {/* Message */}
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows="4"
            placeholder="How can we help?"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
          />

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full font-medium transition"
          >
            {loading ? "Sending..." : "Submit"}
          </button>

          <p className="text-xs text-gray-400 text-center">
            By contacting us, you agree to our Terms & Privacy Policy
          </p>
        </form>
      </div>
    </div>
  </div>
)
}

export default Contact