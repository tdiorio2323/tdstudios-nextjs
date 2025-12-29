'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import PageLayout from '@/components/PageLayout'
import PageHeader from '@/components/PageHeader'
import FilterButton from '@/components/FilterButton'
import CTA from '@/components/CTA'
import { getCaseStudiesByType } from '@/lib/caseStudies'

export default function Work() {
  const [filter, setFilter] = useState('all')
  const filteredProjects = getCaseStudiesByType(filter)

  return (
    <PageLayout>
      <PageHeader
        label="Our Work"
        title="Projects that move the needle"
        description="A selection of our work across web design, brand identity, and cannabis packaging. Each project built to perform."
      />

      {/* Filter + Work Grid */}
      <section className="py-24 px-8 md:px-16">
        {/* Filter Buttons */}
        <div className="flex gap-4 mb-16 flex-wrap max-w-[1400px] mx-auto">
          <FilterButton
            label="All Projects"
            active={filter === 'all'}
            onClick={() => setFilter('all')}
            activeColor="white"
          />
          <FilterButton
            label="Web & Brand"
            active={filter === 'design'}
            onClick={() => setFilter('design')}
            activeColor="pink"
          />
          <FilterButton
            label="Cannabis"
            active={filter === 'cannabis'}
            onClick={() => setFilter('cannabis')}
            activeColor="purple"
          />
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-[1400px] mx-auto">
          {filteredProjects.map((project, index) => (
            <Link
              key={project.id}
              href={`/work/${project.slug}`}
              className="group block relative text-white"
            >
              <div className="w-full aspect-[16/10] bg-charcoal relative overflow-hidden mb-6">
                <Image
                  src={project.image}
                  alt={project.name}
                  width={1200}
                  height={750}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-95"
                />
                {/* Number Overlay */}
                <div className="absolute inset-0 flex items-center justify-center font-serif text-[2rem] italic text-white opacity-20">
                  {String(index + 1).padStart(2, '0')}
                </div>
              </div>
              <div className="flex justify-between items-start py-2">
                <div>
                  <div
                    className={`text-[0.7rem] font-semibold tracking-[0.15em] uppercase mb-2 ${
                      project.type === 'cannabis' ? 'text-purple' : 'text-pink'
                    }`}
                  >
                    {project.category}
                  </div>
                  <h3 className="font-serif text-2xl">{project.name}</h3>
                </div>
                <span className="text-gray text-[0.85rem]">{project.year}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <CTA
        title="Ready to join them?"
        subtitle="Let's discuss how we can help bring your vision to life."
        primaryButtonText="Start Your Project"
      />
    </PageLayout>
  )
}
