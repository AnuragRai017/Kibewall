import { useEffect, useState } from "react"
import { FlatList, RefreshControl, SafeAreaView, StyleSheet, Text, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import type { Wallpaper } from "../../lib/api"
import { searchWallpapers } from "../../lib/api"
import { WallpaperCard } from "../../components/WallpaperCard"

export default function Home() {
  const insets = useSafeAreaInsets()
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const loadTop = async () => {
    try {
      setLoading(true)
      setError("")
      const result = await searchWallpapers("", "toplist")
      setWallpapers(result.data.slice(0, 30))
    } catch {
      setError("Failed to load wallpapers")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTop()
  }, [])

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <Text style={styles.title}>Top Wallpapers</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <FlatList
        data={wallpapers}
        renderItem={({ item }) => <WallpaperCard item={item} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={loadTop} tintColor="#55d6be" />}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0b1117" },
  title: { color: "#e8f0f4", fontSize: 24, fontWeight: "700", marginLeft: 10, marginTop: 8 },
  error: { color: "#ff6b6b", marginHorizontal: 10, marginVertical: 8 },
  list: { paddingBottom: 20 },
})
