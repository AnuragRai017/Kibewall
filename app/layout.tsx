import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://kibewall.com"),
  title: {
    default: "KibeWall - Anime Wallpaper Gallery",
    template: "%s | KibeWall",
  },
  description: "Browse and download high-quality anime wallpapers for your devices. Thousands of HD anime backgrounds updated daily.",
  keywords: ["anime wallpaper", "anime background", "HD anime", "wallpaper download", "anime art", "manga"],
  authors: [{ name: "KibeWall" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kibewall.com",
    siteName: "KibeWall",
    title: "KibeWall - Anime Wallpaper Gallery",
    description: "Browse and download high-quality anime wallpapers for your devices",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "KibeWall - Anime Wallpaper Gallery",
    description: "Browse and download high-quality anime wallpapers for your devices",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.svg", sizes: "32x32", type: "image/svg+xml" },
    ],
    apple: { url: "/apple-touch-icon.svg", sizes: "180x180" },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
