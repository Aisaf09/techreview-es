import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import GoogleAnalytics from '@/components/GoogleAnalytics'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'TechReview ES'
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://techreview.es'

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} — Análisis y comparativas de tecnología`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    'Reviews independientes, comparativas y guías de compra de portátiles, móviles, auriculares, tablets y monitores.',
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    siteName: SITE_NAME,
    url: SITE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    site: '@techreviewes',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="bg-gray-50 text-gray-900 antialiased font-sans">
        <GoogleAnalytics />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
