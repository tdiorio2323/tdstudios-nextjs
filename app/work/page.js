'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import CTA from '@/components/CTA'
import Link from 'next/link'
import Image from 'next/image'
import { caseStudies, getCaseStudiesByType } from '@/lib/caseStudies'

export default function Work() {
  const [filter, setFilter] = useState('all')

  const filteredProjects = getCaseStudiesByType(filter)

  return (
    <>
      <Navigation />

      {/* Page Header */}
      <section className="relative min-h-[60vh] flex flex-col justify-center px-8 md:px-16 pt-32 pb-20 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-charcoal/40 via-black/60 to-black"></div>

        {/* Content */}
        <div className="relative z-10 max-w-[1400px] w-full mx-auto">
          <div className="text-xs font-semibold tracking-[0.3em] uppercase text-gray mb-6">Our Work</div>
          <h1 className="font-serif text-[clamp(3rem,7vw,5rem)] leading-[1.1] text-white mb-6">Projects that move the needle</h1>
          <p className="text-lg md:text-xl font-normal text-gray max-w-[650px] leading-relaxed">A selection of our work across web design, brand identity, and cannabis packaging. Each project built to perform.</p>
        </div>
      </section>

      {/* Filter + Work Grid */}
      <section className="py-24 px-8 md:px-16">
        {/* Filter Buttons */}
        <div className="flex gap-4 mb-16 flex-wrap max-w-[1400px] mx-auto">
          <button 
            onClick={() => setFilter('all')}
            className="hero-tag"
            style={{ 
              cursor: 'pointer',
              background: filter === 'all' ? 'var(--white)' : 'transparent',
              color: filter === 'all' ? 'var(--black)' : 'var(--light-gray)',
              borderColor: filter === 'all' ? 'var(--white)' : 'var(--charcoal)'
            }}
          >
            All Projects
          </button>
          <button 
            onClick={() => setFilter('design')}
            className="hero-tag"
            style={{ 
              cursor: 'pointer',
              background: filter === 'design' ? 'var(--pink)' : 'transparent',
              color: filter === 'design' ? 'var(--black)' : 'var(--light-gray)',
              borderColor: filter === 'design' ? 'var(--pink)' : 'var(--charcoal)'
            }}
          >
            Web & Brand
          </button>
          <button 
            onClick={() => setFilter('cannabis')}
            className="hero-tag"
            style={{ 
              cursor: 'pointer',
              background: filter === 'cannabis' ? 'var(--purple)' : 'transparent',
              color: filter === 'cannabis' ? 'var(--black)' : 'var(--light-gray)',
              borderColor: filter === 'cannabis' ? 'var(--purple)' : 'var(--charcoal)'
            }}
          >
            Cannabis
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-[1400px] mx-auto">
          {filteredProjects.map((project, index) => (
            <Link
              key={project.id}
              href={`/work/${project.slug}`}
              className="group block relative text-white"
            >
              <div className="w-full aspect-[16/10] bg-charcoal relative overflow-hidden mb-6">
                <Image
                  src={project.image}
                  alt={project.name}
                  width={1200}
                  height={750}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-95"
                />
                {/* Number Overlay */}
                <div className="absolute inset-0 flex items-center justify-center font-serif text-[2rem] italic text-white opacity-20">
                  {String(index + 1).padStart(2, '0')}
                </div>
              </div>
              <div className="flex justify-between items-start py-2">
                <div>
                  <div
                    className={`text-[0.7rem] font-semibold tracking-[0.15em] uppercase mb-2 ${project.type === 'cannabis' ? 'text-purple' : 'text-pink'}`}
                  >
                    {project.category}
                  </div>
                  <h3 className="font-serif text-2xl">{project.name}</h3>
                </div>
                <span className="text-gray text-[0.85rem]">{project.year}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <CTA
        title="Ready to join them?"
        subtitle="Let's discuss how we can help bring your vision to life."
        primaryButtonText="Start Your Project"
      />

      <Footer />
    </>
  )
}
