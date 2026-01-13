/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: '#0b0b0b',
        white: '#eeeeee',
        cream: '#d4d4d4',
        pink: '#f472b6',
        purple: {
          DEFAULT: '#a78bfa',
          dark: '#7c3aed',
        },
        charcoal: '#18181b',
        gray: '#71717a',
        'light-gray': '#a1a1aa',
      },
      fontFamily: {
        sans: ['Syne', 'sans-serif'],
        serif: ['Instrument Serif', 'serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
