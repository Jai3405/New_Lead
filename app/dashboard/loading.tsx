export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="space-y-2">
        <div className="h-8 w-48 bg-zinc-200 rounded-md"></div>
        <div className="h-4 w-96 bg-zinc-100 rounded-md"></div>
      </div>

      {/* KPI Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-32 bg-zinc-100 rounded-2xl border border-zinc-200"></div>
        ))}
      </div>

      {/* Charts Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 h-[400px] bg-zinc-100 rounded-2xl border border-zinc-200"></div>
        <div className="h-[400px] bg-zinc-100 rounded-2xl border border-zinc-200"></div>
      </div>
    </div>
  );
}
