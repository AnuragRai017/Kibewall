import { cache } from "react"
import type { Wallpaper, WallpaperResponse, SearchResponse } from "./types"

const API_KEY = process.env.WALLHAVEN_API_KEY
const API_BASE_URL = "https://wallhaven.cc/api/v1"

export const fetchWallpapers = cache(async ({
  page = 1,
  q = "",
  categories = "010", // Default to anime
  sorting = "date_added",
  purity = "100", // Default to SFW
}: {
  page?: number
  q?: string
  categories?: string
  sorting?: string
  purity?: string
}): Promise<SearchResponse> => {
  const params = new URLSearchParams({
    apikey: API_KEY!,
    page: page.toString(),
    categories,
    sorting,
    purity,
  })

  if (q) {
    params.set("q", q)
  }

  try {
    const response = await fetch(`${API_BASE_URL}/search?${params.toString()}`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching wallpapers:", error)
    return { data: [], meta: { current_page: 1, last_page: 1, per_page: 24, total: 0 } }
  }
})

export const fetchWallpaperDetails = cache(async (id: string): Promise<Wallpaper | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/w/${id}?apikey=${API_KEY}`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data: WallpaperResponse = await response.json()
    return data.data
  } catch (error) {
    console.error(`Error fetching wallpaper ${id}:`, error)
    return null
  }
})
