import { fetchWallpaperDetails } from "@/lib/api"
import { NextResponse } from "next/server"

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  if (!/^[a-zA-Z0-9]+$/.test(id)) return NextResponse.json({ error: "Invalid id" }, { status: 400 })
  const wallpaper = await fetchWallpaperDetails(id)
  if (!wallpaper) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json({ data: wallpaper })
}
