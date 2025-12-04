'use client'

import { useState } from 'react'

export default function ContactClient() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    budget: '',
    message: ''
  })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      })
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    if (!formData.service) newErrors.service = 'Please select a service'
    if (!formData.message.trim()) newErrors.message = 'Message is required'
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitError('')

    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setLoading(true)

    try {
      const response = await fetch('https://formspree.io/f/xknlkbew', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitted(true)
        setFormData({
          name: '',
          email: '',
          company: '',
          service: '',
          budget: '',
          message: ''
        })
      } else {
        setSubmitError('Something went wrong. Please try again.')
      }
    } catch (error) {
      setSubmitError('Failed to send message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Header */}
      <div className="relative min-h-[60vh] flex flex-col justify-center px-8 md:px-16 pt-32 pb-20 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-charcoal/40 via-black/60 to-black"></div>

        {/* Content */}
        <div className="relative z-10 max-w-[1400px] w-full mx-auto">
          <h1 className="font-serif text-[clamp(3rem,7vw,5rem)] leading-[1.1] text-white mb-6">Contact</h1>
          <p className="text-lg md:text-xl font-normal text-gray max-w-[650px] leading-relaxed">Ready to bring your vision to life?</p>
        </div>
      </div>

      {/* Contact Section */}
      <section className="py-24 px-8 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-[1400px] mx-auto">
          <div className="space-y-8">
            <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] leading-[1.1] text-white">Let&apos;s work together</h2>
            <p className="text-lg text-gray leading-relaxed">Whether you&apos;re launching a new brand, refreshing an existing one, or need cannabis packaging that stands out on the shelf, we&apos;re here to help.</p>

            <div className="space-y-2 pt-8">
              <h3 className="text-sm font-semibold tracking-[0.2em] uppercase text-light-gray">Email</h3>
              <a href="mailto:hello@tdstudiosny.com" className="text-lg text-white hover:text-purple transition-colors duration-300">hello@tdstudiosny.com</a>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold tracking-[0.2em] uppercase text-light-gray">Follow</h3>
              <div className="flex gap-4">
                <a href="https://instagram.com/tdstudiosny" target="_blank" rel="noopener noreferrer" className="text-lg text-white hover:text-pink transition-colors duration-300">Instagram</a>
                <a href="https://linkedin.com/company/tdstudiosny" target="_blank" rel="noopener noreferrer" className="text-lg text-white hover:text-purple transition-colors duration-300">LinkedIn</a>
              </div>
            </div>
          </div>

          <form className="space-y-6 bg-charcoal/30 backdrop-blur-sm p-8 md:p-10 border border-charcoal rounded-sm" onSubmit={handleSubmit}>
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <h3 className="font-serif text-3xl text-white">Thank you!</h3>
                <p className="text-lg text-gray">Your message has been sent. We&apos;ll be in touch soon.</p>
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  <label className="block text-sm font-medium tracking-wider uppercase text-light-gray" htmlFor="name">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-black/40 border ${errors.name ? 'border-red-500' : 'border-charcoal'} text-white placeholder-gray focus:border-purple focus:outline-none transition-colors duration-300`}
                  />
                  {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium tracking-wider uppercase text-light-gray" htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-black/40 border ${errors.email ? 'border-red-500' : 'border-charcoal'} text-white placeholder-gray focus:border-purple focus:outline-none transition-colors duration-300`}
                  />
                  {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium tracking-wider uppercase text-light-gray" htmlFor="company">Company</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black/40 border border-charcoal text-white placeholder-gray focus:border-purple focus:outline-none transition-colors duration-300"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium tracking-wider uppercase text-light-gray" htmlFor="service">Service *</label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-black/40 border ${errors.service ? 'border-red-500' : 'border-charcoal'} text-white placeholder-gray focus:border-purple focus:outline-none transition-colors duration-300 appearance-none cursor-pointer`}
                  >
                    <option value="">Select a service</option>
                    <option value="web-design">Web Design</option>
                    <option value="branding">Branding & Identity</option>
                    <option value="packaging">Cannabis Packaging</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.service && <span className="text-red-500 text-sm">{errors.service}</span>}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium tracking-wider uppercase text-light-gray" htmlFor="budget">Budget</label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black/40 border border-charcoal text-white placeholder-gray focus:border-purple focus:outline-none transition-colors duration-300 appearance-none cursor-pointer"
                  >
                    <option value="">Select budget range</option>
                    <option value="5-10k">$5,000 - $10,000</option>
                    <option value="10-25k">$10,000 - $25,000</option>
                    <option value="25-50k">$25,000 - $50,000</option>
                    <option value="50k+">$50,000+</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium tracking-wider uppercase text-light-gray" htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="6"
                    className={`w-full px-4 py-3 bg-black/40 border ${errors.message ? 'border-red-500' : 'border-charcoal'} text-white placeholder-gray focus:border-purple focus:outline-none transition-colors duration-300 resize-none`}
                  />
                  {errors.message && <span className="text-red-500 text-sm">{errors.message}</span>}
                </div>

                {submitError && (
                  <div className="text-red-500 text-center">
                    {submitError}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-purple hover:bg-purple-dark text-white font-semibold tracking-wider uppercase transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </>
            )}
          </form>
        </div>
      </section>
    </>
  )
}