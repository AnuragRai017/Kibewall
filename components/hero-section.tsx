"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

interface TopWallpaper {
  path: string
}

export function HeroSection({ topWallpapers }: { topWallpapers: TopWallpaper[] }) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [backgroundIndex, setBackgroundIndex] = useState(0)

  const wallpapers = topWallpapers.length > 0
    ? topWallpapers
    : [
        { path: "/placeholder.svg?height=1080&width=1920" },
        { path: "/placeholder.svg?height=1080&width=1920" },
        { path: "/placeholder.svg?height=1080&width=1920" },
      ]

  useEffect(() => {
    if (wallpapers.length === 0) return
    const interval = setInterval(() => {
      setBackgroundIndex((prev) => (prev + 1) % wallpapers.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [wallpapers.length])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/explore?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      {wallpapers.map((wallpaper, index) => (
        <motion.div
          key={index}
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${wallpaper.path})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: backgroundIndex === index ? 1 : 0,
            scale: backgroundIndex === index ? 1 : 1.1,
          }}
          transition={{ duration: 1.5 }}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />

      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Discover Amazing Anime Wallpapers</h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Find the perfect wallpaper for your device from our vast collection
          </p>

          <form onSubmit={handleSearch} className="flex w-full max-w-lg mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for wallpapers..."
                className="pl-10 h-12 rounded-r-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button type="submit" className="h-12 px-6 rounded-l-none">
              Search
            </Button>
          </form>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button variant="outline" size="sm" onClick={() => router.push("/explore?q=naruto")}>
              Naruto
            </Button>
            <Button variant="outline" size="sm" onClick={() => router.push("/explore?q=one+piece")}>
              One Piece
            </Button>
            <Button variant="outline" size="sm" onClick={() => router.push("/explore?q=demon+slayer")}>
              Demon Slayer
            </Button>
            <Button variant="outline" size="sm" onClick={() => router.push("/explore?q=attack+on+titan")}>
              Attack on Titan
            </Button>
            <Button variant="outline" size="sm" onClick={() => router.push("/explore?q=my+hero+academia")}>
              My Hero Academia
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
