import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'

export const metadata = {
  title: '404 - Page Not Found',
  description: 'The page you\'re looking for doesn\'t exist.',
}

export default function NotFound() {
  return (
    <>
      <Navigation />

      <section style={{
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem 2rem',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '600px' }}>
          <div style={{
            fontSize: '8rem',
            fontWeight: '700',
            lineHeight: '1',
            background: 'linear-gradient(135deg, var(--pink) 0%, var(--purple) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '1rem'
          }}>
            404
          </div>

          <h1 style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: '400',
            marginBottom: '1rem',
            color: 'var(--white)'
          }}>
            Page not found
          </h1>

          <p style={{
            color: 'var(--gray)',
            fontSize: '1.125rem',
            lineHeight: '1.6',
            marginBottom: '3rem'
          }}>
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>

          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <Link href="/" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '1rem 2rem',
              background: 'var(--white)',
              color: 'var(--black)',
              textDecoration: 'none',
              borderRadius: '50px',
              fontSize: '1rem',
              fontWeight: '500',
              transition: 'all 0.3s ease'
            }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M16 10H4M8 6l-4 4 4 4"/>
              </svg>
              Back to Home
            </Link>

            <Link href="/work" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '1rem 2rem',
              background: 'transparent',
              color: 'var(--white)',
              textDecoration: 'none',
              border: '1px solid var(--white)',
              borderRadius: '50px',
              fontSize: '1rem',
              fontWeight: '500',
              transition: 'all 0.3s ease'
            }}>
              View Our Work
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
