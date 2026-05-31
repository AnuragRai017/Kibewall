import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { fetchWallpaperDetails } from "@/lib/api"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Heart, Eye } from "lucide-react"
import WallpaperMetadata from "@/components/wallpaper-metadata"
import { WallpaperActions } from "@/components/wallpaper-actions"
import { Suspense } from "react"
import { LoadingScreen } from "@/components/loading-screen"

export default async function WallpaperPage({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<LoadingScreen message="Loading wallpaper details..." />}>
      <WallpaperDetails id={params.id} />
    </Suspense>
  )
}

async function WallpaperDetails({ id }: { id: string }) {
  const wallpaper = await fetchWallpaperDetails(id)

  if (!wallpaper) {
    notFound()
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <Link
        href="/explore"
        className="flex items-center gap-2 mb-6 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft size={16} />
        <span>Back to gallery</span>
      </Link>

      <div className="grid md:grid-cols-[2fr_1fr] gap-8">
        <div className="relative">
          <div className="relative aspect-auto w-full rounded-lg overflow-hidden bg-muted">
            <Image
              src={wallpaper.path || "/placeholder.svg"}
              alt={`Wallpaper ${wallpaper.id}`}
              width={wallpaper.dimension_x}
              height={wallpaper.dimension_y}
              className="object-contain w-full h-auto"
              priority
            />
          </div>

          <WallpaperActions wallpaper={wallpaper} />
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <WallpaperMetadata wallpaper={wallpaper} />
            </CardContent>
          </Card>

          {wallpaper.tags && wallpaper.tags.length > 0 && (
            <div>
              <h3 className="text-lg font-medium mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {wallpaper.tags.map((tag) => (
                  <Link href={`/explore?q=${encodeURIComponent(tag.name)}`} key={tag.id}>
                    <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80 transition-colors">
                      {tag.name}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Eye size={16} className="text-muted-foreground" />
              <span>{wallpaper.views}</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart size={16} className="text-muted-foreground" />
              <span>{wallpaper.favorites}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
