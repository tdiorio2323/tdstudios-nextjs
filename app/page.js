'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { heroVisual } from '@/lib/visuals'

export default function Home() {
  const [email, setEmail] = useState('')
  const [notified, setNotified] = useState(false)

  const handleNotify = (e) => {
    e.preventDefault()
    if (email) {
      setNotified(true)
      setEmail('')
    }
  }

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden bg-black">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroVisual.src}
          alt={heroVisual.alt}
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
      </div>

      {/* Glass Card */}
      <div className="relative z-10 w-full max-w-2xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 text-center shadow-2xl">
        {/* Logo */}
        <div className="mb-10">
          <h1 className="font-bold text-2xl tracking-[0.2em] uppercase text-white">TD STUDIOS</h1>
        </div>

        {/* Headline */}
        <h2 className="font-serif text-4xl md:text-6xl leading-tight text-white mb-6">
          Design that <em className="italic text-pink">builds</em><br />
          brands <em className="italic text-purple">& business</em>
        </h2>

        {/* Subtext */}
        <p className="text-gray text-lg mb-12 max-w-md mx-auto leading-relaxed">
          Premium web design, branding, and cannabis packaging. Based in New York. <span className="text-white">Launching soon.</span>
        </p>

        {/* Buttons Grid */}
        <div className="grid grid-cols-2 gap-4 mb-12">
          <a
            href="https://instagram.com/tdstudiosny.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 py-4 px-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-pink/50 transition-all duration-300 group"
          >
            <svg className="w-5 h-5 text-white group-hover:text-pink transition-colors" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            <span className="text-sm font-medium text-white group-hover:text-pink transition-colors">Instagram</span>
          </a>

          <a
            href="mailto:hello@tdstudiosny.com"
            className="flex items-center justify-center gap-3 py-4 px-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple/50 transition-all duration-300 group"
          >
            <svg className="w-5 h-5 text-white group-hover:text-purple transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            <span className="text-sm font-medium text-white group-hover:text-purple transition-colors">Email</span>
          </a>

          <a
            href="tel:3474859935"
            className="flex items-center justify-center gap-3 py-4 px-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-pink/50 transition-all duration-300 group"
          >
            <svg className="w-5 h-5 text-white group-hover:text-pink transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span className="text-sm font-medium text-white group-hover:text-pink transition-colors">Contact</span>
          </a>

          <Link
            href="/inquire"
            className="flex items-center justify-center gap-3 py-4 px-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple/50 transition-all duration-300 group"
          >
            <svg className="w-5 h-5 text-white group-hover:text-purple transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
            <span className="text-sm font-medium text-white group-hover:text-purple transition-colors">Inquire</span>
          </Link>
        </div>

        {/* Notify Form */}
        <form onSubmit={handleNotify} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            placeholder="Enter your email for launch updates"
            className="flex-grow px-6 py-4 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray focus:outline-none focus:border-pink/50 transition-colors"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="px-8 py-4 rounded-xl bg-pink text-black font-bold uppercase tracking-wider hover:bg-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={notified}
          >
            {notified ? 'Notified!' : 'Notify Me'}
          </button>
        </form>
      </div>
    </main>
  )
}
