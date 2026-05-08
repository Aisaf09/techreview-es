'use client'

import { Sun, Moon } from 'lucide-react'
import { useTheme } from './ThemeProvider'
import { cn } from '@/lib/utils'

export default function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggle } = useTheme()

  return (
    <button
      onClick={toggle}
      aria-label={theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'}
      title={theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
      className={cn(
        'relative w-9 h-9 flex items-center justify-center rounded-lg transition-colors',
        'text-gray-500 hover:text-brand-600 hover:bg-brand-50',
        'dark:text-gray-400 dark:hover:text-brand-400 dark:hover:bg-gray-800',
        className
      )}
    >
      <Sun
        size={18}
        aria-hidden="true"
        className={cn(
          'absolute transition-all duration-300',
          theme === 'dark' ? 'opacity-100 rotate-0' : 'opacity-0 rotate-90'
        )}
      />
      <Moon
        size={18}
        aria-hidden="true"
        className={cn(
          'absolute transition-all duration-300',
          theme === 'light' ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'
        )}
      />
    </button>
  )
}
