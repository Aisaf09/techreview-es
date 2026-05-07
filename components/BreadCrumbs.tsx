import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { breadcrumbJsonLd } from '@/lib/structured-data'

interface Crumb {
  label: string
  href?: string
}

interface BreadCrumbsProps {
  crumbs: Crumb[]
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://techreview.es'

export default function BreadCrumbs({ crumbs }: BreadCrumbsProps) {
  const schemaItems = [
    { name: 'Inicio', url: SITE_URL },
    ...crumbs.map((c) => ({ name: c.label, url: c.href ? `${SITE_URL}${c.href}` : SITE_URL })),
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(schemaItems)) }}
      />
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-gray-500 flex-wrap">
        <Link href="/" className="hover:text-brand-600 transition-colors flex items-center gap-1">
          <Home size={14} /> Inicio
        </Link>
        {crumbs.map((crumb, i) => (
          <span key={i} className="flex items-center gap-1.5">
            <ChevronRight size={14} className="text-gray-300" />
            {crumb.href && i < crumbs.length - 1 ? (
              <Link href={crumb.href} className="hover:text-brand-600 transition-colors">
                {crumb.label}
              </Link>
            ) : (
              <span className="text-gray-900 font-medium">{crumb.label}</span>
            )}
          </span>
        ))}
      </nav>
    </>
  )
}
