import ServiceCard from './ServiceCard';

export default function Services() {
  const services = [
    {
      id: '01',
      title: 'Web Design',
      desc: 'Custom websites engineered for performance and conversion. From marketing sites to e-commerce platforms, designed to engage your audience and built to scale with your business.',
      icon: 'website-design',
      color: 'pink'
    },
    {
      id: '02',
      title: 'Brand Identity',
      desc: 'Complete visual systems from logo to brand guidelines. We build strategic brand foundations that differentiate you from competitors and forge real connections with your audience.',
      icon: 'brand-identity',
      color: 'pink'
    },
    {
      id: '03',
      title: 'Packaging Design',
      desc: 'Product packaging that sells itself on the shelf. We specialize in compliant cannabis packaging that builds instant recognition and earns consumer trust.',
      icon: 'packaging-design',
      color: 'purple'
    },
    {
      id: '04',
      title: 'Graphic Design',
      desc: 'Marketing collateral, print materials, and visual assets that extend your brand consistently across every customer touchpoint.',
      icon: 'graphic-design',
      color: 'purple'
    }
  ];

  return (
    <>
      {/* Two Pillars Section */}
      <section className="relative py-32 px-8 md:px-16" id="pillars">
        <div className="text-center mb-24">
          <div className="text-xs font-semibold tracking-[0.3em] uppercase text-gray mb-6">Two Specialties, One Studio</div>
          <h2 className="font-serif text-[clamp(2.5rem,5vw,4rem)] leading-[1.1] text-white">Premium creative across industries</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[2px] bg-charcoal">
          {/* Design Pillar */}
          <div className="group relative bg-black p-16 min-h-[500px] flex flex-col overflow-hidden">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[linear-gradient(135deg,rgba(201,162,39,0.08)_0%,transparent_60%)] pointer-events-none" />

            <div className="w-16 h-16 mb-8 flex items-center justify-center border border-pink relative z-10">
              <div className="w-6 h-6 border border-pink rounded-full"></div>
            </div>

            <div className="text-[0.7rem] font-semibold tracking-[0.3em] uppercase text-pink mb-4 relative z-10">Creative Services</div>
            <h3 className="font-serif text-[2.5rem] leading-[1.1] mb-6 text-white relative z-10">Web & Brand Design</h3>
            <p className="text-gray leading-[1.8] mb-8 flex-grow relative z-10">
              High-performance websites and visual identities for ambitious brands. We craft digital experiences that convert visitors into customers — built on strategy, refined through meticulous design.
            </p>

            <ul className="flex flex-wrap gap-3 relative z-10">
              {['Website Design', 'Web Development', 'Brand Identity', 'Logo Design', 'UI/UX Design', 'Graphic Design'].map(item => (
                <li key={item} className="text-[0.8rem] px-4 py-2 border border-charcoal text-light-gray transition-colors duration-300 hover:border-pink hover:text-pink">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Cannabis Pillar */}
          <div className="group relative bg-black p-16 min-h-[500px] flex flex-col overflow-hidden">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[linear-gradient(135deg,rgba(139,154,125,0.08)_0%,transparent_60%)] pointer-events-none" />

            <div className="w-16 h-16 mb-8 flex items-center justify-center border border-purple rounded-full relative z-10">
              <div className="w-5 h-5 bg-purple opacity-50 [clip-path:polygon(50%_0%,100%_38%,82%_100%,18%_100%,0%_38%)]"></div>
            </div>

            <div className="text-[0.7rem] font-semibold tracking-[0.3em] uppercase text-purple mb-4 relative z-10">Industry Expertise</div>
            <h3 className="font-serif text-[2.5rem] leading-[1.1] mb-6 text-white relative z-10">Cannabis Branding</h3>
            <p className="text-gray leading-[1.8] mb-8 flex-grow relative z-10">
              Specialized creative for the cannabis market. We navigate the regulations, understand the nuances, and seize the opportunity. Compliant packaging and branding that commands shelf presence and builds lasting brand equity.
            </p>

            <ul className="flex flex-wrap gap-3 relative z-10">
              {['Packaging Design', 'Compliant Branding', 'Product Labels', 'Dispensary Websites', 'Visual Systems', 'Brand Strategy'].map(item => (
                <li key={item} className="text-[0.8rem] px-4 py-2 border border-charcoal text-light-gray transition-colors duration-300 hover:border-purple hover:text-purple">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-32 px-8 md:px-16 bg-charcoal" id="services">
        <div className="flex flex-wrap justify-between items-end mb-20 gap-8">
          <div>
            <div className="text-xs font-semibold tracking-[0.3em] uppercase text-gray mb-6">What We Do</div>
            <h2 className="font-serif text-[clamp(2.5rem,5vw,4rem)] leading-[1.1] text-white">Services</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              id={service.id}
              title={service.title}
              description={service.desc}
              icon={service.icon}
              color={service.color}
            />
          ))}
        </div>
      </section>
    </>
  )
}
