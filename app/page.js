import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Work from '@/components/Work'
import { Marquee, Approach } from '@/components/HomeSections'
import CTA from '@/components/CTA'

export default function Home() {
  return (
    <main className="bg-black min-h-screen">
      <Navigation />
      <Hero />
      <Services />
      <Work />
      <Marquee />
      <Approach />
      <CTA
        title="Ready to elevate your brand?"
        titleEmphasis="your brand?"
        subtitle="Whether you're launching something new or leveling up what you've built, we're here to help you stand out."
        primaryButtonText="Start a Project"
        primaryButtonHref="/contact"
        secondaryButtonText="View Our Work"
        secondaryButtonHref="/work"
      />
      <Footer />
    </main>
  )
}
