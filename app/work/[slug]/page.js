import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { notFound } from 'next/navigation'

// Project data - in production, this would come from a CMS or database
const projects = {
  'apex-ventures': {
    title: 'Apex Ventures',
    category: 'Web Design / Branding',
    type: 'design',
    year: '2024',
    description: 'Complete brand identity and website for a venture capital firm.',
    client: 'Apex Ventures',
    services: ['Brand Identity', 'Web Design', 'UI/UX', 'Development'],
    duration: '12 weeks',
    overview: 'Apex Ventures needed a sophisticated digital presence that would position them as a premier venture capital firm while maintaining approachability for founders seeking investment.',
    challenge: 'The venture capital space is crowded with firms that look identical. Apex needed to stand out while maintaining credibility with both investors and founders. The website needed to communicate their data-driven approach while remaining human and accessible.',
    solution: 'We developed a complete brand system anchored by a bold, modern identity that balances professionalism with warmth. The website features an intuitive portfolio showcase, founder resources, and a streamlined contact process. Custom data visualizations bring their investment thesis to life.',
    results: [
      '150% increase in qualified founder applications',
      '3x improvement in time-to-contact metrics',
      'Featured in TechCrunch design spotlight',
      'Brand recognition increased 85% among target market'
    ],
    testimonial: {
      quote: 'TD Studios transformed how founders perceive our firm. The new brand and website position us exactly where we need to be — credible, modern, and founder-friendly.',
      author: 'Sarah Chen',
      role: 'Managing Partner, Apex Ventures'
    }
  },
  'emerald-valley': {
    title: 'Emerald Valley',
    category: 'Cannabis / Packaging',
    type: 'cannabis',
    year: '2024',
    description: 'Premium packaging design for a craft cannabis brand.',
    client: 'Emerald Valley',
    services: ['Brand Identity', 'Packaging Design', 'Label Design', 'Brand Guidelines'],
    duration: '8 weeks',
    overview: 'Emerald Valley is a craft cannabis cultivator focused on small-batch, organic flower. They needed packaging that would reflect their premium positioning and artisanal approach while meeting all state compliance requirements.',
    challenge: 'Cannabis packaging regulations are strict and vary by state. The packaging needed to stand out on dispensary shelves while conveying quality, craft, and natural cultivation practices — all within tight regulatory constraints.',
    solution: 'We created a packaging system inspired by vintage botanical illustrations and natural materials. Each strain features custom illustrations that reflect the flower\'s unique characteristics. The system is fully compliant, scalable across product lines, and creates instant shelf presence.',
    results: [
      'Sold out first production run in 3 days',
      'Featured in Leafly\'s Best Packaging Awards',
      '40% increase in retail partners',
      'Premium pricing maintained 25% above category average'
    ],
    testimonial: {
      quote: 'The packaging perfectly captures our craft approach. Customers tell us they buy Emerald Valley based on the packaging alone. It\'s become our best sales tool.',
      author: 'Marcus Green',
      role: 'Founder, Emerald Valley'
    }
  },
  'modernist-studio': {
    title: 'Modernist Studio',
    category: 'Brand Identity',
    type: 'design',
    year: '2024',
    description: 'Visual identity system for an architecture firm.',
    client: 'Modernist Studio',
    services: ['Brand Strategy', 'Visual Identity', 'Brand Guidelines', 'Print Collateral'],
    duration: '10 weeks',
    overview: 'Modernist Studio is an architecture firm specializing in contemporary residential design. They needed a brand identity that would reflect their design philosophy and appeal to high-net-worth clients.',
    challenge: 'Architecture firms often struggle to differentiate their brand from their work. Modernist Studio needed an identity that could stand on its own while complementing their minimalist design aesthetic without competing with their portfolio.',
    solution: 'We developed a refined visual system built on geometric precision and negative space. The identity system is intentionally restrained, using a sophisticated monochrome palette and custom typography that echoes their architectural philosophy. The result is a brand that feels like architecture itself.',
    results: [
      'Project inquiries increased 120%',
      'Average project value up 35%',
      'Won Best Brand Design at AIA Conference',
      'Featured in Architectural Digest'
    ],
    testimonial: {
      quote: 'TD Studios understood our vision completely. The brand identity reflects our design philosophy in every detail. It\'s architectural in its precision and restraint.',
      author: 'James Morrison',
      role: 'Principal Architect, Modernist Studio'
    }
  },
  'high-tide-collective': {
    title: 'High Tide Collective',
    category: 'Cannabis / Web',
    type: 'cannabis',
    year: '2023',
    description: 'E-commerce website and brand refresh for a dispensary chain.',
    client: 'High Tide Collective',
    services: ['Web Design', 'E-Commerce', 'Brand Refresh', 'POS Integration'],
    duration: '14 weeks',
    overview: 'High Tide Collective operates three premium dispensaries in California. They needed a website that could handle online ordering, menu management, and educational content while reflecting their curated, boutique positioning.',
    challenge: 'Cannabis e-commerce faces unique challenges: age verification, complex compliance requirements, real-time inventory sync across multiple locations, and the inability to use standard payment processors. The site needed to be both functional and beautiful.',
    solution: 'We built a custom Next.js e-commerce platform integrated with their POS system. Real-time inventory management, location-based ordering, educational resources, and a seamless checkout experience. The design balances premium aesthetics with functional e-commerce.',
    results: [
      'Online orders increased 300% in first quarter',
      'Average order value up 45%',
      'Customer retention improved 60%',
      'Perfect 100 Lighthouse performance score'
    ],
    testimonial: {
      quote: 'The website has become our primary revenue driver. Customers love the experience, and the back-end integration with our POS system saves us hours every day.',
      author: 'Lisa Torres',
      role: 'Co-Founder, High Tide Collective'
    }
  },
  'northwind-tech': {
    title: 'Northwind Tech',
    category: 'Web Design',
    type: 'design',
    year: '2023',
    description: 'Marketing website for a SaaS startup.',
    client: 'Northwind Tech',
    services: ['Web Design', 'Development', 'Content Strategy', 'SEO'],
    duration: '10 weeks',
    overview: 'Northwind Tech offers project management software for distributed teams. As a early-stage startup, they needed a website that could clearly communicate their value proposition and convert free trial signups.',
    challenge: 'SaaS websites need to balance technical credibility with approachability. The site needed to explain complex features simply, showcase social proof despite being a young company, and optimize every element for conversion.',
    solution: 'We designed a conversion-focused website with clear messaging hierarchy, interactive product demos, and strategic CTAs throughout the journey. Benefit-driven copy, social proof placement, and a frictionless signup flow all optimized for conversion.',
    results: [
      'Free trial signups increased 215%',
      'Conversion rate improved from 2.3% to 8.1%',
      'Organic traffic up 180% in 6 months',
      'Average session duration increased 95%'
    ],
    testimonial: {
      quote: 'TD Studios didn\'t just design a website — they architected a conversion machine. Every element is intentional and drives toward signup. Our growth metrics speak for themselves.',
      author: 'David Park',
      role: 'CEO, Northwind Tech'
    }
  },
  'terra-bloom': {
    title: 'Terra Bloom',
    category: 'Cannabis / Branding',
    type: 'cannabis',
    year: '2023',
    description: 'Full brand identity and packaging for a wellness-focused cannabis brand.',
    client: 'Terra Bloom',
    services: ['Brand Strategy', 'Visual Identity', 'Packaging Design', 'Content Strategy'],
    duration: '12 weeks',
    overview: 'Terra Bloom is a cannabis wellness brand targeting health-conscious consumers, particularly women. They needed a brand that felt premium and wellness-oriented while being distinctly cannabis.',
    challenge: 'Cannabis brands often fall into one of two camps: medical/clinical or recreational/lifestyle. Terra Bloom needed to occupy a new space: approachable wellness. The brand needed to attract health-conscious consumers who might be new to cannabis.',
    solution: 'We developed a sophisticated brand identity inspired by botanical wellness brands. Soft, natural color palette, elegant typography, and botanical illustrations create a welcoming aesthetic. The packaging feels more like a premium skincare product than traditional cannabis packaging.',
    results: [
      'Launched in 45 retail locations in first month',
      'Female customers represent 70% of sales',
      'Featured in Vogue\'s Cannabis Wellness Guide',
      'Expansion to 3 new states in year one'
    ],
    testimonial: {
      quote: 'TD Studios created a brand that welcomes people who never thought cannabis was for them. The response from our target demographic has been overwhelming.',
      author: 'Amanda Foster',
      role: 'Founder, Terra Bloom'
    }
  },
  'cascade-financial': {
    title: 'Cascade Financial',
    category: 'Brand Identity',
    type: 'design',
    year: '2023',
    description: 'Rebrand for a financial services company.',
    client: 'Cascade Financial',
    services: ['Brand Strategy', 'Visual Identity', 'Brand Guidelines', 'Website Design'],
    duration: '16 weeks',
    overview: 'Cascade Financial is a boutique wealth management firm. After 15 years with their original brand, they needed a refresh to appeal to a younger generation of high-net-worth clients while maintaining trust with existing clients.',
    challenge: 'Financial services branding must balance innovation with trust. The rebrand needed to feel modern and forward-thinking without losing the gravitas and credibility that existing clients expect from their wealth advisor.',
    solution: 'We evolved the brand with a refined, contemporary identity that maintains equity in the Cascade name while introducing modern design elements. Sophisticated typography, strategic use of color, and professional photography create a brand that feels both established and progressive.',
    results: [
      'Client acquisition increased 55%',
      'Average client age decreased by 8 years',
      '95% positive feedback from existing clients',
      'Assets under management grew 40% year-over-year'
    ],
    testimonial: {
      quote: 'The rebrand struck the perfect balance. We\'re attracting younger clients without alienating our base. TD Studios navigated that challenge brilliantly.',
      author: 'Robert Hansen',
      role: 'Managing Director, Cascade Financial'
    }
  },
  'green-state-labs': {
    title: 'Green State Labs',
    category: 'Cannabis / Packaging',
    type: 'cannabis',
    year: '2023',
    description: 'Product line packaging for a cannabis testing laboratory.',
    client: 'Green State Labs',
    services: ['Packaging Design', 'Label Design', 'Brand System', 'Production Management'],
    duration: '6 weeks',
    overview: 'Green State Labs is a cannabis testing facility offering compliant testing services to cultivators and manufacturers. They needed packaging for their testing kits and sample containers that conveyed scientific credibility.',
    challenge: 'Laboratory packaging must communicate precision, compliance, and professionalism. The packaging needed to work in clinical settings while maintaining brand recognition and differentiating from competitors in a commoditized market.',
    solution: 'We designed a clean, scientific packaging system using clinical white with strategic color coding for different test types. Clear typography, intuitive labeling, and tamper-evident features create a system that\'s both functional and distinctive.',
    results: [
      'B2B sales increased 85%',
      'Sample contamination reduced to near-zero',
      'Adopted by 3 major MSOs as preferred testing partner',
      'Packaging system licensed to 2 out-of-state labs'
    ],
    testimonial: {
      quote: 'The packaging system is brilliant in its simplicity. It communicates exactly what we do and how we do it. Our clients trust the product before they even see results.',
      author: 'Dr. Michael Chen',
      role: 'Chief Science Officer, Green State Labs'
    }
  }
}

export async function generateMetadata({ params }) {
  const project = projects[params.slug]

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
  return Object.keys(projects).map((slug) => ({
    slug: slug,
  }))
}

export default function CaseStudy({ params }) {
  const project = projects[params.slug]

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
          background: 'linear-gradient(135deg, var(--charcoal) 0%, var(--black) 100%)',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '3rem',
          fontWeight: '700',
          color: 'var(--gray)'
        }}>
          {project.title.split(' ').map(word => word[0]).join('')}
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
                  color: project.type === 'cannabis' ? 'var(--sage)' : 'var(--gold)'
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
      <section className="cta">
        <div className="cta-bg"></div>
        <div className="cta-content">
          <h2 className="cta-title">Like what you see?</h2>
          <p className="cta-sub">Let's create something remarkable for your brand.</p>
          <div className="cta-buttons">
            <Link href="/contact" className="cta-button cta-button-primary">
              Start Your Project
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 10h12M12 6l4 4-4 4"/>
              </svg>
            </Link>
            <Link href="/work" className="cta-button cta-button-secondary">View More Work</Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
