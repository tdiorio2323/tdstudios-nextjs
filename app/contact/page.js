import PageLayout from '@/components/PageLayout'
import ContactClient from './ContactClient'

export const metadata = {
  title: 'Contact',
  description: 'Get in touch with TD Studios for web design, branding, and cannabis packaging services. Let\'s bring your vision to life with strategic design that delivers results.',
  keywords: ['contact TD Studios', 'hire web designer NYC', 'branding agency contact', 'cannabis packaging designer', 'design consultation'],
  openGraph: {
    title: 'Contact TD Studios',
    description: 'Ready to elevate your brand? Let\'s discuss your project and create something exceptional together.',
    url: 'https://tdstudiosny.com/contact',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact TD Studios',
    description: 'Ready to elevate your brand? Let\'s discuss your project and create something exceptional together.',
  },
}

export default function Contact() {
  return (
    <PageLayout className="bg-black min-h-screen">
      <ContactClient />
    </PageLayout>
  )
}
