import AsyncStorage from "@react-native-async-storage/async-storage"
import type { Wallpaper } from "./api"
const KEY = "kibewall:favorites"
export async function readFavorites():Promise<Wallpaper[]> { const raw = await AsyncStorage.getItem(KEY); return raw ? JSON.parse(raw) : [] }
export async function toggleFavorite(wallpaper:Wallpaper) { const items = await readFavorites(); const next = items.some(x => x.id === wallpaper.id) ? items.filter(x => x.id !== wallpaper.id) : [wallpaper, ...items]; await AsyncStorage.setItem(KEY, JSON.stringify(next)); return next }
