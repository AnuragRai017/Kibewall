import { useEffect, useState } from "react"
import { ActivityIndicator, Alert, Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Image } from "expo-image"
import { router, useLocalSearchParams } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import * as FileSystem from "expo-file-system"
import { Paths } from "expo-file-system"
import * as MediaLibrary from "expo-media-library"
import * as Sharing from "expo-sharing"
import type { Wallpaper } from "../../lib/api"
import { getWallpaper } from "../../lib/api"
import { readFavorites, toggleFavorite } from "../../lib/favorites"

export default function WallpaperDetail() {
  const insets = useSafeAreaInsets()
  const { id } = useLocalSearchParams<{ id: string }>()
  const [wallpaper, setWallpaper] = useState<Wallpaper | null>(null)
  const [loading, setLoading] = useState(true)
  const [isFavorite, setIsFavorite] = useState(false)
  const [downloading, setDownloading] = useState(false)

  useEffect(() => {
    if (!id) return
    Promise.all([
      getWallpaper(id).then(setWallpaper),
      readFavorites().then((favs) => setIsFavorite(favs.some((f) => f.id === id))),
    ]).finally(() => setLoading(false))
  }, [id])

  const handleDownload = async () => {
    if (!wallpaper) return
    try {
      setDownloading(true)
      const dir = `${Paths.document.uri}downloads/`
      await FileSystem.makeDirectoryAsync(dir, { intermediates: true }).catch(() => {})
      const filename = `kibewall_${wallpaper.id}.jpg`
      const localUri = dir + filename
      const result = await FileSystem.downloadAsync(wallpaper.path, localUri)
      if (Platform.OS === "android") {
        const perm = await MediaLibrary.requestPermissionsAsync()
        if (perm.granted) {
          await MediaLibrary.saveToLibraryAsync(result.uri)
        }
      }
      Alert.alert("Downloaded", `Saved to ${filename}`)
    } catch (e) {
      Alert.alert("Download Failed", String(e))
    } finally {
      setDownloading(false)
    }
  }

  const handleShare = async () => {
    if (!wallpaper) return
    try {
      await Sharing.shareAsync(wallpaper.path, { mimeType: "image/*", UTI: "public.image" })
    } catch (e) {
      console.error(e)
    }
  }

  const handleToggleFavorite = async () => {
    if (!wallpaper) return
    await toggleFavorite(wallpaper)
    setIsFavorite(!isFavorite)
  }

  if (loading) return <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}><ActivityIndicator size="large" color="#55d6be" /></View>
  if (!wallpaper) return <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}><Text style={styles.error}>Wallpaper not found</Text></View>

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#55d6be" />
        </Pressable>
        <Text style={styles.headerTitle}>Details</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Image source={{ uri: wallpaper.thumbs.large || wallpaper.path }} contentFit="cover" style={styles.largeImage} />

        <View style={styles.metadata}>
          <Text style={styles.resolution}>{wallpaper.resolution}</Text>
          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Ionicons name="eye-outline" size={16} color="#71808b" />
              <Text style={styles.statValue}>{wallpaper.views}</Text>
            </View>
            <View style={styles.stat}>
              <Ionicons name="heart-outline" size={16} color="#71808b" />
              <Text style={styles.statValue}>{wallpaper.favorites}</Text>
            </View>
          </View>

          {wallpaper.colors && (
            <View style={styles.colorsSection}>
              <Text style={styles.sectionLabel}>Colors</Text>
              <View style={styles.colorRow}>
                {wallpaper.colors.slice(0, 5).map((color, i) => (
                  <View key={i} style={[styles.colorDot, { backgroundColor: color }]} />
                ))}
              </View>
            </View>
          )}

          {wallpaper.tags && wallpaper.tags.length > 0 && (
            <View style={styles.tagsSection}>
              <Text style={styles.sectionLabel}>Tags</Text>
              <View style={styles.tagRow}>
                {wallpaper.tags.slice(0, 6).map((tag, i) => (
                  <Text key={i} style={styles.tag}>
                    {tag.name}
                  </Text>
                ))}
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.actions}>
        <Pressable onPress={handleToggleFavorite} style={[styles.actionButton, isFavorite && styles.actionButtonActive]}>
          <Ionicons name={isFavorite ? "heart" : "heart-outline"} size={20} color={isFavorite ? "#ff6b6b" : "#55d6be"} />
        </Pressable>
        <Pressable onPress={handleShare} style={styles.actionButton}>
          <Ionicons name="share-social-outline" size={20} color="#55d6be" />
        </Pressable>
        <Pressable onPress={handleDownload} disabled={downloading} style={[styles.downloadButton, downloading && styles.downloadButtonDisabled]}>
          <Ionicons name="download-outline" size={20} color={downloading ? "#71808b" : "#0b1117"} />
          <Text style={[styles.downloadText, downloading && styles.downloadTextDisabled]}>{downloading ? "Downloading..." : "Download"}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0b1117" },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 10, paddingVertical: 12, backgroundColor: "#101820" },
  backButton: { width: 40, height: 40, justifyContent: "center", alignItems: "center" },
  headerTitle: { color: "#e8f0f4", fontSize: 18, fontWeight: "600" },
  content: { paddingBottom: 100 },
  largeImage: { width: "100%", height: 320 },
  metadata: { paddingHorizontal: 12, paddingTop: 16 },
  resolution: { color: "#e8f0f4", fontSize: 16, fontWeight: "700" },
  statsRow: { flexDirection: "row", gap: 24, marginTop: 12 },
  stat: { flexDirection: "row", alignItems: "center", gap: 6 },
  statValue: { color: "#71808b", fontSize: 14 },
  colorsSection: { marginTop: 20 },
  sectionLabel: { color: "#71808b", fontSize: 12, fontWeight: "600", textTransform: "uppercase", marginBottom: 8 },
  colorRow: { flexDirection: "row", gap: 8 },
  colorDot: { width: 32, height: 32, borderRadius: 16 },
  tagsSection: { marginTop: 20 },
  tagRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  tag: { backgroundColor: "#17212b", color: "#55d6be", fontSize: 12, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 16 },
  actions: { position: "absolute", bottom: 0, left: 0, right: 0, flexDirection: "row", gap: 10, padding: 12, backgroundColor: "#101820", borderTopWidth: 1, borderTopColor: "#1d2a33" },
  actionButton: { width: 48, height: 48, justifyContent: "center", alignItems: "center", borderRadius: 10, backgroundColor: "#17212b" },
  actionButtonActive: { backgroundColor: "#1d2a33" },
  downloadButton: { flex: 1, flexDirection: "row", height: 48, justifyContent: "center", alignItems: "center", gap: 8, borderRadius: 10, backgroundColor: "#55d6be" },
  downloadButtonDisabled: { backgroundColor: "#71808b" },
  downloadText: { color: "#0b1117", fontWeight: "600", fontSize: 14 },
  downloadTextDisabled: { color: "#41515d" },
  error: { color: "#ff6b6b", fontSize: 16 },
})
