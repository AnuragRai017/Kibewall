export default function ExploreLoading() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="h-8 w-64 bg-muted rounded animate-pulse mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto_auto_auto] gap-4 mb-8">
        <div className="h-10 bg-muted rounded animate-pulse" />
        <div className="h-10 w-32 bg-muted rounded animate-pulse" />
        <div className="h-10 w-32 bg-muted rounded animate-pulse" />
        <div className="h-10 w-36 bg-muted rounded animate-pulse" />
        <div className="flex gap-2">
          <div className="h-10 w-20 bg-muted rounded animate-pulse" />
          <div className="h-10 w-20 bg-muted rounded animate-pulse" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-2">
            <div className="aspect-[16/9] bg-muted rounded-lg animate-pulse" />
            <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
            <div className="h-4 w-1/2 bg-muted rounded animate-pulse" />
          </div>
        ))}
      </div>
    </main>
  )
}
