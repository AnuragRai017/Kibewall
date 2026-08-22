import { fetchWallpapers } from "@/lib/api"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = Math.min(Math.max(Number(searchParams.get("page") || 1), 1), 100)
  const q = (searchParams.get("q") || "").slice(0, 120)
  const sorting = ["date_added", "relevance", "random", "views", "favorites", "toplist"].includes(searchParams.get("sorting") || "") ? searchParams.get("sorting")! : "date_added"
  const result = await fetchWallpapers({ page, q, sorting, categories: "010", purity: "100" })
  return NextResponse.json(result, { headers: { "Cache-Control": "public, s-maxage=900, stale-while-revalidate=3600" } })
}
