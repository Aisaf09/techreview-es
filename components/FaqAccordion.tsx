import { ChevronDown } from 'lucide-react'

export default function FaqAccordion({ q, a }: { q: string; a: string }) {
  return (
    <details className="group rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden">
      <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer list-none select-none hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
        <span className="font-semibold text-gray-900 dark:text-white text-sm">{q}</span>
        <ChevronDown
          size={16}
          className="text-gray-400 shrink-0 transition-transform group-open:rotate-180"
          aria-hidden="true"
        />
      </summary>
      <div className="px-5 pb-4 pt-1">
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{a}</p>
      </div>
    </details>
  )
}
