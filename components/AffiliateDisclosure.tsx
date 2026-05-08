import { cn } from '@/lib/utils'

interface Props {
  className?: string
  variant?: 'inline' | 'banner'
}

export default function AffiliateDisclosure({ className, variant = 'inline' }: Props) {
  if (variant === 'banner') {
    return (
      <div className={cn('bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl px-4 py-3', className)}>
        <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
          <strong>Aviso de afiliados:</strong> Esta web participa en programas de afiliación de Amazon, PcComponentes y MediaMarkt. Obtenemos una comisión si realizas una compra a través de nuestros enlaces, sin coste adicional para ti. Esto no influye en nuestras valoraciones.
        </p>
      </div>
    )
  }

  return (
    <p className={cn('text-xs text-gray-400 dark:text-gray-500 leading-relaxed', className)}>
      Como Asociado de Amazon, obtenemos ingresos por las compras realizadas a través de nuestros enlaces.
    </p>
  )
}
