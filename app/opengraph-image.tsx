import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'TechReview ES — Análisis y comparativas de tecnología'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #1d4ed8 0%, #1e3a8a 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '32px' }}>
          <div style={{
            background: '#fbbf24',
            borderRadius: '100px',
            padding: '6px 18px',
            color: '#92400e',
            fontSize: '14px',
            fontWeight: 800,
            letterSpacing: '2px',
            textTransform: 'uppercase',
          }}>
            Reviews independientes
          </div>
        </div>

        {/* Title */}
        <div style={{
          fontSize: '72px',
          fontWeight: 900,
          color: '#ffffff',
          lineHeight: 1.05,
          marginBottom: '24px',
          maxWidth: '900px',
        }}>
          TechReview<span style={{ color: '#fbbf24' }}>ES</span>
        </div>

        {/* Subtitle */}
        <div style={{
          fontSize: '28px',
          color: '#93c5fd',
          maxWidth: '700px',
          lineHeight: 1.4,
        }}>
          Análisis y comparativas honestas de portátiles, móviles, auriculares, tablets y monitores.
        </div>

        {/* URL */}
        <div style={{
          position: 'absolute',
          bottom: '60px',
          right: '80px',
          color: '#60a5fa',
          fontSize: '18px',
          fontWeight: 600,
        }}>
          techreview-es.vercel.app
        </div>
      </div>
    ),
    { ...size }
  )
}
