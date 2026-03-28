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
    <div className="min-h-screen w-full px-4 sm:px-10 md:px-20 py-10">
      
      {/* HEADER */}
      <div className="text-center mb-12">
        <h1 className="font-semibold text-2xl sm:text-3xl underline mb-4">
          CONTACT US
        </h1>
        <p className="text-gray-600 text-base sm:text-lg">
          Have any questions? We'd love to hear from you. Get in touch with us today.
        </p>
      </div>

      {/* CONTACT INFO */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
        <div className="flex flex-col items-center sm:items-start">
          <div className="flex items-center gap-3 mb-3">
            <MdEmail className="w-6 h-6 text-blue-600" />
            <h3 className="font-semibold text-gray-900">Email</h3>
          </div>
          <p className="text-gray-600 text-sm sm:text-base">support@swasthya.com</p>
          <p className="text-gray-600 text-sm sm:text-base">info@swasthya.com</p>
        </div>

        <div className="flex flex-col items-center sm:items-start">
          <div className="flex items-center gap-3 mb-3">
            <MdPhone className="w-6 h-6 text-blue-600" />
            <h3 className="font-semibold text-gray-900">Phone</h3>
          </div>
          <p className="text-gray-600 text-sm sm:text-base">+91 (800) 123-4567</p>
          <p className="text-gray-600 text-sm sm:text-base">+91 (800) 987-6543</p>
        </div>

        <div className="flex flex-col items-center sm:items-start">
          <div className="flex items-center gap-3 mb-3">
            <MdLocationOn className="w-6 h-6 text-blue-600" />
            <h3 className="font-semibold text-gray-900">Address</h3>
          </div>
          <p className="text-gray-600 text-sm sm:text-base">123 Medical Plaza</p>
          <p className="text-gray-600 text-sm sm:text-base">New Delhi, India - 110001</p>
        </div>
      </div>

      {/* FORM */}
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Send us a Message</h2>

        {successMessage && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm">
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your email"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-900 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your phone"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-900 mb-1">
                Subject *
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Subject"
              />
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-900 mb-1">
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows="5"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Your message..."
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-700 hover:bg-blue-800 disabled:bg-gray-400 text-white font-semibold py-2 rounded-lg transition"
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Contact