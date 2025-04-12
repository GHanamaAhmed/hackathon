import type { Metadata } from "next"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ReportsChart } from "@/components/dashboard/charts/reports-chart"
import { ReportsFilter } from "@/components/dashboard/reports-filter"

export const metadata: Metadata = {
  title: "Dashboard | Reports",
  description: "Reports dashboard with comparative data analysis",
}

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Reports</h1>
        <p className="text-muted-foreground">Compare data across categories and regions.</p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="space-y-1">
            <CardTitle>Product Performance</CardTitle>
            <CardDescription>Compare performance across product categories.</CardDescription>
          </div>
          <ReportsFilter />
        </CardHeader>
        <CardContent>
          <ReportsChart />
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Performing Product</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Product A</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Highest Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Product C</div>
            <p className="text-xs text-muted-foreground">+42.5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Needs Attention</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Product B</div>
            <p className="text-xs text-muted-foreground">-5.2% from last month</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
