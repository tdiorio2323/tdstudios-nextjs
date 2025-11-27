'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const [cursorHover, setCursorHover] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX - 10, y: e.clientY - 10 })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  const handleHover = (hover) => {
    setCursorHover(hover)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  return (
    <>
      {/* Custom Cursor */}
      <div 
        className={`cursor ${cursorHover ? 'hover' : ''}`}
        style={{ left: cursorPos.x, top: cursorPos.y }}
      />

      {/* Grain Overlay */}
      <div className="grain" />

      {/* Navigation */}
      <nav>
        <Link 
          href="/" 
          className="logo"
          onMouseEnter={() => handleHover(true)}
          onMouseLeave={() => handleHover(false)}
        >
          TD STUDIOS
        </Link>

        <ul className="nav-links">
          <li>
            <Link 
              href="/work"
              onMouseEnter={() => handleHover(true)}
              onMouseLeave={() => handleHover(false)}
            >
              Work
            </Link>
          </li>
          <li>
            <Link 
              href="/about"
              onMouseEnter={() => handleHover(true)}
              onMouseLeave={() => handleHover(false)}
            >
              About
            </Link>
          </li>
          <li>
            <Link 
              href="/contact"
              onMouseEnter={() => handleHover(true)}
              onMouseLeave={() => handleHover(false)}
            >
              Contact
            </Link>
          </li>
        </ul>

        <Link 
          href="/contact" 
          className="nav-cta"
          onMouseEnter={() => handleHover(true)}
          onMouseLeave={() => handleHover(false)}
        >
          Start Project
        </Link>

        {/* Mobile Menu Button */}
        <button 
          className={`mobile-menu-btn ${mobileMenuOpen ? 'active' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          onMouseEnter={() => handleHover(true)}
          onMouseLeave={() => handleHover(false)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`}>
        <Link 
          href="/" 
          onClick={closeMobileMenu}
          onMouseEnter={() => handleHover(true)}
          onMouseLeave={() => handleHover(false)}
        >
          Home
        </Link>
        <Link 
          href="/work" 
          onClick={closeMobileMenu}
          onMouseEnter={() => handleHover(true)}
          onMouseLeave={() => handleHover(false)}
        >
          Work
        </Link>
        <Link 
          href="/about" 
          onClick={closeMobileMenu}
          onMouseEnter={() => handleHover(true)}
          onMouseLeave={() => handleHover(false)}
        >
          About
        </Link>
        <Link 
          href="/contact" 
          onClick={closeMobileMenu}
          onMouseEnter={() => handleHover(true)}
          onMouseLeave={() => handleHover(false)}
        >
          Contact
        </Link>
      </div>
    </>
  )
}
