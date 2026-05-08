import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { BarChart3, ShoppingCart, MousePointerClick, TrendingUp, ExternalLink } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Admin — TechReview ES',
  robots: { index: false, follow: false },
}

interface Props {
  searchParams: { pw?: string }
}

const ADMIN_PW = process.env.ADMIN_PASSWORD || ''

export default function AdminPage({ searchParams }: Props) {
  if (!ADMIN_PW || searchParams.pw !== ADMIN_PW) {
    redirect('/')
  }

  const GA_PROPERTY = process.env.GA4_PROPERTY_ID || ''
  const GA_LINK     = GA_PROPERTY
    ? `https://analytics.google.com/analytics/web/#/p${GA_PROPERTY}/reports/explorer`
    : 'https://analytics.google.com'

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Panel privado</p>
        <h1 className="text-3xl font-black text-gray-900 dark:text-white">Admin · TechReview ES</h1>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {[
          {
            icon: <BarChart3 size={20} className="text-brand-600" />,
            label: 'Google Analytics',
            desc: 'Ver clicks de afiliados, sesiones, páginas más visitadas',
            href: GA_LINK,
            external: true,
          },
          {
            icon: <ShoppingCart size={20} className="text-amber-600" />,
            label: 'Amazon Associates',
            desc: 'Ver comisiones y conversiones',
            href: 'https://affiliate-program.amazon.es/',
            external: true,
          },
          {
            icon: <TrendingUp size={20} className="text-green-600" />,
            label: 'PcComponentes Afiliados',
            desc: 'Ver clics y comisiones PCC',
            href: 'https://www.pccomponentes.com/afiliados',
            external: true,
          },
        ].map((card) => (
          <a
            key={card.label}
            href={card.href}
            target={card.external ? '_blank' : undefined}
            rel={card.external ? 'noopener noreferrer' : undefined}
            className="group block bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5 hover:border-brand-300 dark:hover:border-brand-600 transition-all hover:-translate-y-0.5 shadow-sm hover:shadow-md"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-gray-50 dark:bg-gray-700 rounded-xl flex items-center justify-center">
                {card.icon}
              </div>
              {card.external && <ExternalLink size={14} className="text-gray-400" aria-hidden="true" />}
            </div>
            <p className="font-bold text-gray-900 dark:text-white text-sm mb-1">{card.label}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{card.desc}</p>
          </a>
        ))}
      </div>

      {/* GA4 affiliate events instructions */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 mb-8">
        <h2 className="font-black text-gray-900 dark:text-white text-lg mb-4 flex items-center gap-2">
          <MousePointerClick size={18} className="text-brand-600" aria-hidden="true" />
          Cómo ver clicks de afiliados en GA4
        </h2>
        <ol className="space-y-2 text-sm text-gray-600 dark:text-gray-400 list-decimal list-inside">
          <li>Abre Google Analytics → <strong>Informes → Eventos</strong></li>
          <li>Busca el evento <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded text-xs font-mono">affiliate_click</code></li>
          <li>Haz clic en el evento para ver los parámetros: <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded text-xs font-mono">store</code>, <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded text-xs font-mono">product_name</code>, <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded text-xs font-mono">value</code></li>
          <li>Para segmentar por tienda: <strong>Explorar → Tabla de forma libre</strong> → dimensión <em>Parámetro de evento: store</em></li>
        </ol>
        <a
          href={GA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-brand-600 dark:text-brand-400 hover:underline"
        >
          Abrir GA4 <ExternalLink size={13} aria-hidden="true" />
        </a>
      </div>

      {/* Setup status */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="font-black text-gray-900 dark:text-white text-lg mb-4">Estado de configuración</h2>
        <div className="space-y-2">
          {[
            { label: 'NEXT_PUBLIC_AMAZON_TAG',          value: process.env.NEXT_PUBLIC_AMAZON_TAG },
            { label: 'NEXT_PUBLIC_PCCOMPONENTES_REF',   value: process.env.NEXT_PUBLIC_PCCOMPONENTES_REF },
            { label: 'NEXT_PUBLIC_AWIN_AFFID',          value: process.env.NEXT_PUBLIC_AWIN_AFFID },
            { label: 'NEXT_PUBLIC_AWIN_MEDIAMARKT_MID', value: process.env.NEXT_PUBLIC_AWIN_MEDIAMARKT_MID },
            { label: 'NEXT_PUBLIC_GA_MEASUREMENT_ID',   value: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID },
            { label: 'RESEND_API_KEY',                  value: process.env.RESEND_API_KEY ? '✓ configurado' : undefined },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
              <code className="text-xs font-mono text-gray-600 dark:text-gray-400">{label}</code>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${value ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'}`}>
                {value ? (label.includes('KEY') ? '✓ configurado' : value) : '✗ no configurado'}
              </span>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-6 text-xs text-gray-400 text-center">
        Acceso: <code className="font-mono">/admin?pw=TU_PASSWORD</code> · Configura <code className="font-mono">ADMIN_PASSWORD</code> en Vercel.
      </p>
    </div>
  )
}
