"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { BarChart3, Home, LineChart, PieChart, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"

interface DashboardSidebarProps {
  isOpen: boolean
  onClose: () => void
  currentPath: string
}

export function DashboardSidebar({ isOpen, onClose, currentPath }: DashboardSidebarProps) {
  const isMobile = useIsMobile()
  const router = useRouter()
  const sidebarRef = useRef<HTMLDivElement>(null)

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobile && isOpen && sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isMobile, isOpen, onClose])

  const navItems = [
    {
      title: "Overview",
      href: "/dashboard",
      icon: Home,
    },
    {
      title: "Analytics",
      href: "/dashboard/analytics",
      icon: LineChart,
    },
    {
      title: "Reports",
      href: "/dashboard/reports",
      icon: BarChart3,
    },
    {
      title: "Insights",
      href: "/dashboard/insights",
      icon: PieChart,
    },
  ]

  const SidebarContent = (
    <div className="flex h-full flex-col gap-2">
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          <span className="text-lg font-semibold">DataViz</span>
        </Link>
        {isMobile && (
          <Button variant="ghost" size="icon" className="ml-auto" onClick={onClose}>
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </Button>
        )}
      </div>
      <ScrollArea className="flex-1 px-2 py-2">
        <nav className="grid gap-1">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              onClick={() => {
                if (isMobile) {
                  onClose()
                }
              }}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                currentPath === item.href ? "bg-accent text-accent-foreground" : "transparent",
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.title}
            </Link>
          ))}
        </nav>
      </ScrollArea>
    </div>
  )

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="left" className="p-0 w-[240px]">
          {SidebarContent}
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <div
      ref={sidebarRef}
      className={cn(
        "w-[240px] border-r bg-background transition-all duration-300 ease-in-out",
        isMobile && !isOpen && "-ml-[240px]",
      )}
    >
      {SidebarContent}
    </div>
  )
}
