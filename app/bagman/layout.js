export const metadata = {
  title: 'BAGMAN PREMADE DESIGNS',
  description: 'Browse our Bagman NY design collection.',
  openGraph: {
    title: 'BAGMAN PREMADE DESIGNS',
    description: 'Browse our Bagman NY design collection.',
    images: [
      {
        url: '/images/bagman-logo.png',
        width: 1024,
        height: 1024,
        alt: 'Bagman NY',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BAGMAN PREMADE DESIGNS',
    description: 'Browse our Bagman NY design collection.',
    images: ['/images/bagman-logo.png'],
  },
}

export default function BagmanLayout({ children }) {
  return children
}
