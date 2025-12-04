import ContactClient from '@/app/contact/ContactClient'

export const metadata = {
  title: 'Inquire',
  description: 'Get in touch with TD Studios. Let\'s bring your vision to life.',
}

export default function Inquire() {
  return (
    <main className="bg-black min-h-screen">
      <ContactClient />
    </main>
  )
}
