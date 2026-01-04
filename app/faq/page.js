'use client'

import { useState } from 'react'
import Link from 'next/link'
import PageLayout from '@/components/PageLayout'
import PageHeader from '@/components/PageHeader'

const faqs = [
  {
    category: 'General',
    questions: [
      {
        question: 'What services does TD Studios offer?',
        answer: 'We offer comprehensive digital services including website development, e-commerce solutions, brand identity design, and specialized cannabis industry branding and packaging. We handle everything from strategy and design to development and launch.',
      },
      {
        question: 'Where is TD Studios located?',
        answer: 'We\'re based in New York City, but we work with clients worldwide. Most of our communication happens via video calls, email, and our project management platform—making location irrelevant to the quality of work we deliver.',
      },
      {
        question: 'How long have you been in business?',
        answer: 'TD Studios has been creating digital experiences and brand identities for clients across industries since our founding. Our team brings years of combined experience from agencies, startups, and enterprise companies.',
      },
    ],
  },
  {
    category: 'Process & Timeline',
    questions: [
      {
        question: 'How long does a typical project take?',
        answer: 'Project timelines vary based on scope. A simple website might take 4-6 weeks, while a complex e-commerce platform or full brand identity could take 8-12 weeks. We\'ll provide a detailed timeline during our discovery process.',
      },
      {
        question: 'What does your process look like?',
        answer: 'We follow a structured six-phase process: Discovery, Strategy, Design, Development, Launch, and Growth. Each phase has clear deliverables and checkpoints to ensure we\'re aligned every step of the way.',
      },
      {
        question: 'How involved do I need to be during the project?',
        answer: 'We keep you informed with weekly updates and need your input at key decision points. Expect to dedicate 2-4 hours per week for feedback and approvals. We handle the heavy lifting—you provide the vision and direction.',
      },
    ],
  },
  {
    category: 'Pricing & Payment',
    questions: [
      {
        question: 'How much does a website cost?',
        answer: 'Our website projects typically start at $5,000 for a simple marketing site and scale up based on complexity. E-commerce solutions start at $10,000. We provide detailed quotes after understanding your specific needs during our discovery call.',
      },
      {
        question: 'Do you offer payment plans?',
        answer: 'Yes. We typically structure payments as 50% upfront and 50% at launch. For larger projects, we can arrange milestone-based payments. We accept credit cards, ACH transfers, and wire transfers.',
      },
      {
        question: 'Are there any ongoing costs after launch?',
        answer: 'This depends on your hosting and maintenance needs. We offer optional monthly support packages starting at $200/month that include hosting, updates, security monitoring, and priority support. These are completely optional.',
      },
    ],
  },
  {
    category: 'Technical',
    questions: [
      {
        question: 'What technologies do you use?',
        answer: 'We primarily build with Next.js and React for websites and web applications. For e-commerce, we work with Shopify, WooCommerce, and custom solutions. Our stack prioritizes performance, SEO, and maintainability.',
      },
      {
        question: 'Will I be able to update my website myself?',
        answer: 'Absolutely. We integrate user-friendly content management systems (CMS) that let you update text, images, blog posts, and products without touching code. We provide training to ensure you\'re comfortable managing your site.',
      },
      {
        question: 'Do you provide hosting?',
        answer: 'We can manage hosting for you through our preferred partners (Vercel, AWS, or Shopify), or deploy to your existing infrastructure. We recommend the approach that best fits your technical resources and budget.',
      },
    ],
  },
  {
    category: 'Cannabis Industry',
    questions: [
      {
        question: 'Do you specialize in cannabis branding?',
        answer: 'Yes, cannabis industry branding is one of our core specialties. We understand the unique regulatory requirements and have extensive experience creating compliant packaging that stands out on dispensary shelves.',
      },
      {
        question: 'Can you help with compliance?',
        answer: 'We stay current on cannabis packaging regulations across different states and can ensure your branding meets all compliance requirements. However, we always recommend final review by your legal counsel.',
      },
      {
        question: 'What cannabis services do you offer?',
        answer: 'We provide end-to-end cannabis branding: brand strategy, logo design, packaging design, label design, marketing collateral, and website development. We can handle your entire brand presence.',
      },
    ],
  },
]

export default function FAQ() {
  const [openItems, setOpenItems] = useState({})

  const toggleItem = (categoryIndex, questionIndex) => {
    const key = `${categoryIndex}-${questionIndex}`
    setOpenItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  return (
    <PageLayout>
      <PageHeader
        label="Questions"
        title="FAQ"
        description="Answers to common questions about working with TD Studios."
      />

      {/* FAQ Sections */}
      <section className="px-8 md:px-16 py-20">
        <div className="max-w-4xl mx-auto">
          {faqs.map((section, categoryIndex) => (
            <div key={section.category} className="mb-16 last:mb-0">
              <h2 className="font-serif text-2xl md:text-3xl text-purple mb-8">
                {section.category}
              </h2>

              <div className="space-y-4">
                {section.questions.map((item, questionIndex) => {
                  const key = `${categoryIndex}-${questionIndex}`
                  const isOpen = openItems[key]

                  return (
                    <div
                      key={questionIndex}
                      className="border border-charcoal hover:border-purple/30 transition-colors duration-300"
                    >
                      <button
                        onClick={() => toggleItem(categoryIndex, questionIndex)}
                        className="w-full flex items-center justify-between p-6 text-left"
                      >
                        <span className="font-medium text-white pr-8">
                          {item.question}
                        </span>
                        <span
                          className={`flex-shrink-0 w-6 h-6 flex items-center justify-center text-purple transition-transform duration-300 ${
                            isOpen ? 'rotate-45' : ''
                          }`}
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </span>
                      </button>

                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          isOpen ? 'max-h-96' : 'max-h-0'
                        }`}
                      >
                        <p className="px-6 pb-6 text-gray leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section className="px-8 md:px-16 py-20 border-t border-charcoal">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl mb-4">
            Still have questions?
          </h2>
          <p className="text-gray mb-8">
            We&apos;re happy to chat. Reach out and we&apos;ll get back to you within 24 hours.
          </p>
          <Link
            href="/contact"
            className="inline-block px-10 py-4 bg-white text-black font-semibold tracking-wider uppercase text-sm hover:bg-purple hover:text-white transition-all duration-300"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </PageLayout>
  )
}
