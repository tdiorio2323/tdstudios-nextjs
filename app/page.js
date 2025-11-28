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
            href="https://instagram.com/tdstudiosny.com"
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
            href="mailto:Tyler@tdstudiosny.com"
            className="coming-soon-link"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            Email
          </a>

          <div className="coming-soon-link coming-soon-link-disabled">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/>
              <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
            Cannabis
          </div>

          <a
            href="/gallery"
            className="coming-soon-link"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
            Gallery
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
          background: var(--black);
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
          background: radial-gradient(circle, var(--gold) 0%, transparent 70%);
          top: -200px;
          left: -200px;
          animation-delay: 0s;
        }

        .gradient-orb-2 {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, var(--sage) 0%, transparent 70%);
          bottom: -150px;
          right: -150px;
          animation-delay: 7s;
        }

        .gradient-orb-3 {
          width: 350px;
          height: 350px;
          background: radial-gradient(circle, var(--gold) 0%, transparent 70%);
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
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(40px) saturate(180%);
          -webkit-backdrop-filter: blur(40px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.18);
          border-radius: 24px;
          padding: 4rem 3rem;
          max-width: 600px;
          width: 100%;
          text-align: center;
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.2),
            inset 0 -1px 0 rgba(0, 0, 0, 0.2);
        }

        .coming-soon-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, 
            transparent, 
            rgba(255, 255, 255, 0.4) 20%, 
            rgba(255, 255, 255, 0.4) 80%, 
            transparent);
          border-radius: 24px 24px 0 0;
        }

        .coming-soon-logo {
          font-size: 1.5rem;
          font-weight: 800;
          letter-spacing: 0.15em;
          color: var(--white);
          margin-bottom: 2rem;
          text-transform: uppercase;
        }

        .coming-soon-title {
          font-family: 'Instrument Serif', serif;
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 400;
          line-height: 1.2;
          color: var(--white);
          margin-bottom: 1.5rem;
        }

        .text-gold {
          color: var(--gold);
          font-style: italic;
        }

        .text-sage {
          color: var(--sage);
          font-style: italic;
        }

        .coming-soon-subtitle {
          color: var(--light-gray);
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
          color: var(--white);
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .coming-soon-link:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: var(--gold);
          transform: translateY(-2px);
        }

        .coming-soon-link-disabled {
          cursor: default;
          pointer-events: none;
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
          color: var(--white);
          font-size: 1rem;
          outline: none;
          transition: all 0.3s ease;
        }

        .notify-input::placeholder {
          color: var(--gray);
        }

        .notify-input:focus {
          background: rgba(255, 255, 255, 0.08);
          border-color: var(--gold);
        }

        .notify-button {
          padding: 1rem 2rem;
          background: var(--gold);
          border: none;
          border-radius: 12px;
          color: var(--black);
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
        }

        .notify-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(244, 114, 182, 0.3);
        }

        .notify-success {
          padding: 1rem 1.5rem;
          background: rgba(167, 139, 250, 0.1);
          border: 1px solid rgba(167, 139, 250, 0.3);
          border-radius: 12px;
          color: var(--sage);
          font-weight: 500;
        }

        .preview-link {
          display: inline-block;
          color: var(--gray);
          font-size: 0.875rem;
          text-decoration: none;
          transition: color 0.3s ease;
          border-bottom: 1px solid transparent;
        }

        .preview-link:hover {
          color: var(--gold);
          border-bottom-color: var(--gold);
        }

        .coming-soon-footer {
          position: relative;
          z-index: 2;
          margin-top: 3rem;
          color: var(--gray);
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
