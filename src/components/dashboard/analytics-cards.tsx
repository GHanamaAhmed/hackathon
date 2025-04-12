"use client"

import { ArrowDown, ArrowUp, Users, Clock, MousePointer } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function AnalyticsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Visitors</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">24,456</div>
          <p className="text-xs text-muted-foreground flex items-center">
            <span className="flex items-center text-green-500 mr-1">
              <ArrowUp className="h-3 w-3 mr-1" />
              14.6%
            </span>
            from last period
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg. Session Duration</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">3m 42s</div>
          <p className="text-xs text-muted-foreground flex items-center">
            <span className="flex items-center text-green-500 mr-1">
              <ArrowUp className="h-3 w-3 mr-1" />
              8.2%
            </span>
            from last period
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Click-through Rate</CardTitle>
          <MousePointer className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">3.8%</div>
          <p className="text-xs text-muted-foreground flex items-center">
            <span className="flex items-center text-red-500 mr-1">
              <ArrowDown className="h-3 w-3 mr-1" />
              0.5%
            </span>
            from last period
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
