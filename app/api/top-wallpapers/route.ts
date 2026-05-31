import { fetchWallpapers } from "@/lib/api"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const limit = Number.parseInt(searchParams.get("limit") || "10")

  try {
    const { data } = await fetchWallpapers({
      sorting: "toplist",
      purity: "100", // SFW only
      categories: "010", // Anime category
      page: 1,
    })

    // Get the top wallpapers based on the limit
    const topWallpapers = data.slice(0, limit).map((wallpaper) => ({
      id: wallpaper.id,
      path: wallpaper.path,
      thumbs: wallpaper.thumbs,
      resolution: wallpaper.resolution,
      views: wallpaper.views,
      favorites: wallpaper.favorites,
    }))

    return NextResponse.json({ wallpapers: topWallpapers })
  } catch (error) {
    console.error("Error fetching top wallpapers:", error)
    return NextResponse.json({ error: "Failed to fetch top wallpapers" }, { status: 500 })
  }
}
