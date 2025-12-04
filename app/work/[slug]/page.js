import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import CTA from '@/components/CTA'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getCaseStudyBySlug, caseStudySlugs } from '@/lib/caseStudies'

export async function generateMetadata({ params }) {
  const project = getCaseStudyBySlug(params.slug)

  if (!project) {
    return {
      title: 'Project Not Found'
    }
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: `${project.title} - Case Study | TD Studios`,
      description: project.description,
      type: 'article',
    }
  }
}

export async function generateStaticParams() {
  return caseStudySlugs.map((slug) => ({
    slug: slug,
  }))
}

export default function CaseStudy({ params }) {
  const project = getCaseStudyBySlug(params.slug)

  if (!project) {
    notFound()
  }

  return (
    <>
      <Navigation />

      {/* Case Study Hero */}
      <section className="case-study-hero">
        <div className="case-study-hero-content">
          <Link href="/work" className="back-link" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: 'var(--light-gray)',
            fontSize: '0.9rem',
            marginBottom: '2rem',
            textDecoration: 'none',
            transition: 'color 0.2s'
          }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M16 10H4M8 6l-4 4 4 4"/>
            </svg>
            Back to Work
          </Link>
          <div className="section-label">{project.category}</div>
          <h1 className="page-title">{project.title}</h1>
          <p className="page-subtitle">{project.description}</p>

          <div className="case-study-meta" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '2rem',
            marginTop: '3rem',
            paddingTop: '2rem',
            borderTop: '1px solid var(--charcoal)'
          }}>
            <div>
              <div style={{ color: 'var(--gray)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Client</div>
              <div>{project.client}</div>
            </div>
            <div>
              <div style={{ color: 'var(--gray)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Year</div>
              <div>{project.year}</div>
            </div>
            <div>
              <div style={{ color: 'var(--gray)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Duration</div>
              <div>{project.duration}</div>
            </div>
            <div>
              <div style={{ color: 'var(--gray)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Services</div>
              <div style={{ fontSize: '0.9rem' }}>{project.services.join(', ')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Image */}
      <section style={{
        padding: '0 max(2rem, 5vw)',
        marginBottom: '6rem'
      }}>
        <div style={{
          width: '100%',
          aspectRatio: '16/9',
          position: 'relative',
          borderRadius: '12px',
          overflow: 'hidden',
          background: 'var(--charcoal)'
        }}>
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div style={{
              width: '100%',
              height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '3rem',
                fontWeight: '700',
                color: 'var(--gray)',
                background: 'linear-gradient(135deg, var(--charcoal) 0%, var(--black) 100%)'
              }}>
                {project.title.split(' ').map(word => word[0]).join('')}
            </div>
          )}
        </div>
      </section>

      {/* Overview Section */}
      <section className="case-study-section">
        <div className="case-study-content">
          <h2 className="section-title">Overview</h2>
          <p className="case-study-text">{project.overview}</p>
        </div>
      </section>

      {/* Challenge Section */}
      <section className="case-study-section">
        <div className="case-study-content">
          <div className="section-label">The Challenge</div>
          <h2 className="section-title">What we were solving for</h2>
          <p className="case-study-text">{project.challenge}</p>
        </div>
      </section>

      {/* Solution Section */}
      <section className="case-study-section">
        <div className="case-study-content">
          <div className="section-label">The Solution</div>
          <h2 className="section-title">How we solved it</h2>
          <p className="case-study-text">{project.solution}</p>
        </div>
      </section>

      {/* Results Section */}
      <section className="case-study-section">
        <div className="case-study-content">
          <div className="section-label">The Results</div>
          <h2 className="section-title">Impact & outcomes</h2>
          <div className="results-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
            marginTop: '2rem'
          }}>
            {project.results.map((result, index) => (
              <div key={index} className="result-card" style={{
                padding: '2rem',
                background: 'var(--charcoal)',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.05)'
              }}>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  marginBottom: '1rem',
                  color: project.type === 'cannabis' ? 'var(--purple)' : 'var(--pink)'
                }}>
                  {index + 1 < 10 ? `0${index + 1}` : index + 1}
                </div>
                <p style={{ margin: 0, lineHeight: '1.6' }}>{result}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      {project.testimonial && (
        <section className="case-study-section">
          <div className="case-study-content">
            <div style={{
              padding: '3rem',
              background: 'var(--charcoal)',
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.05)',
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              <div style={{
                fontSize: '1.5rem',
                fontStyle: 'italic',
                fontFamily: "'Instrument Serif', serif",
                marginBottom: '2rem',
                lineHeight: '1.6'
              }}>
                "{project.testimonial.quote}"
              </div>
              <div>
                <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>
                  {project.testimonial.author}
                </div>
                <div style={{ color: 'var(--gray)', fontSize: '0.9rem' }}>
                  {project.testimonial.role}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Next Project CTA */}
      <CTA
        title="Like what you see?"
        subtitle="Let's create something remarkable for your brand."
        primaryButtonText="Start Your Project"
        secondaryButtonText="View More Work"
      />

      <Footer />
    </>
  )
}
