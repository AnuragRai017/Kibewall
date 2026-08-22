import { Stack } from "expo-router"
export default function Layout(){ return <Stack screenOptions={{headerShown:false,contentStyle:{backgroundColor:"#0b1117"}}}><Stack.Screen name="(tabs)"/><Stack.Screen name="wallpaper/[id]" options={{presentation:"card"}}/></Stack> }
