export default function StructuredData({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

// Organization Schema
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'TD Studios',
  url: 'https://tdstudiosny.com',
  logo: 'https://tdstudiosny.com/favicon.svg',
  description: 'Full-service creative studio specializing in web design, brand identity, and packaging — with deep expertise in the cannabis industry. Based in New York.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'New York',
    addressRegion: 'NY',
    addressCountry: 'US'
  },
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'hello@tdstudiosny.com',
    contactType: 'Customer Service'
  },
  sameAs: [
    'https://instagram.com/tdstudiosny.com',
    'https://linkedin.com/company/tdstudiosny',
    'https://dribbble.com/tdstudiosny'
  ],
  areaServed: {
    '@type': 'Country',
    name: 'United States'
  },
  serviceType: [
    'Web Design',
    'Brand Identity',
    'Packaging Design',
    'Cannabis Branding',
    'Graphic Design'
  ]
}

// Local Business Schema
export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'TD Studios',
  image: 'https://tdstudiosny.com/og-image.svg',
  '@id': 'https://tdstudiosny.com',
  url: 'https://tdstudiosny.com',
  telephone: '',
  priceRange: '$$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '',
    addressLocality: 'New York',
    addressRegion: 'NY',
    postalCode: '',
    addressCountry: 'US'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 40.7128,
    longitude: -74.0060
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday'
    ],
    opens: '09:00',
    closes: '18:00'
  },
  sameAs: [
    'https://instagram.com/tdstudiosny.com',
    'https://linkedin.com/company/tdstudiosny',
    'https://dribbble.com/tdstudiosny'
  ]
}

// Website Schema
export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'TD Studios',
  url: 'https://tdstudiosny.com',
  description: 'Full-service creative studio specializing in web design, brand identity, and packaging — with deep expertise in the cannabis industry.',
  publisher: {
    '@type': 'Organization',
    name: 'TD Studios'
  }
}
