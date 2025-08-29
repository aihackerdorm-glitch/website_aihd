import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Link, useLocation } from "react-router-dom"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavBarProps {
  items: NavItem[]
  className?: string
}

export function NavBar({ items, className }: NavBarProps) {
  const location = useLocation()
  const [isMobile, setIsMobile] = useState(false)
  const [currentHash, setCurrentHash] = useState<string>(() => window.location.hash)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Keep track of hash changes triggered by scrollspy or manual updates
  useEffect(() => {
    const onHash = () => setCurrentHash(window.location.hash)
    window.addEventListener("hashchange", onHash)
    window.addEventListener("popstate", onHash)
    return () => {
      window.removeEventListener("hashchange", onHash)
      window.removeEventListener("popstate", onHash)
    }
  }, [])

  return (
    <div
      className={cn(
        "flex items-center gap-2",
        className,
      )}
    >
      <div className="flex items-center gap-1 bg-background/5 border border-border backdrop-blur-lg py-1 px-1 rounded-full shadow-lg">
        {items.map((item) => {
          const Icon = item.icon
          const pathname = location.pathname
          const isAnchor = item.url.includes("#")
          let isActive = false
          if (isAnchor) {
            const targetHash = item.url.substring(item.url.indexOf("#"))
            isActive = pathname === "/" && currentHash === targetHash
          } else {
            isActive = item.url === "/"
              ? pathname === "/" && !location.hash
              : pathname === item.url || pathname.startsWith(item.url + "/")
          }

          const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
            if (!isAnchor) return
            const targetHash = item.url.substring(item.url.indexOf("#"))
            const id = targetHash.slice(1)
            // If already on home route, do a smooth in-page scroll instead of full navigation
            if (pathname === "/") {
              e.preventDefault()
              const el = document.getElementById(id)
              if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "start" })
                // Update the hash so active tab highlights immediately
                history.replaceState(null, "", `/${targetHash}`)
                setCurrentHash(targetHash)
                window.dispatchEvent(new HashChangeEvent("hashchange"))
              }
            }
          }

          return (
            <Link
              key={item.name}
              to={item.url}
              onClick={handleClick}
              className={cn(
                "relative cursor-pointer text-sm font-semibold px-3 md:px-4 py-2 rounded-full transition-colors",
                "text-foreground/80 hover:text-primary",
                isActive && "bg-muted text-primary",
              )}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                <Icon size={16} strokeWidth={2.5} />
              </span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-primary/5 rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-1 bg-primary rounded-t-full">
                    <div className="absolute w-8 h-4 bg-primary/20 rounded-full blur-md -top-1 -left-1" />
                    <div className="absolute w-6 h-4 bg-primary/20 rounded-full blur-md -top-0.5" />
                    <div className="absolute w-3 h-3 bg-primary/20 rounded-full blur-sm top-0 left-1.5" />
                  </div>
                </motion.div>
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
}