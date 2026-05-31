import { Suspense } from "react"
import type { Metadata } from "next"
import WallpaperGrid from "@/components/wallpaper-grid"
import SearchFilters from "@/components/search-filters"
import { Skeleton } from "@/components/ui/skeleton"

export const metadata: Metadata = {
  title: "Explore Anime Wallpapers",
  description: "Browse thousands of HD anime wallpapers. Filter by category, sort by popularity, and find the perfect background for your device.",
  alternates: { canonical: "https://kibewall.com/explore" },
  openGraph: {
    title: "Explore Anime Wallpapers | KibeWall",
    description: "Browse thousands of HD anime wallpapers. Filter by category, sort by popularity, and find the perfect background.",
  },
}

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const sp = await searchParams
  const page = typeof sp.page === "string" ? Number.parseInt(sp.page) : 1
  const query = typeof sp.q === "string" ? sp.q : ""
  const category = typeof sp.categories === "string" ? sp.categories : "010"
  const sorting = typeof sp.sorting === "string" ? sp.sorting : "date_added"
  const purity = typeof sp.purity === "string" ? sp.purity : "100"

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
