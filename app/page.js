'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ComingSoon() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    // You can add email collection logic here later
    setSubmitted(true)
  }

  return (
    <div className="coming-soon-container">
      {/* Background Elements */}
      <div className="coming-soon-bg">
        <div className="gradient-orb gradient-orb-1"></div>
        <div className="gradient-orb gradient-orb-2"></div>
        <div className="gradient-orb gradient-orb-3"></div>
      </div>

      {/* Glass Card */}
      <div className="coming-soon-card">
        {/* Logo */}
        <div className="coming-soon-logo">
          TD STUDIOS
        </div>

        {/* Tagline */}
        <h1 className="coming-soon-title">
          Design that <span className="text-gold">builds</span>
          <br />
          brands <span className="text-sage">& business</span>
        </h1>

        <p className="coming-soon-subtitle">
          Premium web design, branding, and cannabis packaging.
          <br />
          Based in New York. Launching soon.
        </p>

        {/* Links */}
        <div className="coming-soon-links">
          <a
            href="mailto:hello@tdstudiosny.com"
            className="coming-soon-link"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            Email Us
          </a>

          <a
            href="https://instagram.com/tdstudiosny"
            target="_blank"
            rel="noopener noreferrer"
            className="coming-soon-link"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
            </svg>
            Instagram
          </a>

          <a
            href="https://linkedin.com/company/tdstudiosny"
            target="_blank"
            rel="noopener noreferrer"
            className="coming-soon-link"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
              <rect x="2" y="9" width="4" height="12"/>
              <circle cx="4" cy="4" r="2"/>
            </svg>
            LinkedIn
          </a>

          <a
            href="https://dribbble.com/tdstudiosny"
            target="_blank"
            rel="noopener noreferrer"
            className="coming-soon-link"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"/>
            </svg>
            Dribbble
          </a>
        </div>

        {/* Email Signup */}
        <div className="coming-soon-notify">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="notify-form">
              <input
                type="email"
                placeholder="Enter your email for launch updates"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="notify-input"
              />
              <button type="submit" className="notify-button">
                Notify Me
              </button>
            </form>
          ) : (
            <div className="notify-success">
              ✓ Thanks! We'll notify you when we launch.
            </div>
          )}
        </div>

        {/* Preview Link - Remove this before final launch */}
        <Link href="/preview" className="preview-link">
          Preview Full Site →
        </Link>
      </div>

      {/* Footer */}
      <div className="coming-soon-footer">
        © {new Date().getFullYear()} TD Studios. All rights reserved.
      </div>

      <style jsx>{`
        .coming-soon-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          position: relative;
          overflow: hidden;
          background: #0a0a0a;
        }

        .coming-soon-bg {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          overflow: hidden;
        }

        .gradient-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.15;
          animation: float 20s ease-in-out infinite;
        }

        .gradient-orb-1 {
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, #c9a227 0%, transparent 70%);
          top: -200px;
          left: -200px;
          animation-delay: 0s;
        }

        .gradient-orb-2 {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, #8b9a7d 0%, transparent 70%);
          bottom: -150px;
          right: -150px;
          animation-delay: 7s;
        }

        .gradient-orb-3 {
          width: 350px;
          height: 350px;
          background: radial-gradient(circle, #c9a227 0%, transparent 70%);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation-delay: 14s;
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          33% { transform: translate(30px, -30px); }
          66% { transform: translate(-20px, 20px); }
        }

        .coming-soon-card {
          position: relative;
          z-index: 2;
          background: rgba(26, 26, 26, 0.6);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          padding: 4rem 3rem;
          max-width: 600px;
          width: 100%;
          text-align: center;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }

        .coming-soon-logo {
          font-size: 1.5rem;
          font-weight: 800;
          letter-spacing: 0.15em;
          color: #f5f5f0;
          margin-bottom: 2rem;
          text-transform: uppercase;
        }

        .coming-soon-title {
          font-family: 'Instrument Serif', serif;
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 400;
          line-height: 1.2;
          color: #f5f5f0;
          margin-bottom: 1.5rem;
        }

        .text-gold {
          color: #c9a227;
          font-style: italic;
        }

        .text-sage {
          color: #8b9a7d;
          font-style: italic;
        }

        .coming-soon-subtitle {
          color: #bbb;
          font-size: 1.125rem;
          line-height: 1.6;
          margin-bottom: 3rem;
        }

        .coming-soon-links {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
          margin-bottom: 3rem;
        }

        .coming-soon-link {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          padding: 1rem 1.5rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          color: #f5f5f0;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .coming-soon-link:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(201, 162, 39, 0.5);
          transform: translateY(-2px);
        }

        .coming-soon-notify {
          margin-bottom: 2rem;
        }

        .notify-form {
          display: flex;
          gap: 0.5rem;
        }

        .notify-input {
          flex: 1;
          padding: 1rem 1.5rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          color: #f5f5f0;
          font-size: 1rem;
          outline: none;
          transition: all 0.3s ease;
        }

        .notify-input::placeholder {
          color: #888;
        }

        .notify-input:focus {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(201, 162, 39, 0.5);
        }

        .notify-button {
          padding: 1rem 2rem;
          background: linear-gradient(135deg, #c9a227 0%, #a88620 100%);
          border: none;
          border-radius: 12px;
          color: #0a0a0a;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
        }

        .notify-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(201, 162, 39, 0.3);
        }

        .notify-success {
          padding: 1rem 1.5rem;
          background: rgba(139, 154, 125, 0.1);
          border: 1px solid rgba(139, 154, 125, 0.3);
          border-radius: 12px;
          color: #8b9a7d;
          font-weight: 500;
        }

        .preview-link {
          display: inline-block;
          color: #888;
          font-size: 0.875rem;
          text-decoration: none;
          transition: color 0.3s ease;
          border-bottom: 1px solid transparent;
        }

        .preview-link:hover {
          color: #c9a227;
          border-bottom-color: #c9a227;
        }

        .coming-soon-footer {
          position: relative;
          z-index: 2;
          margin-top: 3rem;
          color: #666;
          font-size: 0.875rem;
        }

        @media (max-width: 640px) {
          .coming-soon-card {
            padding: 3rem 2rem;
          }

          .coming-soon-links {
            grid-template-columns: 1fr;
          }

          .notify-form {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  )
}
