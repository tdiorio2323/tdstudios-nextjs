import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

/**
 * Standard page layout wrapper with Navigation and Footer
 * Use for consistent page structure across the site
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Page content
 * @param {string} props.className - Optional additional classes for main wrapper
 * @param {boolean} props.showNavigation - Show navigation (default: true)
 * @param {boolean} props.showFooter - Show footer (default: true)
 */
export default function PageLayout({
  children,
  className = '',
  showNavigation = true,
  showFooter = true,
}) {
  return (
    <>
      {showNavigation && <Navigation />}
      <main className={className}>
        {children}
      </main>
      {showFooter && <Footer />}
    </>
  )
}
