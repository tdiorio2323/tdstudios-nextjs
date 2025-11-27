import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'TD Studios - Web Design & Branding Agency NYC'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: '#0a0a0a',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px',
          position: 'relative',
        }}
      >
        {/* Background gradient */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(139, 154, 125, 0.15) 0%, transparent 60%)',
          }}
        />

        {/* Logo */}
        <div
          style={{
            fontSize: '48px',
            fontWeight: 800,
            letterSpacing: '0.1em',
            color: '#f5f5f0',
            marginBottom: '40px',
            zIndex: 1,
          }}
        >
          TD STUDIOS
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: '64px',
            fontWeight: 400,
            color: '#f5f5f0',
            textAlign: 'center',
            maxWidth: '900px',
            lineHeight: 1.2,
            zIndex: 1,
          }}
        >
          Design that <span style={{ color: '#c9a227' }}>builds</span> brands{' '}
          <span style={{ color: '#8b9a7d' }}>& business</span>
        </div>

        {/* Services */}
        <div
          style={{
            display: 'flex',
            gap: '20px',
            marginTop: '60px',
            zIndex: 1,
          }}
        >
          <div
            style={{
              padding: '12px 24px',
              border: '1px solid #333',
              borderRadius: '50px',
              fontSize: '20px',
              color: '#bbb',
            }}
          >
            Web Design
          </div>
          <div
            style={{
              padding: '12px 24px',
              border: '1px solid #333',
              borderRadius: '50px',
              fontSize: '20px',
              color: '#bbb',
            }}
          >
            Branding
          </div>
          <div
            style={{
              padding: '12px 24px',
              border: '1px solid #333',
              borderRadius: '50px',
              fontSize: '20px',
              color: '#bbb',
            }}
          >
            Cannabis
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
