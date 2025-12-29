/**
 * Empty state display for catalog pages
 */
export default function EmptyState({ message = 'No designs found.' }) {
  return (
    <div className="text-center py-20">
      <p className="text-light-gray text-lg">{message}</p>
    </div>
  )
}
