import { CheckCircle, XCircle } from 'lucide-react'

interface ProsConsListProps {
  pros: string[]
  cons: string[]
}

export default function ProsConsList({ pros, cons }: ProsConsListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
      <div className="bg-green-50 border border-green-200 rounded-xl p-5">
        <h3 className="text-green-800 font-bold text-base mb-3 flex items-center gap-2">
          <CheckCircle size={18} className="text-green-600" />
          Puntos fuertes
        </h3>
        <ul className="space-y-2">
          {pros.map((pro, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-green-900">
              <CheckCircle size={15} className="text-green-500 mt-0.5 shrink-0" />
              {pro}
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-red-50 border border-red-200 rounded-xl p-5">
        <h3 className="text-red-800 font-bold text-base mb-3 flex items-center gap-2">
          <XCircle size={18} className="text-red-500" />
          Puntos débiles
        </h3>
        <ul className="space-y-2">
          {cons.map((con, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-red-900">
              <XCircle size={15} className="text-red-400 mt-0.5 shrink-0" />
              {con}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
