'use client'

import { useEffect, useState } from 'react'
import { List } from 'lucide-react'

interface Heading {
  id: string
  text: string
  level: number
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [active, setActive] = useState<string>('')

  useEffect(() => {
    const els = Array.from(document.querySelectorAll('article h2, article h3'))
    setHeadings(
      els.map((el) => ({
        id: el.id,
        text: el.textContent || '',
        level: parseInt(el.tagName[1]),
      }))
    )

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-80px 0px -60% 0px' }
    )

    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  if (headings.length === 0) return null

  return (
    <nav className="sticky top-24 bg-white border border-gray-200 rounded-2xl p-5">
      <h2 className="flex items-center gap-2 font-bold text-gray-800 text-sm mb-4">
        <List size={16} /> Índice de contenidos
      </h2>
      <ol className="space-y-1.5">
        {headings.map((h) => (
          <li key={h.id} style={{ paddingLeft: h.level === 3 ? '1rem' : '0' }}>
            <a
              href={`#${h.id}`}
              className={`block text-sm transition-colors py-0.5 ${
                active === h.id
                  ? 'text-brand-600 font-semibold'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
