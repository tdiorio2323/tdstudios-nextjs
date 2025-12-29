/**
 * Pagination controls for catalog pages
 */
export default function Pagination({ page, hasMore, onPrevPage, onNextPage }) {
  if (page === 0 && !hasMore) return null

  return (
    <div className="flex justify-center items-center gap-4">
      <button
        onClick={onPrevPage}
        disabled={page === 0}
        className="px-6 py-3 border border-white text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white hover:text-black transition-all"
      >
        Previous
      </button>
      <span className="text-light-gray">Page {page + 1}</span>
      <button
        onClick={onNextPage}
        disabled={!hasMore}
        className="px-6 py-3 border border-white text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white hover:text-black transition-all"
      >
        Next
      </button>
    </div>
  )
}
