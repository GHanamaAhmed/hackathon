"use client";

import type React from "react";

import { useState } from "react";
import { usePathname } from "next/navigation";

import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
export default async function DashboardProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex flex-1">
        <DashboardSidebar
          isOpen={isMobile ? sidebarOpen : true}
          onClose={() => setSidebarOpen(false)}
          currentPath={pathname}
        />
        {children}
      </div>
    </div>
  );
}
