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

export function ReportsFilter() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "Product A",
    "Product B",
    "Product C",
    "Product D",
  ])

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((item) => item !== category) : [...prev, category],
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 gap-1">
          <Filter className="h-3.5 w-3.5" />
          <span>Filter</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuLabel>Product Categories</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={selectedCategories.includes("Product A")}
          onCheckedChange={() => handleCategoryChange("Product A")}
        >
          Product A
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={selectedCategories.includes("Product B")}
          onCheckedChange={() => handleCategoryChange("Product B")}
        >
          Product B
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={selectedCategories.includes("Product C")}
          onCheckedChange={() => handleCategoryChange("Product C")}
        >
          Product C
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={selectedCategories.includes("Product D")}
          onCheckedChange={() => handleCategoryChange("Product D")}
        >
          Product D
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
