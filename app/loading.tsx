export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Skeleton hero */}
      <div className="skeleton h-64 rounded-3xl mb-8" />
      {/* Skeleton grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-3xl overflow-hidden bg-white card-shadow">
            <div className="skeleton aspect-[16/9]" />
            <div className="p-5 space-y-3">
              <div className="skeleton h-3 w-1/3 rounded" />
              <div className="skeleton h-5 w-4/5 rounded" />
              <div className="skeleton h-4 w-full rounded" />
              <div className="skeleton h-4 w-2/3 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
