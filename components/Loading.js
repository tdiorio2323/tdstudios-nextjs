'use client'

export default function Loading() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      flexDirection: 'column',
      gap: '1rem'
    }}>
      <div className="loading-spinner" />
      <p style={{ color: 'var(--gray)', fontSize: '0.9rem' }}>Loading...</p>
      <style jsx>{`
        .loading-spinner {
          width: 50px;
          height: 50px;
          border: 3px solid var(--charcoal);
          border-top: 3px solid var(--gold);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
