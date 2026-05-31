"use client"

import type { FC } from "react"
import { motion } from "framer-motion"
import Link from "next/link"

interface LogoProps {
  size?: "sm" | "md" | "lg"
  withText?: boolean
}

export const Logo: FC<LogoProps> = ({ size = "md", withText = true }) => {
  const sizes = {
    sm: { icon: 24, text: "text-lg" },
    md: { icon: 32, text: "text-xl" },
    lg: { icon: 48, text: "text-3xl" },
  }

  return (
    <Link href="/">
      <motion.div className="flex items-center gap-2" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <div className="relative">
          <motion.div
            className="absolute inset-0 bg-primary/20 rounded-full blur-md"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
          <div
            className={`relative flex items-center justify-center w-${sizes[size].icon} h-${sizes[size].icon} bg-gradient-to-br from-primary to-purple-600 rounded-full`}
          >
            <svg
              width={sizes[size].icon * 0.6}
              height={sizes[size].icon * 0.6}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                fill="white"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        {withText && (
          <motion.span
            className={`font-bold ${sizes[size].text} bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            KibeWall
          </motion.span>
        )}
      </motion.div>
    </Link>
  )
}
