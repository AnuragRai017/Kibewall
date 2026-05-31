"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Download, Share2, Heart } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import type { Wallpaper } from "@/lib/types"

export function WallpaperActions({ wallpaper }: { wallpaper: Wallpaper }) {
  const [isFavorited, setIsFavorited] = useState(false)

  const handleDownload = () => {
    toast({
      title: "Download started",
      description: "Your wallpaper is being downloaded",
    })
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `KibeWall - Anime Wallpaper ${wallpaper.id}`,
          url: window.location.href,
        })
        .catch(console.error)
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast({
        title: "Link copied",
        description: "Wallpaper link copied to clipboard",
      })
    }
  }

  const handleFavorite = () => {
    setIsFavorited(!isFavorited)
    toast({
      title: isFavorited ? "Removed from favorites" : "Added to favorites",
      description: isFavorited ? "Wallpaper removed from your favorites" : "Wallpaper added to your favorites",
    })
  }

  return (
    <motion.div
      className="mt-4 flex flex-wrap gap-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <Button asChild className="gap-2" onClick={handleDownload}>
        <a href={wallpaper.path} download target="_blank" rel="noopener noreferrer">
          <Download size={16} />
          Download
        </a>
      </Button>

      <Button variant="outline" className="gap-2" onClick={handleShare}>
        <Share2 size={16} />
        Share
      </Button>

      <Button variant={isFavorited ? "default" : "outline"} className="gap-2" onClick={handleFavorite}>
        <AnimatePresence mode="wait">
          <motion.div
            key={isFavorited ? "filled" : "outline"}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Heart size={16} fill={isFavorited ? "currentColor" : "none"} />
          </motion.div>
        </AnimatePresence>
        {isFavorited ? "Favorited" : "Favorite"}
      </Button>
    </motion.div>
  )
}
