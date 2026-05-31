"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Eye, Heart } from "lucide-react"
import type { Wallpaper } from "@/lib/types"

interface AnimatedWallpaperCardProps {
  wallpaper: Wallpaper
  index: number
}

export function AnimatedWallpaperCard({ wallpaper, index }: AnimatedWallpaperCardProps) {
  const altText = wallpaper.tags?.slice(0, 3).map((t) => t.name).join(", ") || `Anime wallpaper ${wallpaper.id}`

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <article>
        <Link href={`/wallpaper/${wallpaper.id}`}>
          <Card className="overflow-hidden h-full group cursor-pointer transition-transform duration-300 hover:scale-[1.02] border-0 shadow-lg">
            <div className="aspect-[16/9] relative overflow-hidden bg-muted">
              <div className="h-full w-full transition-transform duration-300 group-hover:scale-105 group-hover:brightness-110">
                <Image
                  src={wallpaper.thumbs.large || "/placeholder.svg"}
                  alt={altText}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover"
                  loading={index > 4 ? "lazy" : undefined}
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="text-white">
                  <p className="font-medium text-sm truncate">{wallpaper.resolution}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-1">
                      <Eye size={14} />
                      <span className="text-sm">{wallpaper.views}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart size={14} />
                      <span className="text-sm">{wallpaper.favorites}</span>
                    </div>
                  </div>
                </div>
              </div>

              {wallpaper.colors && wallpaper.colors.length > 0 && (
                <div className="absolute bottom-0 left-0 right-0 flex h-1">
                  {wallpaper.colors.map((color) => (
                    <div key={color} className="flex-1 h-full" style={{ backgroundColor: color }} />
                  ))}
                </div>
              )}
            </div>
          </Card>
        </Link>
      </article>
    </motion.div>
  )
}
