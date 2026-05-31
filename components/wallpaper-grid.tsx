import { fetchWallpapers } from "@/lib/api"
import Pagination from "@/components/pagination"
import { AnimatedWallpaperCard } from "@/components/animated-wallpaper-card"

export default async function WallpaperGrid({
  page = 1,
  query = "",
  category = "010", // Default to anime
  sorting = "date_added",
  purity = "100", // Default to SFW
}: {
  page?: number
  query?: string
  category?: string
  sorting?: string
  purity?: string
}) {
  const { data: wallpapers, meta } = await fetchWallpapers({
    page,
    q: query,
    categories: category,
    sorting,
    purity,
  })

  if (!wallpapers || wallpapers.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium">No wallpapers found</h3>
        <p className="text-muted-foreground mt-2">Try adjusting your search or filters</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wallpapers.map((wallpaper, index) => (
          <AnimatedWallpaperCard key={wallpaper.id} wallpaper={wallpaper} index={index} />
        ))}
      </div>

      {meta && <Pagination currentPage={meta.current_page} totalPages={meta.last_page} />}
    </div>
  )
}
