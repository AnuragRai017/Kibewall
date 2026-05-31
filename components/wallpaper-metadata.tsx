"use client"

import { motion } from "framer-motion"
import { formatDistanceToNow } from "date-fns"
import type { Wallpaper } from "@/lib/types"

export default function WallpaperMetadata({ wallpaper }: { wallpaper: Wallpaper }) {
  const metadataItems = [
    { label: "Resolution", value: wallpaper.resolution },
    { label: "Category", value: wallpaper.category, capitalize: true },
    { label: "Content Rating", value: wallpaper.purity, capitalize: true },
    { label: "File Size", value: formatFileSize(wallpaper.file_size) },
    { label: "File Type", value: wallpaper.file_type.split("/")[1].toUpperCase() },
    { label: "Added", value: formatDate(wallpaper.created_at) },
  ]

  return (
    <motion.div className="space-y-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <div>
        <h2 className="text-lg font-medium mb-1">Wallpaper Details</h2>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          {metadataItems.map((item, index) => (
            <motion.div
              key={item.label}
              className="contents"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="text-muted-foreground">{item.label}</div>
              <div className={item.capitalize ? "capitalize" : ""}>{item.value}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {wallpaper.colors && wallpaper.colors.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <h3 className="text-sm font-medium mb-2">Colors</h3>
          <div className="flex flex-wrap gap-2">
            {wallpaper.colors.map((color, index) => (
              <motion.div
                key={color}
                className="w-6 h-6 rounded-full border"
                style={{ backgroundColor: color }}
                title={color}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6 + index * 0.05 }}
                whileHover={{ scale: 1.2, transition: { delay: 0 } }}
              />
            ))}
          </div>
        </motion.div>
      )}

      {wallpaper.source && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
          <h3 className="text-sm font-medium mb-1">Source</h3>
          <a
            href={wallpaper.source}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline break-all"
          >
            {wallpaper.source}
          </a>
        </motion.div>
      )}
    </motion.div>
  )
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B"
  else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB"
  else return (bytes / 1048576).toFixed(1) + " MB"
}

function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString)
    return formatDistanceToNow(date, { addSuffix: true })
  } catch (error) {
    return dateString
  }
}
