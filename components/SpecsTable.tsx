interface SpecsTableProps {
  specs: Record<string, string>
  title?: string
}

export default function SpecsTable({ specs, title = 'Especificaciones técnicas' }: SpecsTableProps) {
  const entries = Object.entries(specs)
  return (
    <div className="my-6 overflow-hidden rounded-xl border border-gray-200">
      {title && (
        <div className="bg-gray-50 px-5 py-3 border-b border-gray-200">
          <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wide">{title}</h3>
        </div>
      )}
      <table className="w-full text-sm">
        <tbody>
          {entries.map(([key, value], i) => (
            <tr key={key} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="px-5 py-3 font-medium text-gray-600 w-2/5 border-r border-gray-100">{key}</td>
              <td className="px-5 py-3 text-gray-900">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
