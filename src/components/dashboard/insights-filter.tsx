"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Filter } from "lucide-react"

export function InsightsFilter() {
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>(["Revenue", "Users", "Conversion Rate"])

  const handleMetricChange = (metric: string) => {
    setSelectedMetrics((prev) => (prev.includes(metric) ? prev.filter((item) => item !== metric) : [...prev, metric]))
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 gap-1">
          <Filter className="h-3.5 w-3.5" />
          <span>Filter Metrics</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuLabel>Metrics</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={selectedMetrics.includes("Revenue")}
          onCheckedChange={() => handleMetricChange("Revenue")}
        >
          Revenue
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={selectedMetrics.includes("Users")}
          onCheckedChange={() => handleMetricChange("Users")}
        >
          Users
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={selectedMetrics.includes("Conversion Rate")}
          onCheckedChange={() => handleMetricChange("Conversion Rate")}
        >
          Conversion Rate
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={selectedMetrics.includes("Engagement")}
          onCheckedChange={() => handleMetricChange("Engagement")}
        >
          Engagement
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
