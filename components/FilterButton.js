'use client'

/**
 * Reusable filter button component
 * Used for filtering content (e.g., work projects)
 *
 * @param {Object} props
 * @param {string} props.label - Button label
 * @param {boolean} props.active - Whether this filter is active
 * @param {function} props.onClick - Click handler
 * @param {string} props.activeColor - Color when active ('white' | 'pink' | 'purple')
 */
export default function FilterButton({
  label,
  active,
  onClick,
  activeColor = 'white',
}) {
  const colorMap = {
    white: 'var(--white)',
    pink: 'var(--pink)',
    purple: 'var(--purple)',
  }

  const bgColor = active ? colorMap[activeColor] : 'transparent'
  const textColor = active ? 'var(--black)' : 'var(--light-gray)'
  const borderColor = active ? colorMap[activeColor] : 'var(--charcoal)'

  return (
    <button
      onClick={onClick}
      className="hero-tag"
      style={{
        cursor: 'pointer',
        background: bgColor,
        color: textColor,
        borderColor: borderColor,
      }}
    >
      {label}
    </button>
  )
}
