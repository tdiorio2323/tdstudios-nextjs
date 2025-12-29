/**
 * Error state display for catalog pages
 */
export default function ErrorState({ error, onRetry }) {
  const isEnvError = error?.includes('environment variables')

  return (
    <div className="text-center py-20 max-w-2xl mx-auto">
      <div className="bg-charcoal border border-pink/20 rounded-lg p-8">
        <svg
          className="mx-auto h-12 w-12 text-pink mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <h2 className="text-xl font-semibold text-white mb-2">Configuration Error</h2>
        <p className="text-pink text-base mb-6">{error}</p>
        {isEnvError && (
          <div className="bg-black/50 rounded p-4 mb-6 text-left">
            <p className="text-light-gray text-sm mb-2">To fix this issue:</p>
            <ol className="text-light-gray text-sm space-y-1 list-decimal list-inside">
              <li>Go to your Vercel dashboard</li>
              <li>Navigate to Settings → Environment Variables</li>
              <li>Add NEXT_PUBLIC_SUPABASE_URL</li>
              <li>Add NEXT_PUBLIC_SUPABASE_ANON_KEY</li>
              <li>Redeploy your application</li>
            </ol>
          </div>
        )}
        <button
          onClick={onRetry}
          className="px-6 py-3 border border-purple text-white hover:bg-purple hover:border-purple transition-all rounded"
        >
          Try Again
        </button>
      </div>
    </div>
  )
}
