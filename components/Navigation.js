'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const navLinks = [
  { name: 'Services', href: '/services' },
  { name: 'Process', href: '/process' },
  { name: 'About', href: '/about' },
  { name: 'Blog', href: '/blog' },
]

const mobileNavLinks = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Process', href: '/process' },
  { name: 'About', href: '/about' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
]

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
        aria-hidden="true"
      />

      {/* Grain Overlay */}
      <div className="grain" aria-hidden="true" />

      {/* Navigation */}
      <nav
        role="navigation"
        aria-label="Main navigation"
        className="fixed top-0 left-0 right-0 z-[100] px-8 py-8 md:px-16 flex justify-between items-center mix-blend-difference text-white"
      >
        <Link
          href="/"
          className="text-xl font-bold tracking-[0.05em] uppercase"
          onMouseEnter={() => handleHover(true)}
          onMouseLeave={() => handleHover(false)}
        >
          TD STUDIOS
        </Link>

        <ul className="hidden md:flex gap-10 list-none">
          {navLinks.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="text-sm font-medium tracking-[0.05em] uppercase relative group"
                onMouseEnter={() => handleHover(true)}
                onMouseLeave={() => handleHover(false)}
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/contact"
          className="hidden md:block px-6 py-3 border border-white text-xs font-semibold tracking-[0.1em] uppercase transition-all duration-300 hover:bg-white hover:text-black"
          onMouseEnter={() => handleHover(true)}
          onMouseLeave={() => handleHover(false)}
        >
          Start Project
        </Link>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden flex flex-col justify-center items-center w-10 h-10 z-[200] space-y-1.5 ${mobileMenuOpen ? 'active' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          onMouseEnter={() => handleHover(true)}
          onMouseLeave={() => handleHover(false)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
        >
          <span className={`block w-6 h-px bg-white transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`}></span>
          <span className={`block w-6 h-px bg-white transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-px bg-white transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`}></span>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 bg-black z-[150] flex flex-col justify-center items-center gap-8 transition-opacity duration-400 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        role="dialog"
        aria-modal={mobileMenuOpen}
        aria-hidden={!mobileMenuOpen}
      >
        {mobileNavLinks.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            onClick={closeMobileMenu}
            className="font-serif text-5xl text-white hover:text-purple transition-colors duration-300"
            onMouseEnter={() => handleHover(true)}
            onMouseLeave={() => handleHover(false)}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </>
  )
}
