import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { fetchWallpaperDetails } from "@/lib/api"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Eye, Download } from "lucide-react"
import WallpaperMetadata from "@/components/wallpaper-metadata"
import { WallpaperActions } from "@/components/wallpaper-actions"
import { Suspense } from "react"

interface WallpaperPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: WallpaperPageProps): Promise<Metadata> {
  const { id } = await params
  const wallpaper = await fetchWallpaperDetails(id)

  if (!wallpaper) {
    return { title: "Wallpaper Not Found" }
  }

  const tags = wallpaper.tags?.slice(0, 5).map((t) => t.name).join(", ") || ""
  const description = `Download ${wallpaper.resolution} anime wallpaper. ${wallpaper.views.toLocaleString()} views · ${wallpaper.favorites.toLocaleString()} favorites. ${tags ? `Tags: ${tags}` : ""}`

  return {
    title: `Anime Wallpaper ${wallpaper.id}`,
    description,
    openGraph: {
      title: `Anime Wallpaper ${wallpaper.id} | KibeWall`,
      description,
      images: [
        {
          url: wallpaper.thumbs.large,
          width: 640,
          height: 360,
          alt: tags || `Anime wallpaper ${wallpaper.id}`,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `Anime Wallpaper ${wallpaper.id} | KibeWall`,
      description,
      images: [wallpaper.thumbs.large],
    },
    alternates: {
      canonical: `https://kibewall.com/wallpaper/${wallpaper.id}`,
    },
    other: {
      "og:image:width": "640",
      "og:image:height": "360",
    },
  }
}

export default async function WallpaperPage({ params }: WallpaperPageProps) {
  const { id } = await params
  return (
    <Suspense fallback={<WallpaperDetailSkeleton />}>
      <WallpaperDetails id={id} />
    </Suspense>
  )
}

function WallpaperDetailSkeleton() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="h-6 w-32 bg-muted rounded animate-pulse mb-6" />
      <div className="grid md:grid-cols-[2fr_1fr] gap-8">
        <div className="aspect-video bg-muted rounded-lg animate-pulse" />
        <div className="space-y-6">
          <div className="h-48 bg-muted rounded-lg animate-pulse" />
          <div className="h-32 bg-muted rounded-lg animate-pulse" />
        </div>
      </div>
    </main>
  )
}

async function WallpaperDetails({ id }: { id: string }) {
  const wallpaper = await fetchWallpaperDetails(id)

  if (!wallpaper) {
    notFound()
  }

  const tagsText = wallpaper.tags?.slice(0, 5).map((t) => t.name).join(", ") || `Anime wallpaper ${wallpaper.id}`
  const description = `Download ${wallpaper.resolution} anime wallpaper. ${wallpaper.views.toLocaleString()} views · ${wallpaper.favorites.toLocaleString()} favorites.`

  const imageObjectSchema = {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    contentUrl: wallpaper.path,
    thumbnailUrl: wallpaper.thumbs.large,
    name: `Anime Wallpaper ${wallpaper.id}`,
    description,
    width: wallpaper.dimension_x,
    height: wallpaper.dimension_y,
    encodingFormat: `image/${wallpaper.file_type.replace("image/", "")}`,
    contentSize: `${(wallpaper.file_size / (1024 * 1024)).toFixed(1)}MB`,
    dateCreated: wallpaper.created_at,
    license: "https://wallhaven.cc/",
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://kibewall.com" },
      { "@type": "ListItem", position: 2, name: "Explore", item: "https://kibewall.com/explore" },
      { "@type": "ListItem", position: 3, name: `Wallpaper ${wallpaper.id}` },
    ],
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(imageObjectSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6">
        <ol className="flex items-center gap-2">
          <li><Link href="/" className="hover:text-foreground transition-colors">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href="/explore" className="hover:text-foreground transition-colors">Explore</Link></li>
          <li aria-hidden="true">/</li>
          <li className="text-foreground font-medium truncate">Wallpaper {wallpaper.id}</li>
        </ol>
      </nav>

      <div className="grid md:grid-cols-[2fr_1fr] gap-8">
        <div className="relative">
          <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-muted">
            <Image
              src={wallpaper.thumbs.large || "/placeholder.svg"}
              alt={tagsText}
              fill
              sizes="(max-width: 768px) 100vw, 66vw"
              className="object-cover"
              priority
            />
          </div>

          <div className="mt-4 flex items-center justify-between">
            <WallpaperActions wallpaper={wallpaper} />
            <a
              href={wallpaper.path}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-md border hover:border-foreground/20"
              download
            >
              <Download size={14} />
              View Full Resolution ({wallpaper.resolution})
            </a>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <WallpaperMetadata wallpaper={wallpaper} />
            </CardContent>
          </Card>

          {wallpaper.tags && wallpaper.tags.length > 0 && (
            <div>
              <h2 className="text-lg font-medium mb-3">Tags</h2>
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

          <div className="flex items-center gap-6 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Eye size={16} />
              <span>{wallpaper.views.toLocaleString()} views</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart size={16} />
              <span>{wallpaper.favorites.toLocaleString()} favorites</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
