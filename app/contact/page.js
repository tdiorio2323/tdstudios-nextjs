'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

// Note: metadata must be in a separate file for client components
// For now, the layout.js handles default metadata

export default function Contact() {
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

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.service) {
      newErrors.service = 'Please select a service'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please tell us about your project'
    } else if (formData.message.trim().length < 20) {
      newErrors.message = 'Please provide more details (at least 20 characters)'
    }

    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitError('')

    // Validate form
    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setLoading(true)

    try {
      const response = await fetch('https://formspree.io/f/movkvrpz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setSubmitted(true)
      } else {
        setSubmitError('Something went wrong. Please try again or email us directly at Tyler@tdstudiosny.com')
      }
    } catch (error) {
      setSubmitError('Unable to send message. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navigation />

      {/* Page Header */}
      <section className="page-header">
        <div className="page-header-bg"></div>
        <div className="page-header-content">
          <div className="section-label">Get In Touch</div>
          <h1 className="page-title">Let&apos;s build something great together</h1>
          <p className="page-subtitle">Have a project in mind? Tell us about it. We&apos;ll get back to you within 24 hours to discuss how we can help.</p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="contact-grid">
          {/* Contact Info */}
          <div className="contact-info">
            <h3>Start a conversation</h3>
            <p>Whether you need a high-converting website, a brand identity that commands attention, or cannabis packaging that dominates the shelf — we&apos;re ready to bring your vision to life.</p>
            
            <div className="contact-details">
              <div className="contact-detail">
                <div className="contact-detail-label">Email</div>
                <a href="mailto:Tyler@tdstudiosny.com">Tyler@tdstudiosny.com</a>
              </div>
              
              <div className="contact-detail">
                <div className="contact-detail-label">Based In</div>
                <p>New York City</p>
              </div>
              
              <div className="contact-detail">
                <div className="contact-detail-label">Follow Along</div>
                <a href="https://instagram.com/tdstudiosny.com" target="_blank" rel="noopener noreferrer">@tdstudiosny.com</a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          {submitted ? (
            <div className="form-success">
              <h3>Thank you!</h3>
              <p>Your message has been sent. We&apos;ll be in touch within 24 hours.</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              {submitError && (
                <div style={{
                  padding: '1rem',
                  background: 'rgba(220, 53, 69, 0.1)',
                  border: '1px solid rgba(220, 53, 69, 0.3)',
                  borderRadius: '8px',
                  color: '#ff6b6b',
                  marginBottom: '2rem'
                }}>
                  {submitError}
                </div>
              )}

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="name">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className={`form-input ${errors.name ? 'form-input-error' : ''}`}
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && (
                    <span style={{ color: '#ff6b6b', fontSize: '0.85rem', marginTop: '0.5rem', display: 'block' }}>
                      {errors.name}
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={`form-input ${errors.email ? 'form-input-error' : ''}`}
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <span style={{ color: '#ff6b6b', fontSize: '0.85rem', marginTop: '0.5rem', display: 'block' }}>
                      {errors.email}
                    </span>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="company">Company</label>
                  <input 
                    type="text" 
                    id="company"
                    name="company"
                    className="form-input" 
                    placeholder="Company name"
                    value={formData.company}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="service">Service *</label>
                  <select
                    id="service"
                    name="service"
                    className={`form-select ${errors.service ? 'form-input-error' : ''}`}
                    value={formData.service}
                    onChange={handleChange}
                  >
                    <option value="">Select a service</option>
                    <option value="web-design">Web Design</option>
                    <option value="brand-identity">Brand Identity</option>
                    <option value="packaging">Packaging Design</option>
                    <option value="cannabis-branding">Cannabis Branding</option>
                    <option value="graphic-design">Graphic Design</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.service && (
                    <span style={{ color: '#ff6b6b', fontSize: '0.85rem', marginTop: '0.5rem', display: 'block' }}>
                      {errors.service}
                    </span>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="budget">Budget Range</label>
                <select 
                  id="budget"
                  name="budget"
                  className="form-select"
                  value={formData.budget}
                  onChange={handleChange}
                >
                  <option value="">Select budget range</option>
                  <option value="5k-10k">$5,000 - $10,000</option>
                  <option value="10k-25k">$10,000 - $25,000</option>
                  <option value="25k-50k">$25,000 - $50,000</option>
                  <option value="50k+">$50,000+</option>
                  <option value="not-sure">Not sure yet</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="message">Project Details *</label>
                <textarea
                  id="message"
                  name="message"
                  className={`form-textarea ${errors.message ? 'form-input-error' : ''}`}
                  placeholder="Tell us about your project, goals, and timeline..."
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
                {errors.message && (
                  <span style={{ color: '#ff6b6b', fontSize: '0.85rem', marginTop: '0.5rem', display: 'block' }}>
                    {errors.message}
                  </span>
                )}
              </div>

              <button type="submit" className="form-submit" disabled={loading}>
                {loading ? 'Sending...' : 'Send Message'}
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 10h12M12 6l4 4-4 4"/>
                </svg>
              </button>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </>
  )
}
