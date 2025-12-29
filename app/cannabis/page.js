import PageLayout from '@/components/PageLayout'
import CTA from '@/components/CTA'
import Image from 'next/image'
import { cannabisShots } from '@/lib/visuals'

export const metadata = {
  title: 'Cannabis Branding & Packaging',
  description: 'Specialized cannabis branding and packaging design services. Compliant, shelf-ready designs that build brand equity and drive sales in the cannabis industry.',
}

export default function Cannabis() {
  return (
    <PageLayout>
      {/* Cannabis Hero */}
      <section className="about-hero">
        <div className="about-hero-content">
          <div className="section-label">Cannabis Branding & Packaging</div>
          <h1 className="page-title">Cannabis branding that stands out on the shelf</h1>
          <p className="about-hero-text">
            The cannabis market is crowded and competitive. Standing out requires more than just meeting compliance requirements — it demands strategic branding, exceptional design, and deep industry knowledge. That&apos;s exactly what we bring to every project.
          </p>
          <p className="about-hero-text" style={{ marginTop: '1.5rem' }}>
            We&apos;ve worked extensively in the cannabis industry, from dispensaries to cultivators to product brands. We understand the regulations, the market dynamics, and what it takes to build a cannabis brand that earns consumer trust and commands premium pricing.
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
          <div className="section-label">Cannabis Services</div>
          <h2 className="section-title">Everything you need to launch and grow</h2>
        </div>

        <div className="values-grid">
          <div className="value-card">
            <div className="value-number">01</div>
            <h3 className="value-title">Brand Identity</h3>
            <p className="value-desc">Complete cannabis brand systems from logo to visual guidelines. Strategic positioning that differentiates you in a crowded market and resonates with your target audience.</p>
          </div>

          <div className="value-card">
            <div className="value-number">02</div>
            <h3 className="value-title">Packaging Design</h3>
            <p className="value-desc">Compliant packaging that sells. From flower jars to pre-roll tubes to edible boxes, we create shelf-ready designs that build instant recognition and drive purchase decisions.</p>
          </div>

          <div className="value-card">
            <div className="value-number">03</div>
            <h3 className="value-title">Dispensary Websites</h3>
            <p className="value-desc">Custom websites for cannabis retailers. Integrated with your POS system, menu management, and e-commerce — all while maintaining regulatory compliance.</p>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="approach">
        <div className="approach-grid">
          <div className="approach-content">
            <div className="section-label">Why Choose Us</div>
            <h2 className="section-title">Cannabis industry expertise you can trust</h2>
            <p className="approach-text">We&apos;re not generalists dabbling in cannabis — we&apos;ve built brands in this space and understand the unique challenges and opportunities.</p>

            <div className="approach-features">
              <div className="feature">
                <div className="feature-number">01</div>
                <div className="feature-content">
                  <h4>Compliance First</h4>
                  <p>We know the regulations inside and out. Every design meets state requirements for labeling, warnings, and restrictions — no surprises at print time.</p>
                </div>
              </div>
              <div className="feature">
                <div className="feature-number">02</div>
                <div className="feature-content">
                  <h4>Shelf Presence</h4>
                  <p>Design that converts browsers to buyers. We create packaging that commands attention and communicates quality in the critical first impression.</p>
                </div>
              </div>
              <div className="feature">
                <div className="feature-number">03</div>
                <div className="feature-content">
                  <h4>Brand Equity</h4>
                  <p>We build brands built to last. Strategic positioning and consistent execution that creates recognition, loyalty, and premium pricing power.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="approach-visual">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', height: '100%' }}>
              {cannabisShots.slice(0, 4).map((shot, index) => (
                <div
                  key={shot.src}
                  style={{
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: '12px',
                    border: '1px solid rgba(167, 139, 250, 0.2)',
                    height: index < 2 ? '240px' : '220px'
                  }}
                >
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 300px"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTA
        title="Ready to build your cannabis brand?"
        subtitle="Let's discuss your vision and how we can help you stand out in the market."
        primaryButtonText="Start a Project"
        secondaryButtonText="View Our Work"
      />
    </PageLayout>
  )
}
