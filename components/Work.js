import Link from 'next/link'
import Image from 'next/image'
import { caseStudies } from '@/lib/caseStudies'

export default function Work() {
  return (
    <section className="py-32 px-8 md:px-16" id="work">
      <div className="flex flex-wrap justify-between items-end mb-20 gap-8">
        <div>
          <div className="text-xs font-semibold tracking-[0.3em] uppercase text-gray mb-6">Selected Work</div>
          <h2 className="font-serif text-[clamp(2.5rem,5vw,4rem)] leading-[1.1] text-white">Recent projects</h2>
        </div>
        <Link href="/work" className="group inline-flex items-center gap-3 text-[0.85rem] font-medium tracking-wider uppercase text-white hover:gap-5 transition-all duration-300">
          View All
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5">
            <path d="M4 10h12M12 6l4 4-4 4"/>
          </svg>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {caseStudies.slice(0, 4).map((project, index) => (
          <Link
            key={project.slug}
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
                priority={index < 2}
              />
              {/* Overlay */}
              <div className={`absolute inset-0 opacity-40 ${index % 2 === 0 ? 'bg-[linear-gradient(135deg,rgba(201,162,39,0.3)_0%,transparent_60%)]' : 'bg-[linear-gradient(135deg,rgba(139,154,125,0.3)_0%,transparent_60%)]'}`} />
              
              {/* Number */}
              <div className="absolute inset-0 flex items-center justify-center font-serif text-[2rem] italic text-white opacity-20">
                {String(index + 1).padStart(2, '0')}
              </div>
            </div>

            <div className="flex justify-between items-start py-2">
              <div>
                <div
                  className={`text-[0.7rem] font-semibold tracking-[0.15em] uppercase mb-2 ${project.type === 'cannabis' ? 'text-purple' : 'text-pink'}`}
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
  )
}
