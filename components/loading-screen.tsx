"use client"

import type { FC } from "react"
import { motion } from "framer-motion"
import { Logo } from "./logo"

interface LoadingScreenProps {
  message?: string
}

export const LoadingScreen: FC<LoadingScreenProps> = ({ message = "Loading amazing wallpapers..." }) => {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <Logo size="lg" />

        <motion.div
          className="mt-8 h-1 w-48 bg-muted overflow-hidden rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-purple-600 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        </motion.div>

        <motion.p
          className="mt-4 text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {message}
        </motion.p>
      </motion.div>
    </div>
  )
}
