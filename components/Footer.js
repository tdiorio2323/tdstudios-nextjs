import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="py-20 px-8 md:px-16 border-t border-charcoal bg-black">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-xl font-bold tracking-[0.05em] uppercase text-white">TD STUDIOS</div>

        <ul className="flex gap-8">
          <li>
            <a
              href="https://instagram.com/tdstudiosny.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium uppercase tracking-wider text-gray hover:text-white transition-colors duration-300"
            >
              Instagram
            </a>
          </li>
        </ul>

        <p className="text-sm text-gray">
          © {new Date().getFullYear()} TD Studios. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
