import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import CTA from '@/components/CTA'

export const metadata = {
  title: 'Website Design & Development',
  description: 'Custom website design and development services. We create high-performance websites that convert visitors into customers and scale with your business.',
}

export default function Websites() {
  return (
    <>
      <Navigation />

      {/* Websites Hero */}
      <section className="about-hero">
        <div className="about-hero-content">
          <div className="section-label">Web Design & Development</div>
          <h1 className="page-title">Websites that work as hard as you do</h1>
          <p className="about-hero-text">
            Your website is often the first impression customers have of your brand. We design and build custom websites that don&apos;t just look beautiful — they&apos;re strategically crafted to engage visitors, communicate your value, and drive real business results.
          </p>
          <p className="about-hero-text" style={{ marginTop: '1.5rem' }}>
            From marketing sites to full e-commerce platforms, we handle everything from initial strategy and UX design through development and launch. Every site is built with performance, SEO, and scalability in mind.
          </p>
        </div>
        <div className="about-hero-visual">
          <div className="approach-shape"></div>
          <div className="approach-shape"></div>
          <div className="approach-shape"></div>
        </div>
      </section>

      {/* Services Section */}
      <section className="about-values">
        <div className="about-values-header">
          <div className="section-label">What We Build</div>
          <h2 className="section-title">Website solutions for every need</h2>
        </div>

        <div className="values-grid">
          <div className="value-card">
            <div className="value-number">01</div>
            <h3 className="value-title">Marketing Websites</h3>
            <p className="value-desc">Lead-generating websites built to tell your story, showcase your services, and convert visitors into customers. Optimized for search engines and built for performance.</p>
          </div>

          <div className="value-card">
            <div className="value-number">02</div>
            <h3 className="value-title">E-Commerce</h3>
            <p className="value-desc">Custom online stores designed to sell. Seamless shopping experiences with secure payments, inventory management, and analytics to grow your online business.</p>
          </div>

          <div className="value-card">
            <div className="value-number">03</div>
            <h3 className="value-title">Web Applications</h3>
            <p className="value-desc">Complex web platforms and SaaS products. We build scalable, user-friendly applications that solve real problems and delight users.</p>
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="approach">
        <div className="approach-grid">
          <div className="approach-content">
            <div className="section-label">Our Approach</div>
            <h2 className="section-title">Built to perform from day one</h2>
            <p className="approach-text">We combine strategic thinking, exceptional design, and technical excellence to create websites that deliver measurable results.</p>

            <div className="approach-features">
              <div className="feature">
                <div className="feature-number">01</div>
                <div className="feature-content">
                  <h4>Strategy & UX</h4>
                  <p>Before we design a single pixel, we map out user journeys, information architecture, and conversion funnels that align with your business goals.</p>
                </div>
              </div>
              <div className="feature">
                <div className="feature-number">02</div>
                <div className="feature-content">
                  <h4>Premium Design</h4>
                  <p>Every detail crafted to reflect your brand and engage your audience. Responsive, accessible, and built to modern web standards.</p>
                </div>
              </div>
              <div className="feature">
                <div className="feature-number">03</div>
                <div className="feature-content">
                  <h4>Performance & SEO</h4>
                  <p>Lightning-fast load times, search-engine optimized, and built for conversion. We don&apos;t just launch — we deliver results.</p>
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
      <CTA
        title="Ready for a website that converts?"
        subtitle="Let's discuss your project and how we can help you achieve your goals."
        primaryButtonText="Start a Project"
        secondaryButtonText="View Our Work"
      />

      <Footer />
    </>
  )
}
