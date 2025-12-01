import Link from 'next/link'

export function Marquee() {
  return (
    <section className="py-12 border-y border-charcoal overflow-hidden bg-black">
      <div className="flex whitespace-nowrap animate-[marquee_20s_linear_infinite]">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex items-center gap-8 mx-4">
            <span className="text-4xl md:text-6xl font-serif text-charcoal uppercase opacity-50">Web Design</span>
            <div className="w-3 h-3 rounded-full bg-pink"></div>
            <span className="text-4xl md:text-6xl font-serif text-charcoal uppercase opacity-50">Branding</span>
            <div className="w-3 h-3 rounded-full bg-purple"></div>
            <span className="text-4xl md:text-6xl font-serif text-charcoal uppercase opacity-50">Packaging</span>
            <div className="w-3 h-3 rounded-full bg-pink"></div>
            <span className="text-4xl md:text-6xl font-serif text-charcoal uppercase opacity-50">Cannabis</span>
            <div className="w-3 h-3 rounded-full bg-purple"></div>
            <span className="text-4xl md:text-6xl font-serif text-charcoal uppercase opacity-50">Identity</span>
            <div className="w-3 h-3 rounded-full bg-pink"></div>
            <span className="text-4xl md:text-6xl font-serif text-charcoal uppercase opacity-50">Strategy</span>
            <div className="w-3 h-3 rounded-full bg-purple"></div>
          </div>
        ))}
      </div>
    </section>
  )
}

export function Approach() {
  return (
    <section className="py-32 px-8 md:px-16 bg-charcoal" id="approach">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
        <div>
          <div className="text-xs font-semibold tracking-[0.3em] uppercase text-gray mb-6">Our Approach</div>
          <h2 className="font-serif text-[clamp(2.5rem,5vw,4rem)] leading-[1.1] text-white mb-8">Strategy-first design that delivers results</h2>
          <p className="text-gray leading-[1.8] mb-12 text-lg">
            We don&apos;t just make things look good — we build brands that perform. Every project begins with understanding your business, your audience, and what success looks like for you.
          </p>
          
          <div className="grid gap-10">
            {[
              { num: '01', title: 'Strategic Foundation', desc: 'Research and strategy before pixels. We understand your market, competitors, and customers before we design anything.' },
              { num: '02', title: 'Premium Execution', desc: 'Every detail refined. We obsess over typography, spacing, and interactions because the details separate good from exceptional.' },
              { num: '03', title: 'Built to Perform', desc: 'Design that drives business outcomes. Websites that convert, packaging that sells, brands that resonate and endure.' }
            ].map((item) => (
              <div key={item.num} className="flex gap-6 items-start">
                <div className="font-serif text-2xl text-gray leading-none min-w-[30px]">{item.num}</div>
                <div>
                  <h4 className="text-base font-semibold text-white mb-2">{item.title}</h4>
                  <p className="text-gray text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Visual Placeholder */}
        <div className="relative h-[500px] w-full bg-black/50 rounded-lg overflow-hidden border border-white/5">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(244,114,182,0.1),transparent_70%)]" />
        </div>
      </div>
    </section>
  )
}

export function CTA() {
  return (
    <section className="relative py-40 px-8 text-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black to-charcoal z-0" />
      <div className="relative z-10 max-w-3xl mx-auto">
        <h2 className="font-serif text-[clamp(3rem,6vw,5rem)] leading-tight mb-6 text-white">
          Ready to elevate <em className="italic text-pink">your brand?</em>
        </h2>
        <p className="text-xl text-gray mb-12 max-w-xl mx-auto">
          Whether you&apos;re launching something new or leveling up what you&apos;ve built, we&apos;re here to help you stand out.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link href="/contact" className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black font-semibold uppercase tracking-wider hover:bg-pink transition-colors duration-300">
            Start a Project
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
              <path d="M4 10h12M12 6l4 4-4 4"/>
            </svg>
          </Link>
          <Link href="/work" className="inline-flex items-center justify-center px-8 py-4 border border-white text-white font-semibold uppercase tracking-wider hover:bg-white hover:text-black transition-colors duration-300">
            View Our Work
          </Link>
        </div>
      </div>
    </section>
  )
}
