import './globals.css'
import StructuredData, { organizationSchema, localBusinessSchema, websiteSchema } from '@/components/StructuredData'

export const metadata = {
  title: {
    default: 'TD Studios | Web Design & Branding Agency NYC',
    template: '%s | TD Studios'
  },
  description: 'Full-service creative studio specializing in web design, brand identity, and packaging — with deep expertise in the cannabis industry. Based in New York.',
  keywords: ['web design', 'branding', 'cannabis packaging', 'brand identity', 'NYC design agency', 'cannabis branding', 'packaging design', 'graphic design'],
  authors: [{ name: 'TD Studios' }],
  creator: 'TD Studios',
  metadataBase: new URL('https://tdstudiosny.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://tdstudiosny.com',
    siteName: 'TD Studios',
    title: 'TD Studios | Web Design & Branding Agency NYC',
    description: 'Full-service creative studio specializing in web design, brand identity, and packaging — with deep expertise in the cannabis industry.',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'TD Studios - Design that builds brands & business',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TD Studios | Web Design & Branding Agency NYC',
    description: 'Full-service creative studio specializing in web design, brand identity, and packaging — with deep expertise in the cannabis industry.',
    images: ['/og-image.svg'],
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Syne:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <StructuredData data={organizationSchema} />
        <StructuredData data={localBusinessSchema} />
        <StructuredData data={websiteSchema} />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
