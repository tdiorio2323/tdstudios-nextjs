import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'

export const metadata = {
  title: 'About',
  description: 'TD Studios is a New York-based design agency creating premium websites, brand identities, and packaging. Learn about our approach and values.',
}

export default function About() {
  return (
    <>
      <Navigation />

      {/* About Hero */}
      <section className="about-hero">
        <div className="about-hero-content">
          <div className="section-label">About TD Studios</div>
          <h1 className="page-title">Built different for brands that refuse to blend in</h1>
          <p className="about-hero-text">
            TD Studios is a New York-based design agency creating premium websites, brand identities, and packaging for companies that demand more than average. We bring the same obsessive attention to detail to every project — whether it&apos;s a tech startup or a cannabis brand.
          </p>
          <p className="about-hero-text" style={{ marginTop: '1.5rem' }}>
            We&apos;ve built a unique position in the market: a full-service creative studio with genuine expertise in the cannabis industry. We know the regulations inside and out, we understand compliance requirements, and we know exactly what it takes to build a brand that dominates in a crowded market.
          </p>
        </div>
        <div className="about-hero-visual">
          <div className="approach-shape"></div>
          <div className="approach-shape"></div>
          <div className="approach-shape"></div>
        </div>
      </section>

      {/* Values Section */}
      <section className="about-values">
        <div className="about-values-header">
          <div className="section-label">Our Values</div>
          <h2 className="section-title">What drives everything we do</h2>
        </div>

        <div className="values-grid">
          <div className="value-card">
            <div className="value-number">01</div>
            <h3 className="value-title">Strategy First</h3>
            <p className="value-desc">Beautiful design without purpose is just decoration. Every project starts with understanding your business, your market, and what winning looks like for you.</p>
          </div>

          <div className="value-card">
            <div className="value-number">02</div>
            <h3 className="value-title">Craft Matters</h3>
            <p className="value-desc">The details make the difference. We obsess over typography, spacing, color, and micro-interactions because that&apos;s what separates forgettable from unforgettable.</p>
          </div>

          <div className="value-card">
            <div className="value-number">03</div>
            <h3 className="value-title">Results Driven</h3>
            <p className="value-desc">Design should move the needle. We measure our success by your success — more conversions, stronger brand recognition, measurable business growth.</p>
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="approach">
        <div className="approach-grid">
          <div className="approach-content">
            <div className="section-label">Our Process</div>
            <h2 className="section-title">How we bring your vision to life</h2>
            <p className="approach-text">Every project follows a proven process designed to deliver exceptional results efficiently and collaboratively. No surprises, no wasted time.</p>
            
            <div className="approach-features">
              <div className="feature">
                <div className="feature-number">01</div>
                <div className="feature-content">
                  <h4>Discovery</h4>
                  <p>We dive deep into your business, audience, and competition to uncover the insights that will drive strategy and creative direction.</p>
                </div>
              </div>
              <div className="feature">
                <div className="feature-number">02</div>
                <div className="feature-content">
                  <h4>Strategy & Concept</h4>
                  <p>We develop the strategic foundation and explore creative directions before committing to execution. Smart decisions made early.</p>
                </div>
              </div>
              <div className="feature">
                <div className="feature-number">03</div>
                <div className="feature-content">
                  <h4>Design & Refine</h4>
                  <p>Iterative design with your feedback integrated at every step. We collaborate closely so there are no surprises at the finish line.</p>
                </div>
              </div>
              <div className="feature">
                <div className="feature-number">04</div>
                <div className="feature-content">
                  <h4>Launch & Support</h4>
                  <p>We ensure a flawless launch and provide ongoing support to help your brand continue to grow and evolve.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="approach-visual">
            <div className="approach-shape"></div>
            <div className="approach-shape"></div>
            <div className="approach-shape"></div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="cta-bg"></div>
        <div className="cta-content">
          <h2 className="cta-title">Ready to get started?</h2>
          <p className="cta-sub">Let&apos;s talk about your project and see how we can help.</p>
          <div className="cta-buttons">
            <Link href="/contact" className="cta-button cta-button-primary">
              Start a Project
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 10h12M12 6l4 4-4 4"/>
              </svg>
            </Link>
            <Link href="/work" className="cta-button cta-button-secondary">View Work</Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
