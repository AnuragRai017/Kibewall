import { Suspense } from "react"
import Link from "next/link"
import { fetchWallpapers } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { HeroSection } from "@/components/hero-section"
import { AnimatedWallpaperCard } from "@/components/animated-wallpaper-card"
import { LoadingScreen } from "@/components/loading-screen"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Suspense fallback={<LoadingScreen />}>
        <HeroSection />

        <FeaturedWallpapers />

        <CategoriesSection />
      </Suspense>
    </main>
  )
}

async function FeaturedWallpapers() {
  const { data: wallpapers } = await fetchWallpapers({
    sorting: "toplist",
    purity: "100",
    categories: "010",
    page: 1,
  })

  const featuredWallpapers = wallpapers.slice(0, 8)

  return (
    <section className="py-16 px-4 container mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold">Featured Wallpapers</h2>
          <p className="text-muted-foreground mt-2">Top picks from our collection</p>
        </div>
        <Link href="/explore">
          <Button variant="outline" className="gap-2">
            View All <ChevronRight size={16} />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {featuredWallpapers.map((wallpaper, index) => (
          <AnimatedWallpaperCard key={wallpaper.id} wallpaper={wallpaper} index={index} />
        ))}
      </div>
    </section>
  )
}

function CategoriesSection() {
  const categories = [
    {
      id: "anime",
      title: "Anime",
      description: "Japanese animation wallpapers",
      image: "/placeholder.svg?height=400&width=600",
      color: "from-pink-500 to-purple-600",
      link: "/explore?categories=010",
    },
    {
      id: "general",
      title: "General",
      description: "Beautiful scenery and abstract art",
      image: "/placeholder.svg?height=400&width=600",
      color: "from-blue-500 to-cyan-600",
      link: "/explore?categories=100",
    },
    {
      id: "people",
      title: "People",
      description: "Portraits and character art",
      image: "/placeholder.svg?height=400&width=600",
      color: "from-amber-500 to-orange-600",
      link: "/explore?categories=001",
    },
  ]

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Browse by Category</h2>
          <p className="text-muted-foreground mt-2">Find the perfect wallpaper for your style</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Link href={category.link} key={category.id}>
              <div
                className="relative overflow-hidden rounded-xl h-64 group cursor-pointer"
                style={{
                  backgroundImage: `url(${category.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-70 transition-opacity group-hover:opacity-80`}
                />
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <h3 className="text-white text-2xl font-bold">{category.title}</h3>
                  <p className="text-white/80 mt-2">{category.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
