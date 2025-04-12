"use client"

import { ArrowDown, ArrowUp, DollarSign, Users, Activity, CreditCard } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$45,231.89</div>
          <p className="text-xs text-muted-foreground flex items-center">
            <span className="flex items-center text-green-500 mr-1">
              <ArrowUp className="h-3 w-3 mr-1" />
              20.1%
            </span>
            from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+2,350</div>
          <p className="text-xs text-muted-foreground flex items-center">
            <span className="flex items-center text-green-500 mr-1">
              <ArrowUp className="h-3 w-3 mr-1" />
              12.2%
            </span>
            from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Performance Score</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">92.6%</div>
          <p className="text-xs text-muted-foreground flex items-center">
            <span className="flex items-center text-green-500 mr-1">
              <ArrowUp className="h-3 w-3 mr-1" />
              4.3%
            </span>
            from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Sales</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+12,234</div>
          <p className="text-xs text-muted-foreground flex items-center">
            <span className="flex items-center text-red-500 mr-1">
              <ArrowDown className="h-3 w-3 mr-1" />
              1.5%
            </span>
            from last month
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
