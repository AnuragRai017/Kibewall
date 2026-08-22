import { Pressable, StyleSheet, Text, View } from "react-native"
import { Image } from "expo-image"
import { router } from "expo-router"
import type { Wallpaper } from "../lib/api"
export function WallpaperCard({ item }: { item: Wallpaper }) { return <Pressable accessibilityRole="button" onPress={() => router.push(`/wallpaper/${item.id}`)} style={styles.card}><Image source={{uri:item.thumbs.large || item.path}} contentFit="cover" style={styles.image}/><View style={styles.overlay}><Text style={styles.resolution}>{item.resolution}</Text></View></Pressable> }
const styles=StyleSheet.create({card:{flex:1,margin:5,borderRadius:14,overflow:"hidden",backgroundColor:"#17212b",minHeight:190},image:{width:"100%",height:220},overlay:{position:"absolute",bottom:0,left:0,right:0,padding:10,backgroundColor:"rgba(8,14,20,.72)"},resolution:{color:"#e8f0f4",fontSize:12,fontWeight:"600"}})
