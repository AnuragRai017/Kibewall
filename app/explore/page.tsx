import { Suspense } from "react"
import WallpaperGrid from "@/components/wallpaper-grid"
import SearchFilters from "@/components/search-filters"
import { Skeleton } from "@/components/ui/skeleton"

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const page = typeof searchParams.page === "string" ? Number.parseInt(searchParams.page) : 1
  const query = typeof searchParams.q === "string" ? searchParams.q : ""
  const category = typeof searchParams.categories === "string" ? searchParams.categories : "010" // Default to anime
  const sorting = typeof searchParams.sorting === "string" ? searchParams.sorting : "date_added"
  const purity = typeof searchParams.purity === "string" ? searchParams.purity : "100" // Default to SFW

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Explore Wallpapers</h1>

      <SearchFilters initialQuery={query} initialCategory={category} initialSorting={sorting} initialPurity={purity} />

      <Suspense fallback={<WallpaperGridSkeleton />}>
        <WallpaperGrid page={page} query={query} category={category} sorting={sorting} purity={purity} />
      </Suspense>
    </main>
  )
}

function WallpaperGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="flex flex-col gap-2">
          <Skeleton className="w-full h-48 rounded-lg" />
          <Skeleton className="w-3/4 h-4 rounded" />
          <Skeleton className="w-1/2 h-4 rounded" />
        </div>
      ))}
    </div>
  )
}
