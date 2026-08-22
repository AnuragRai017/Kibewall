import { useEffect, useRef, useState } from "react"
import { FlatList, RefreshControl, SafeAreaView, StyleSheet, TextInput, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import type { Wallpaper } from "../../lib/api"
import { searchWallpapers } from "../../lib/api"
import { WallpaperCard } from "../../components/WallpaperCard"

export default function Explore() {
  const insets = useSafeAreaInsets()
  const [query, setQuery] = useState("")
  const [sorting, setSorting] = useState("relevance")
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([])
  const [loading, setLoading] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const doSearch = async (q: string) => {
    if (!q.trim()) {
      setWallpapers([])
      return
    }
    try {
      setLoading(true)
      const result = await searchWallpapers(q, sorting)
      setWallpapers(result.data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const handleChangeQuery = (text: string) => {
    setQuery(text)
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => doSearch(text), 500)
  }

  const sortingOptions = ["relevance", "date_added", "toplist", "random"]

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={18} color="#71808b" />
          <TextInput
            placeholder="Search wallpapers..."
            placeholderTextColor="#71808b"
            value={query}
            onChangeText={handleChangeQuery}
            style={styles.input}
          />
        </View>
      </View>

      <View style={styles.sortingRow}>
        {sortingOptions.map((opt) => (
          <View
            key={opt}
            onTouchEnd={() => {
              setSorting(opt)
              doSearch(query)
            }}
            style={[styles.sortChip, sorting === opt && styles.sortChipActive]}
          >
            <Ionicons
              name={opt === "relevance" ? "filter" : opt === "random" ? "shuffle" : "arrow-down"}
              size={14}
              color={sorting === opt ? "#0b1117" : "#55d6be"}
              style={{ marginRight: 4 }}
            />
          </View>
        ))}
      </View>

      <FlatList
        data={wallpapers}
        renderItem={({ item }) => <WallpaperCard item={item} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={() => doSearch(query)} tintColor="#55d6be" />}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0b1117" },
  header: { paddingHorizontal: 10, paddingVertical: 10 },
  searchBox: { flexDirection: "row", alignItems: "center", backgroundColor: "#17212b", borderRadius: 10, paddingHorizontal: 10, height: 42 },
  input: { flex: 1, marginLeft: 8, color: "#e8f0f4", fontSize: 14 },
  sortingRow: { flexDirection: "row", paddingHorizontal: 10, paddingVertical: 8, gap: 6 },
  sortChip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, flexDirection: "row", backgroundColor: "transparent", borderWidth: 1, borderColor: "#55d6be" },
  sortChipActive: { backgroundColor: "#55d6be", borderColor: "#55d6be" },
  list: { paddingBottom: 20 },
})
