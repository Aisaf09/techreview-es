import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import AnalyticsClient from '@/components/AnalyticsClient'
import ScrollReveal from '@/components/ScrollReveal'
import ThemeProvider from '@/components/ThemeProvider'
import Script from 'next/script'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'TechReview ES'
const SITE_URL  = process.env.NEXT_PUBLIC_SITE_URL  || 'https://techreview.es'

export const metadata: Metadata = {
  title: {
    default:  `${SITE_NAME} — Análisis y comparativas de tecnología`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    'Reviews independientes, comparativas y guías de compra de portátiles, móviles, auriculares, tablets y monitores. Análisis técnicos honestos para ayudarte a elegir mejor.',
  metadataBase: new URL(SITE_URL),
  keywords: ['reviews tecnología', 'comparativas portátiles', 'mejores móviles', 'análisis auriculares', 'guía de compra tecnología'],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: 'website', locale: 'es_ES', siteName: SITE_NAME, url: SITE_URL,
    title: `${SITE_NAME} — Análisis y comparativas de tecnología`,
    description: 'Reviews independientes, comparativas y guías de compra de la mejor tecnología.',
    images: [{ url: `${SITE_URL}/og-default.jpg`, width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: 'summary_large_image', site: '@techreviewes', creator: '@techreviewes',
    title: `${SITE_NAME} — Análisis y comparativas de tecnología`,
    images: [`${SITE_URL}/og-default.jpg`],
  },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  verification: {
    google: 'fOHm4Z4rF_6G5QFLouwb6cx0g80UI39sRyUYjZsL0b4',
  },
}

const organizationJsonLd = {
  '@context': 'https://schema.org', '@type': 'Organization',
  name: SITE_NAME, url: SITE_URL, logo: `${SITE_URL}/logo.png`,
  description: 'Análisis independientes, comparativas honestas y guías de compra de tecnología.',
  sameAs: ['https://twitter.com/techreviewes'],
}

const websiteJsonLd = {
  '@context': 'https://schema.org', '@type': 'WebSite', name: SITE_NAME, url: SITE_URL,
  potentialAction: { '@type': 'SearchAction', target: `${SITE_URL}/buscar?q={search_term_string}`, 'query-input': 'required name=search_term_string' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={inter.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('theme');if(t==='dark'||(t===null&&window.matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}`,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      </head>
      <body className="bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 antialiased font-sans transition-colors duration-200">
        <ThemeProvider>
          <GoogleAnalytics />
          <AnalyticsClient />
          {process.env.NEXT_PUBLIC_ADSENSE_ID && (
            <Script
              async
              src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
              crossOrigin="anonymous"
              strategy="lazyOnload"
            />
          )}
          <Header />
          <main>{children}</main>
          <Footer />
          <ScrollReveal />
        </ThemeProvider>
      </body>
    </html>
  )
}
