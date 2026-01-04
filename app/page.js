'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isEntering, setIsEntering] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef(null)

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      const scrollTop = window.scrollY
      const docHeight = containerRef.current.scrollHeight - window.innerHeight
      const progress = Math.min(scrollTop / docHeight, 1)
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Track mouse for parallax effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Initial load animation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  // Handle entry
  const handleEnter = () => {
    setIsEntering(true)
    setTimeout(() => {
      router.push('/work')
    }, 1500)
  }

  return (
    <div
      ref={containerRef}
      className={`relative bg-black text-white overflow-x-hidden transition-opacity duration-1000 ${
        isEntering ? 'opacity-0 scale-110' : 'opacity-100'
      }`}
      style={{ cursor: 'none' }}
    >
      {/* Custom Cursor */}
      <div
        className="fixed w-4 h-4 rounded-full bg-white mix-blend-difference pointer-events-none z-[9999] transition-transform duration-100"
        style={{
          left: mousePosition.x * 20 + 'vw',
          top: mousePosition.y * 20 + 'vh',
          transform: `translate(${mousePosition.x * 50}vw, ${mousePosition.y * 50}vh)`,
        }}
      />

      {/* Floating Orbs - Parallax */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute w-[800px] h-[800px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(167,139,250,0.4) 0%, transparent 70%)',
            left: `calc(20% + ${mousePosition.x * 30}px)`,
            top: `calc(30% + ${mousePosition.y * 30}px)`,
            filter: 'blur(60px)',
            transition: 'left 0.3s ease-out, top 0.3s ease-out',
          }}
        />
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(244,114,182,0.4) 0%, transparent 70%)',
            right: `calc(10% + ${mousePosition.x * -20}px)`,
            bottom: `calc(20% + ${mousePosition.y * -20}px)`,
            filter: 'blur(60px)',
            transition: 'right 0.3s ease-out, bottom 0.3s ease-out',
          }}
        />
      </div>

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 h-[2px] bg-gradient-to-r from-purple via-pink to-purple z-50"
        style={{ width: `${scrollProgress * 100}%` }}
      />

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* SECTION 1: THE VOID - Name Emergence */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="text-center z-10">
          {/* Glitch/Reveal Effect on Name */}
          <div className="relative">
            <h1
              className={`font-bold text-[15vw] md:text-[12vw] tracking-[0.3em] uppercase leading-none transition-all duration-[2000ms] ${
                isLoaded ? 'opacity-100 tracking-[0.2em]' : 'opacity-0 tracking-[1em]'
              }`}
              style={{
                fontFamily: 'system-ui, sans-serif',
                textShadow: '0 0 80px rgba(167,139,250,0.5)',
              }}
            >
              TD
            </h1>
            <div
              className={`font-serif text-2xl md:text-4xl tracking-[0.5em] uppercase text-gray mt-4 transition-all duration-[2000ms] delay-500 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              STUDIOS
            </div>
          </div>

          {/* Scroll Indicator */}
          <div
            className={`absolute bottom-12 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-[2000ms] ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="flex flex-col items-center gap-4">
              <span className="text-xs tracking-[0.3em] uppercase text-gray">Scroll to descend</span>
              <div className="w-[1px] h-16 bg-gradient-to-b from-white/50 to-transparent animate-pulse" />
            </div>
          </div>
        </div>

        {/* Noise Texture Overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </section>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* SECTION 2: THE MANIFESTO */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center py-32 px-8">
        <div className="max-w-7xl mx-auto w-full">
          <ManifestoLine delay={0}>
            We don&apos;t make pretty things.
          </ManifestoLine>
          <ManifestoLine delay={100} accent>
            We build weapons.
          </ManifestoLine>
          <ManifestoLine delay={200}>
            Brands that cut through noise.
          </ManifestoLine>
          <ManifestoLine delay={300}>
            Websites that convert strangers into believers.
          </ManifestoLine>
          <ManifestoLine delay={400} accent>
            Design with teeth.
          </ManifestoLine>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* SECTION 3: THE DOMAINS */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen py-32 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-4">
            <DomainCard
              number="01"
              title="Web"
              description="Sites that load fast, rank high, and convert."
              color="purple"
            />
            <DomainCard
              number="02"
              title="E-Commerce"
              description="Stores that turn browsers into buyers."
              color="pink"
            />
            <DomainCard
              number="03"
              title="Brand"
              description="Identities that stick and stand the test of time."
              color="purple"
            />
            <DomainCard
              number="04"
              title="Cannabis"
              description="Compliant packaging that dominates shelves."
              color="pink"
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* SECTION 4: THE TENSION */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="text-center max-w-4xl mx-auto px-8">
          <ScrollReveal>
            <p className="text-2xl md:text-4xl font-light leading-relaxed text-gray">
              Based in <span className="text-white font-normal">New York</span>.
              <br />
              Working with brands that refuse to be
              <br />
              <span className="font-serif italic text-pink text-4xl md:text-6xl">forgettable</span>.
            </p>
          </ScrollReveal>
        </div>

        {/* Abstract Shape */}
        <div
          className="absolute w-[50vw] h-[50vw] opacity-10"
          style={{
            background: 'conic-gradient(from 0deg, transparent, rgba(167,139,250,0.5), transparent, rgba(244,114,182,0.5), transparent)',
            borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
            animation: 'morphShape 20s ease-in-out infinite',
            filter: 'blur(40px)',
          }}
        />
      </section>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* SECTION 5: THE GATE */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-8 py-32">
        <ScrollReveal>
          <div className="text-center">
            <p className="text-sm tracking-[0.4em] uppercase text-gray mb-8">
              Ready?
            </p>
            <h2 className="font-serif text-5xl md:text-8xl leading-tight mb-16">
              Step inside.
            </h2>

            {/* The Gate Button */}
            <button
              onClick={handleEnter}
              className="group relative px-16 py-8 overflow-hidden"
            >
              {/* Border animation */}
              <span className="absolute inset-0 border border-white/30 group-hover:border-white/0 transition-colors duration-500" />

              {/* Fill animation */}
              <span className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

              {/* Text */}
              <span className="relative z-10 text-lg tracking-[0.3em] uppercase font-semibold text-white group-hover:text-black transition-colors duration-500">
                Enter
              </span>

              {/* Corner accents */}
              <span className="absolute top-0 left-0 w-4 h-4 border-t border-l border-pink transition-all duration-300 group-hover:w-8 group-hover:h-8" />
              <span className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-purple transition-all duration-300 group-hover:w-8 group-hover:h-8" />
            </button>

            {/* Alternative actions */}
            <div className="flex items-center justify-center gap-8 mt-16 text-sm text-gray">
              <a
                href="mailto:hello@tdstudiosny.com"
                className="hover:text-white transition-colors duration-300 tracking-wider"
              >
                hello@tdstudiosny.com
              </a>
              <span className="w-1 h-1 rounded-full bg-gray" />
              <a
                href="https://instagram.com/tdstudiosny"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink transition-colors duration-300 tracking-wider"
              >
                @tdstudiosny
              </a>
            </div>
          </div>
        </ScrollReveal>

        {/* Location marker */}
        <div className="absolute bottom-8 left-8 text-xs tracking-[0.2em] uppercase text-gray/50">
          40.7128° N, 74.0060° W
        </div>

        {/* Year */}
        <div className="absolute bottom-8 right-8 text-xs tracking-[0.2em] uppercase text-gray/50">
          © 2025
        </div>
      </section>

      {/* Global Styles */}
      <style jsx global>{`
        @keyframes morphShape {
          0%, 100% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
          25% { border-radius: 58% 42% 75% 25% / 76% 46% 54% 24%; }
          50% { border-radius: 50% 50% 33% 67% / 55% 27% 73% 45%; }
          75% { border-radius: 33% 67% 58% 42% / 63% 68% 32% 37%; }
        }

        html {
          scroll-behavior: smooth;
        }

        ::selection {
          background: rgba(167, 139, 250, 0.4);
          color: white;
        }
      `}</style>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════════════════

function ManifestoLine({ children, delay = 0, accent = false }) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div
      ref={ref}
      className={`overflow-hidden py-2 md:py-4 transition-all duration-1000 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <p
        className={`text-3xl md:text-6xl lg:text-7xl font-light transition-transform duration-1000 ${
          isVisible ? 'translate-y-0' : 'translate-y-full'
        } ${accent ? 'font-serif italic text-pink' : 'text-white'}`}
      >
        {children}
      </p>
    </div>
  )
}

function DomainCard({ number, title, description, color }) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.3 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const accentColor = color === 'pink' ? 'text-pink' : 'text-purple'
  const borderColor = color === 'pink' ? 'group-hover:border-pink/50' : 'group-hover:border-purple/50'

  return (
    <div
      ref={ref}
      className={`group relative p-8 md:p-12 border border-white/10 ${borderColor} transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
      }`}
    >
      <span className={`text-sm ${accentColor} tracking-[0.2em]`}>{number}</span>
      <h3 className="font-serif text-4xl md:text-5xl mt-4 mb-6">{title}</h3>
      <p className="text-gray text-lg leading-relaxed">{description}</p>

      {/* Hover line */}
      <div className={`absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 ${
        color === 'pink' ? 'bg-pink' : 'bg-purple'
      }`} />
    </div>
  )
}

function ScrollReveal({ children }) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.3 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
      }`}
    >
      {children}
    </div>
  )
}
