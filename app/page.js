import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Work from '@/components/Work'
import { Marquee, Approach, CTA } from '@/components/HomeSections'

export default function Home() {
  return (
    <main className="bg-black min-h-screen">
      <Navigation />
      <Hero />
      <Services />
      <Work />
      <Marquee />
      <Approach />
      <CTA />
      <Footer />
    </main>
  )
}
