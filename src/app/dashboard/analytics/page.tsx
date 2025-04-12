import type { Metadata } from "next"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AnalyticsChart } from "@/components/dashboard/charts/analytics-chart"
import { AnalyticsCards } from "@/components/dashboard/analytics-cards"

export const metadata: Metadata = {
  title: "Dashboard | Analytics",
  description: "Analytics dashboard with trend charts and metrics",
}

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">Track performance trends and metrics over time.</p>
      </div>

      <AnalyticsCards />

      <Tabs defaultValue="yearly" className="space-y-4">
        <TabsList>
          <TabsTrigger value="daily">Daily</TabsTrigger>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="yearly">Yearly</TabsTrigger>
        </TabsList>
        <TabsContent value="daily" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Daily Traffic</CardTitle>
              <CardDescription>Website traffic over the last 24 hours.</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <AnalyticsChart interval="daily" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="weekly" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Traffic</CardTitle>
              <CardDescription>Website traffic over the last 7 days.</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <AnalyticsChart interval="weekly" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="monthly" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Traffic</CardTitle>
              <CardDescription>Website traffic over the last 30 days.</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <AnalyticsChart interval="monthly" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="yearly" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Yearly Traffic</CardTitle>
              <CardDescription>Website traffic over the last 12 months.</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <AnalyticsChart interval="yearly" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
