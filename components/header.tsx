"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { Search, Menu } from "lucide-react"
import { Logo } from "./logo"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function Header() {
  const pathname = usePathname()
  const isDetailPage = pathname.startsWith("/wallpaper/")
  const isHomePage = pathname === "/"
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        scrolled ? "bg-background/80 backdrop-blur-md border-b" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Logo withText />

        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center gap-6">
            <NavLink href="/" active={isHomePage}>
              Home
            </NavLink>
            <NavLink href="/explore" active={pathname === "/explore"}>
              Explore
            </NavLink>
            <NavLink href="/categories" active={pathname === "/categories"}>
              Categories
            </NavLink>
          </nav>

          <div className="flex items-center gap-3">
            {isDetailPage && (
              <Link href="/explore">
                <Button variant="outline" size="sm" className="gap-2">
                  <Search size={16} />
                  Browse
                </Button>
              </Link>
            )}
            <ModeToggle />
          </div>
        </div>

        <div className="md:hidden flex items-center gap-3">
          <ModeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu size={20} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center py-4">
                  <Logo size="sm" />
                </div>
                <nav className="flex flex-col gap-4 mt-8">
                  <MobileNavLink href="/" active={isHomePage}>
                    Home
                  </MobileNavLink>
                  <MobileNavLink href="/explore" active={pathname === "/explore"}>
                    Explore
                  </MobileNavLink>
                  <MobileNavLink href="/categories" active={pathname === "/categories"}>
                    Categories
                  </MobileNavLink>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  )
}

function NavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link href={href} className="relative">
      <span
        className={`text-sm font-medium transition-colors ${active ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
      >
        {children}
      </span>
      {active && (
        <motion.div
          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
          layoutId="navIndicator"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
    </Link>
  )
}

function MobileNavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link href={href}>
      <div
        className={`flex items-center py-2 px-3 rounded-md text-lg font-medium ${
          active ? "bg-primary/10 text-primary" : "text-muted-foreground"
        }`}
      >
        {children}
      </div>
    </Link>
  )
}
