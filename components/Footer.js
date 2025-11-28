import Link from 'next/link'

export default function Footer() {
  return (
    <footer>
      <div className="footer-logo">TD STUDIOS</div>
      <ul className="footer-links">
        <li><a href="https://instagram.com/tdstudiosny.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
        <li><a href="https://linkedin.com/company/tdstudiosny" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
        <li><a href="https://dribbble.com/tdstudiosny" target="_blank" rel="noopener noreferrer">Dribbble</a></li>
      </ul>
      <p className="footer-copy">© {new Date().getFullYear()} TD Studios. All rights reserved.</p>
    </footer>
  )
}
