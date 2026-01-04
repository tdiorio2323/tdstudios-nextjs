import Link from 'next/link'
import PageLayout from '@/components/PageLayout'
import PageHeader from '@/components/PageHeader'

export const metadata = {
  title: 'Services',
  description: 'Full-service website design, development, e-commerce solutions, and brand identity. Specializing in cannabis industry branding and compliant packaging.',
}

const services = [
  {
    number: '01',
    title: 'Website Development',
    description: 'Custom websites built for performance, SEO, and conversions. From landing pages to complex web applications.',
    features: [
      'Custom Next.js & React Development',
      'Responsive Mobile-First Design',
      'Performance Optimization',
      'SEO & Core Web Vitals',
      'CMS Integration',
      'API Development',
    ],
    href: '/contact',
    color: 'purple',
  },
  {
    number: '02',
    title: 'E-Commerce',
    description: 'Online stores that convert browsers into buyers. Built for scale with seamless checkout experiences.',
    features: [
      'Shopify Development',
      'WooCommerce Solutions',
      'Custom E-commerce Platforms',
      'Payment Integration',
      'Inventory Management',
      'Conversion Optimization',
    ],
    href: '/contact',
    color: 'pink',
  },
  {
    number: '03',
    title: 'Brand Identity',
    description: 'Memorable brands that stand out. From logo design to complete visual systems that tell your story.',
    features: [
      'Logo Design',
      'Brand Guidelines',
      'Visual Identity Systems',
      'Typography Selection',
      'Color Palette Development',
      'Brand Strategy',
    ],
    href: '/contact',
    color: 'purple',
  },
  {
    number: '04',
    title: 'Cannabis Branding',
    description: 'Industry-specialized branding and compliant packaging design that dominates dispensary shelves.',
    features: [
      'Compliant Packaging Design',
      'Product Label Design',
      'Dispensary Branding',
      'Marketing Collateral',
      'Brand Positioning',
      'Regulatory Compliance',
    ],
    href: '/contact',
    color: 'pink',
  },
]

export default function Services() {
  return (
    <PageLayout>
      <PageHeader
        label="What We Do"
        title="Services"
        description="Full-service digital solutions for brands that refuse to blend in. From concept to launch, we build what others can't."
      />

      {/* Services Grid */}
      <section className="px-8 md:px-16 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {services.map((service) => (
              <ServiceCard key={service.number} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-8 md:px-16 py-32 border-t border-charcoal">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-4xl md:text-6xl mb-6">
            Ready to build something <span className="italic text-purple">remarkable</span>?
          </h2>
          <p className="text-lg text-gray mb-12 max-w-2xl mx-auto">
            Every project starts with a conversation. Tell us about your vision and let&apos;s explore what&apos;s possible.
          </p>
          <Link
            href="/contact"
            className="inline-block px-12 py-5 bg-white text-black font-semibold tracking-wider uppercase text-sm hover:bg-purple hover:text-white transition-all duration-300"
          >
            Start Your Project
          </Link>
        </div>
      </section>
    </PageLayout>
  )
}

function ServiceCard({ service }) {
  const borderColor = service.color === 'pink' ? 'hover:border-pink/50' : 'hover:border-purple/50'
  const accentColor = service.color === 'pink' ? 'text-pink' : 'text-purple'
  const lineColor = service.color === 'pink' ? 'bg-pink' : 'bg-purple'

  return (
    <div className={`group relative p-8 md:p-12 border border-charcoal ${borderColor} transition-all duration-500 bg-black`}>
      {/* Number */}
      <span className={`text-sm ${accentColor} tracking-[0.2em] font-medium`}>
        {service.number}
      </span>

      {/* Title */}
      <h3 className="font-serif text-3xl md:text-4xl mt-4 mb-4 text-white">
        {service.title}
      </h3>

      {/* Description */}
      <p className="text-gray text-lg leading-relaxed mb-8">
        {service.description}
      </p>

      {/* Features */}
      <ul className="space-y-3 mb-8">
        {service.features.map((feature, index) => (
          <li key={index} className="flex items-center gap-3 text-light-gray">
            <span className={`w-1.5 h-1.5 rounded-full ${lineColor}`} />
            {feature}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link
        href={service.href}
        className={`inline-flex items-center gap-2 text-sm font-medium ${accentColor} tracking-wider uppercase group-hover:gap-4 transition-all duration-300`}
      >
        Get Started
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </Link>

      {/* Hover line */}
      <div className={`absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 ${lineColor}`} />
    </div>
  )
}
