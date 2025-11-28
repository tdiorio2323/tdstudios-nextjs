import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'
import { heroVisual, portfolioProjects, serviceIcons } from '@/lib/visuals'

export default function Home() {
  return (
    <>
      <Navigation />

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg">
          <Image
            src={heroVisual.src}
            alt={heroVisual.alt}
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />
        </div>
        <div className="hero-content">
          <div className="hero-label">Web Design & Branding Studio — New York</div>
          <h1 className="hero-title">
            <span className="line"><span>Design that <em className="accent-gold">builds</em></span></span>
            <span className="line"><span>brands <em className="accent-sage">& business</em></span></span>
          </h1>
          <p className="hero-sub">We create premium websites, brand identities, and packaging for ambitious companies — with specialized expertise in the cannabis industry.</p>
          <div className="hero-tags">
            <span className="hero-tag">Web Design</span>
            <span className="hero-tag">Brand Identity</span>
            <span className="hero-tag">Packaging</span>
            <span className="hero-tag">Cannabis</span>
          </div>
        </div>
        <div className="scroll-indicator">
          <span>Scroll</span>
          <div className="scroll-line"></div>
        </div>
      </section>

      {/* Two Pillars Section */}
      <section className="pillars" id="pillars">
        <div className="pillars-header">
          <div className="section-label">Two Specialties, One Studio</div>
          <h2 className="section-title">Premium creative across industries</h2>
        </div>

        <div className="pillars-grid">
          <div className="pillar pillar-design">
            <div className="pillar-icon"></div>
            <div className="pillar-label">Creative Services</div>
            <h3 className="pillar-title">Web & Brand Design</h3>
            <p className="pillar-desc">High-performance websites and visual identities for ambitious brands. We craft digital experiences that convert visitors into customers — built on strategy, refined through meticulous design.</p>
            <ul className="pillar-services">
              <li>Website Design</li>
              <li>Web Development</li>
              <li>Brand Identity</li>
              <li>Logo Design</li>
              <li>UI/UX Design</li>
              <li>Graphic Design</li>
            </ul>
          </div>

          <div className="pillar pillar-cannabis">
            <div className="pillar-icon"></div>
            <div className="pillar-label">Industry Expertise</div>
            <h3 className="pillar-title">Cannabis Branding</h3>
            <p className="pillar-desc">Specialized creative for the cannabis market. We navigate the regulations, understand the nuances, and seize the opportunity. Compliant packaging and branding that commands shelf presence and builds lasting brand equity.</p>
            <ul className="pillar-services">
              <li>Packaging Design</li>
              <li>Compliant Branding</li>
              <li>Product Labels</li>
              <li>Dispensary Websites</li>
              <li>Visual Systems</li>
              <li>Brand Strategy</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services" id="services">
        <div className="services-header">
          <div>
            <div className="section-label">What We Do</div>
            <h2 className="section-title">Services</h2>
          </div>
        </div>

        <div className="services-grid">
          <div className="service-card">
            <div className="flex justify-between items-start mb-8">
              <div className="service-number">01</div>
              <Image
                src={serviceIcons["website-design"] ?? "/placeholders/icon-fallback.svg"}
                alt="Web Design"
                width={32}
                height={32}
                className="h-8 w-8 opacity-80"
              />
            </div>
            <h3 className="service-title">Web Design</h3>
            <p className="service-desc">Custom websites engineered for performance and conversion. From marketing sites to e-commerce platforms, designed to engage your audience and built to scale with your business.</p>
          </div>

          <div className="service-card">
            <div className="flex justify-between items-start mb-8">
              <div className="service-number">02</div>
              <Image
                src={serviceIcons["brand-identity"] ?? "/placeholders/icon-fallback.svg"}
                alt="Brand Identity"
                width={32}
                height={32}
                className="h-8 w-8 opacity-80"
              />
            </div>
            <h3 className="service-title">Brand Identity</h3>
            <p className="service-desc">Complete visual systems from logo to brand guidelines. We build strategic brand foundations that differentiate you from competitors and forge real connections with your audience.</p>
          </div>

          <div className="service-card">
            <div className="flex justify-between items-start mb-8">
              <div className="service-number">03</div>
              <Image
                src={serviceIcons["packaging-design"] ?? "/placeholders/icon-fallback.svg"}
                alt="Packaging Design"
                width={32}
                height={32}
                className="h-8 w-8 opacity-80"
              />
            </div>
            <h3 className="service-title">Packaging Design</h3>
            <p className="service-desc">Product packaging that sells itself on the shelf. We specialize in compliant cannabis packaging that builds instant recognition and earns consumer trust.</p>
          </div>

          <div className="service-card">
            <div className="flex justify-between items-start mb-8">
              <div className="service-number">04</div>
              <Image
                src={serviceIcons["graphic-design"] ?? "/placeholders/icon-fallback.svg"}
                alt="Graphic Design"
                width={32}
                height={32}
                className="h-8 w-8 opacity-80"
              />
            </div>
            <h3 className="service-title">Graphic Design</h3>
            <p className="service-desc">Marketing collateral, print materials, and visual assets that extend your brand consistently across every customer touchpoint.</p>
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section className="work" id="work">
        <div className="work-header">
          <div>
            <div className="section-label">Selected Work</div>
            <h2 className="section-title">Recent projects</h2>
          </div>
          <Link href="/work" className="view-all">
            View All
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 10h12M12 6l4 4-4 4"/>
            </svg>
          </Link>
        </div>

        <div className="work-grid">
          {portfolioProjects.slice(0, 4).map((project, index) => (
            <Link
              key={project.slug}
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
                  priority={index < 2}
                />
                <div className="work-image-inner">{String(index + 1).padStart(2, '0')}</div>
              </div>
              <div className="work-info">
                <div>
                  <div
                    className="work-category"
                    style={{ color: project.type === 'cannabis' ? 'var(--sage)' : 'var(--gold)' }}
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

      {/* Marquee */}
      <section className="marquee-section">
        <div className="marquee">
          <div className="marquee-content">
            <span className="marquee-item">Web Design</span>
            <div className="marquee-dot gold"></div>
            <span className="marquee-item">Branding</span>
            <div className="marquee-dot sage"></div>
            <span className="marquee-item">Packaging</span>
            <div className="marquee-dot gold"></div>
            <span className="marquee-item">Cannabis</span>
            <div className="marquee-dot sage"></div>
            <span className="marquee-item">Identity</span>
            <div className="marquee-dot gold"></div>
            <span className="marquee-item">Strategy</span>
            <div className="marquee-dot sage"></div>
          </div>
          <div className="marquee-content">
            <span className="marquee-item">Web Design</span>
            <div className="marquee-dot gold"></div>
            <span className="marquee-item">Branding</span>
            <div className="marquee-dot sage"></div>
            <span className="marquee-item">Packaging</span>
            <div className="marquee-dot gold"></div>
            <span className="marquee-item">Cannabis</span>
            <div className="marquee-dot sage"></div>
            <span className="marquee-item">Identity</span>
            <div className="marquee-dot gold"></div>
            <span className="marquee-item">Strategy</span>
            <div className="marquee-dot sage"></div>
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="approach" id="approach">
        <div className="approach-grid">
          <div className="approach-content">
            <div className="section-label">Our Approach</div>
            <h2 className="section-title">Strategy-first design that delivers results</h2>
            <p className="approach-text">We don&apos;t just make things look good — we build brands that perform. Every project begins with understanding your business, your audience, and what success looks like for you.</p>
            
            <div className="approach-features">
              <div className="feature">
                <div className="feature-number">01</div>
                <div className="feature-content">
                  <h4>Strategic Foundation</h4>
                  <p>Research and strategy before pixels. We understand your market, competitors, and customers before we design anything.</p>
                </div>
              </div>
              <div className="feature">
                <div className="feature-number">02</div>
                <div className="feature-content">
                  <h4>Premium Execution</h4>
                  <p>Every detail refined. We obsess over typography, spacing, and interactions because the details separate good from exceptional.</p>
                </div>
              </div>
              <div className="feature">
                <div className="feature-number">03</div>
                <div className="feature-content">
                  <h4>Built to Perform</h4>
                  <p>Design that drives business outcomes. Websites that convert, packaging that sells, brands that resonate and endure.</p>
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
          <h2 className="cta-title">Ready to elevate <em>your brand?</em></h2>
          <p className="cta-sub">Whether you&apos;re launching something new or leveling up what you&apos;ve built, we&apos;re here to help you stand out.</p>
          <div className="cta-buttons">
            <Link href="/contact" className="cta-button cta-button-primary">
              Start a Project
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 10h12M12 6l4 4-4 4"/>
              </svg>
            </Link>
            <Link href="/work" className="cta-button cta-button-secondary">View Our Work</Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
