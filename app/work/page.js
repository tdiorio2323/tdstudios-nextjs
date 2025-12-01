'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'
import { portfolioProjects } from '@/lib/visuals'

export default function Work() {
  const [filter, setFilter] = useState('all')

  const filteredProjects = filter === 'all' 
    ? portfolioProjects
    : portfolioProjects.filter(p => p.type === filter)

  return (
    <>
      <Navigation />

      {/* Page Header */}
      <section className="page-header">
        <div className="page-header-bg"></div>
        <div className="page-header-content">
          <div className="section-label">Our Work</div>
          <h1 className="page-title">Projects that move the needle</h1>
          <p className="page-subtitle">A selection of our work across web design, brand identity, and cannabis packaging. Each project built to perform.</p>
        </div>
      </section>

      {/* Filter + Work Grid */}
      <section className="work" style={{ paddingTop: '4rem' }}>
        {/* Filter Buttons */}
        <div className="work-filters" style={{ 
          display: 'flex', 
          gap: '1rem', 
          marginBottom: '4rem',
          flexWrap: 'wrap'
        }}>
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
        <div className="work-grid">
          {filteredProjects.map((project, index) => (
            <Link
              key={project.id}
              href={`/work/${project.slug}`}
              className="work-item"
            >
              <div className="work-image">
                <Image
                  src={project.image}
                  alt={project.name}
                  width={1200}
                  height={750}
                  className="w-full h-full object-cover"
                />
                <div className="work-image-inner">{String(index + 1).padStart(2, '0')}</div>
              </div>
              <div className="work-info">
                <div>
                  <div
                    className="work-category"
                    style={{ color: project.type === 'cannabis' ? 'var(--purple)' : 'var(--pink)' }}
                  >
                    {project.category}
                  </div>
                  <h3 className="work-title">{project.name}</h3>
                </div>
                <span className="work-year">{project.year}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="cta-bg"></div>
        <div className="cta-content">
          <h2 className="cta-title">Ready to join them?</h2>
          <p className="cta-sub">Let&apos;s discuss how we can help bring your vision to life.</p>
          <div className="cta-buttons">
            <Link href="/contact" className="cta-button cta-button-primary">
              Start Your Project
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 10h12M12 6l4 4-4 4"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
