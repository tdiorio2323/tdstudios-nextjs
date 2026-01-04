import Link from 'next/link'
import PageLayout from '@/components/PageLayout'
import PageHeader from '@/components/PageHeader'

export const metadata = {
  title: 'Our Process',
  description: 'How we work: from discovery to launch. A transparent, collaborative approach to building exceptional digital experiences.',
}

const steps = [
  {
    number: '01',
    title: 'Discovery',
    duration: 'Week 1',
    description: 'We dig deep into your business, audience, and goals. This is where we learn what makes you different and how to amplify it.',
    deliverables: [
      'Stakeholder interviews',
      'Competitive analysis',
      'User research synthesis',
      'Project scope document',
    ],
  },
  {
    number: '02',
    title: 'Strategy',
    duration: 'Week 2',
    description: 'Armed with insights, we map out the architecture, user flows, and content strategy that will drive results.',
    deliverables: [
      'Information architecture',
      'User journey mapping',
      'Content strategy',
      'Technical requirements',
    ],
  },
  {
    number: '03',
    title: 'Design',
    duration: 'Weeks 3-4',
    description: 'This is where vision becomes visual. We create designs that look stunning and work flawlessly across every device.',
    deliverables: [
      'Wireframes & prototypes',
      'Visual design concepts',
      'Design system components',
      'Interactive mockups',
    ],
  },
  {
    number: '04',
    title: 'Development',
    duration: 'Weeks 5-7',
    description: 'Clean code, fast performance, bulletproof functionality. We build with precision and test obsessively.',
    deliverables: [
      'Frontend development',
      'Backend integration',
      'CMS setup & training',
      'Quality assurance',
    ],
  },
  {
    number: '05',
    title: 'Launch',
    duration: 'Week 8',
    description: 'The moment of truth. We handle deployment, optimization, and make sure everything runs perfectly.',
    deliverables: [
      'Production deployment',
      'Performance optimization',
      'SEO configuration',
      'Analytics setup',
    ],
  },
  {
    number: '06',
    title: 'Growth',
    duration: 'Ongoing',
    description: 'Launch is just the beginning. We provide ongoing support, updates, and optimization to keep you ahead.',
    deliverables: [
      'Maintenance & updates',
      'Performance monitoring',
      'Conversion optimization',
      'Feature enhancements',
    ],
  },
]

export default function Process() {
  return (
    <PageLayout>
      <PageHeader
        label="How We Work"
        title="Our Process"
        description="Transparent, collaborative, and results-driven. Here's how we turn your vision into reality."
      />

      {/* Process Steps */}
      <section className="px-8 md:px-16 py-20">
        <div className="max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <ProcessStep key={step.number} step={step} isLast={index === steps.length - 1} />
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section className="px-8 md:px-16 py-20 border-t border-charcoal">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-serif text-3xl md:text-5xl mb-16 text-center">
            What you can <span className="italic text-purple">expect</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ValueCard
              title="Transparent Communication"
              description="Weekly updates, shared project boards, and direct access to your team. No surprises, no ghosting."
            />
            <ValueCard
              title="Fixed Pricing"
              description="Know exactly what you're paying upfront. No hourly billing, no scope creep charges, no hidden fees."
            />
            <ValueCard
              title="Guaranteed Timelines"
              description="We commit to deadlines and we keep them. Your launch date is sacred."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-8 md:px-16 py-32 border-t border-charcoal">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-4xl md:text-6xl mb-6">
            Let&apos;s start the <span className="italic text-pink">conversation</span>
          </h2>
          <p className="text-lg text-gray mb-12 max-w-2xl mx-auto">
            Ready to see how we can help? Schedule a discovery call and let&apos;s explore your project together.
          </p>
          <Link
            href="/contact"
            className="inline-block px-12 py-5 bg-white text-black font-semibold tracking-wider uppercase text-sm hover:bg-purple hover:text-white transition-all duration-300"
          >
            Schedule a Call
          </Link>
        </div>
      </section>
    </PageLayout>
  )
}

function ProcessStep({ step, isLast }) {
  return (
    <div className="relative pl-8 md:pl-16 pb-16">
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-0 top-8 bottom-0 w-px bg-gradient-to-b from-purple to-transparent" />
      )}

      {/* Timeline dot */}
      <div className="absolute left-0 top-2 w-2 h-2 rounded-full bg-purple transform -translate-x-1/2" />

      {/* Content */}
      <div className="group">
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <span className="text-sm text-purple tracking-[0.2em] font-medium">
            {step.number}
          </span>
          <span className="text-sm text-gray tracking-wider">
            {step.duration}
          </span>
        </div>

        <h3 className="font-serif text-3xl md:text-4xl mb-4 text-white group-hover:text-purple transition-colors duration-300">
          {step.title}
        </h3>

        <p className="text-gray text-lg leading-relaxed mb-6 max-w-2xl">
          {step.description}
        </p>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {step.deliverables.map((item, index) => (
            <li key={index} className="flex items-center gap-3 text-light-gray">
              <svg className="w-4 h-4 text-purple flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function ValueCard({ title, description }) {
  return (
    <div className="p-8 border border-charcoal hover:border-purple/30 transition-colors duration-300">
      <h3 className="font-serif text-xl mb-4 text-white">{title}</h3>
      <p className="text-gray leading-relaxed">{description}</p>
    </div>
  )
}
