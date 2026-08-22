import { useEffect, useState } from "react"
import { FlatList, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { router } from "expo-router"
import { Ionicons } from "@expo/vector-icons"

const CATEGORIES = [
  { id: "010", name: "Anime", icon: "image-outline" },
  { id: "100", name: "General", icon: "photograph-outline" },
  { id: "101", name: "Landscape", icon: "mountain-outline" },
  { id: "110", name: "People", icon: "person-outline" },
]

export default function Categories() {
  const insets = useSafeAreaInsets()
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <Text style={styles.title}>Browse by Category</Text>
      <FlatList
        data={CATEGORIES}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              setSelected(item.id)
              router.push({ pathname: "/explore", params: { category: item.id } })
            }}
            style={[styles.categoryCard, selected === item.id && styles.categoryCardActive]}
          >
            <Ionicons name={item.icon as any} size={32} color={selected === item.id ? "#0b1117" : "#55d6be"} />
            <Text style={[styles.categoryName, selected === item.id && styles.categoryNameActive]}>{item.name}</Text>
            <Ionicons name="chevron-forward" size={20} color={selected === item.id ? "#0b1117" : "#55d6be"} style={styles.arrow} />
          </Pressable>
        )}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0b1117" },
  title: { color: "#e8f0f4", fontSize: 24, fontWeight: "700", marginLeft: 10, marginTop: 8, marginBottom: 16 },
  list: { paddingHorizontal: 10, gap: 12 },
  categoryCard: { backgroundColor: "#17212b", borderRadius: 12, padding: 16, flexDirection: "row", alignItems: "center", gap: 16, borderWidth: 2, borderColor: "transparent" },
  categoryCardActive: { backgroundColor: "#55d6be", borderColor: "#55d6be" },
  categoryName: { flex: 1, fontSize: 16, fontWeight: "600", color: "#e8f0f4" },
  categoryNameActive: { color: "#0b1117" },
  arrow: { marginLeft: 8 },
})
