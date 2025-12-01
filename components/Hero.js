import Image from 'next/image'
import { heroVisual } from '@/lib/visuals'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-8 md:px-16 pt-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroVisual.src}
          alt={heroVisual.alt}
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_20%_50%,rgba(201,162,39,0.06)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_50%,rgba(139,154,125,0.06)_0%,transparent_50%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] w-full mx-auto">
        {/* Label */}
        <div className="flex items-center gap-4 mb-8 opacity-0 animate-fade-up [animation-delay:200ms]">
          <div className="w-10 h-px bg-gray"></div>
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-light-gray">
            Web Design & Branding Studio — New York
          </span>
        </div>

        {/* Title */}
        <h1 className="font-serif text-[clamp(4rem,11vw,9rem)] leading-[0.95] tracking-tight mb-12 text-white">
          <span className="block overflow-hidden">
            <span className="block opacity-0 translate-y-full animate-slide-up [animation-delay:300ms]">
              Design that <em className="italic text-pink">builds</em>
            </span>
          </span>
          <span className="block overflow-hidden">
            <span className="block opacity-0 translate-y-full animate-slide-up [animation-delay:400ms]">
              brands <em className="italic text-purple">& business</em>
            </span>
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl font-normal text-gray max-w-[550px] leading-relaxed opacity-0 animate-fade-up [animation-delay:800ms]">
          We create premium websites, brand identities, and packaging for ambitious companies — with specialized expertise in the cannabis industry.
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-4 mt-10 opacity-0 animate-fade-up [animation-delay:1000ms]">
          {['Web Design', 'Brand Identity', 'Packaging', 'Cannabis'].map((tag) => (
            <span 
              key={tag} 
              className="px-4 py-2 border border-charcoal text-xs font-medium tracking-wider uppercase text-light-gray hover:border-gray hover:text-white transition-colors duration-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-16 left-8 md:left-16 flex flex-col items-center gap-4 opacity-0 animate-fade-up [animation-delay:1200ms]">
        <span className="text-[0.7rem] tracking-[0.2em] uppercase [writing-mode:vertical-rl] text-gray">
          Scroll
        </span>
        <div className="w-px h-[60px] bg-gradient-to-b from-gray to-transparent animate-[scrollPulse_2s_ease-in-out_infinite]"></div>
      </div>
    </section>
  )
}
