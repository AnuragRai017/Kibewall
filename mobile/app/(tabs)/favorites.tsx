import { useFocusEffect } from "expo-router"
import { useCallback, useState } from "react"
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import type { Wallpaper } from "../../lib/api"
import { readFavorites } from "../../lib/favorites"
import { WallpaperCard } from "../../components/WallpaperCard"

export default function Favorites() {
  const insets = useSafeAreaInsets()
  const [favorites, setFavorites] = useState<Wallpaper[]>([])

  useFocusEffect(
    useCallback(() => {
      readFavorites().then(setFavorites)
    }, [])
  )

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <Text style={styles.title}>Saved Wallpapers</Text>
      {favorites.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>No favorites yet. Like wallpapers to save them.</Text>
        </View>
      ) : (
        <FlatList data={favorites} renderItem={({ item }) => <WallpaperCard item={item} />} keyExtractor={(item) => item.id} numColumns={2} contentContainerStyle={styles.list} />
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0b1117" },
  title: { color: "#e8f0f4", fontSize: 24, fontWeight: "700", marginLeft: 10, marginTop: 8 },
  empty: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { color: "#71808b", fontSize: 16, textAlign: "center", paddingHorizontal: 20 },
  list: { paddingBottom: 20 },
})
