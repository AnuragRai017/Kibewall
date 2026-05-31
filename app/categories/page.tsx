"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CategoriesPage() {
  const categories = [
    {
      id: "anime",
      title: "Anime",
      description: "Japanese animation wallpapers",
      image: "/placeholder.svg?height=400&width=600",
      color: "from-pink-500 to-purple-600",
      link: "/explore?categories=010",
      tags: ["Naruto", "One Piece", "Demon Slayer", "Attack on Titan", "My Hero Academia"],
    },
    {
      id: "general",
      title: "General",
      description: "Beautiful scenery and abstract art",
      image: "/placeholder.svg?height=400&width=600",
      color: "from-blue-500 to-cyan-600",
      link: "/explore?categories=100",
      tags: ["Nature", "Abstract", "Space", "Minimalist", "Cityscape"],
    },
    {
      id: "people",
      title: "People",
      description: "Portraits and character art",
      image: "/placeholder.svg?height=400&width=600",
      color: "from-amber-500 to-orange-600",
      link: "/explore?categories=001",
      tags: ["Portraits", "Cosplay", "Fantasy", "Artistic", "Photography"],
    },
  ]

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Categories</h1>
      <p className="text-muted-foreground mb-12">Browse wallpapers by category</p>

      <div className="space-y-16">
        {categories.map((category, index) => (
          <motion.section
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="space-y-6"
          >
            <div className="flex flex-col md:flex-row gap-8">
              <motion.div
                className="flex-1 relative overflow-hidden rounded-xl h-64"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Link href={category.link}>
                  <div
                    className="h-full w-full"
                    style={{
                      backgroundImage: `url(${category.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-70`} />
                    <div className="absolute inset-0 p-6 flex flex-col justify-end">
                      <h2 className="text-white text-3xl font-bold">{category.title}</h2>
                      <p className="text-white/80 mt-2">{category.description}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>

              <div className="flex-1 space-y-4">
                <h3 className="text-xl font-medium">Popular {category.title} Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {category.tags.map((tag) => (
                    <motion.div key={tag} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Link href={`/explore?q=${encodeURIComponent(tag)}&categories=${category.link.split("=")[1]}`}>
                        <Button variant="outline" size="sm">
                          {tag}
                        </Button>
                      </Link>
                    </motion.div>
                  ))}
                </div>
                <div className="pt-4">
                  <Link href={category.link}>
                    <Button>Browse All {category.title}</Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.section>
        ))}
      </div>
    </main>
  )
}
