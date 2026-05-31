"use client"

import { useState } from "react"
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
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/wallpaper/${wallpaper.id}`}>
        <Card
          className="overflow-hidden h-full group cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="aspect-[16/9] relative overflow-hidden bg-muted">
            <motion.div
              animate={{
                scale: isHovered ? 1.05 : 1,
                filter: isHovered ? "brightness(1.1)" : "brightness(1)",
              }}
              transition={{ duration: 0.3 }}
              className="h-full w-full"
            >
              <Image
                src={wallpaper.thumbs.large || "/placeholder.svg"}
                alt={`Wallpaper ${wallpaper.id}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover"
              />
            </motion.div>

            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent p-4 flex flex-col justify-end"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-white">
                <p className="font-medium">{wallpaper.resolution}</p>
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
            </motion.div>

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
    </motion.div>
  )
}
