import type { Metadata } from "next"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InsightsAreaChart } from "@/components/dashboard/charts/insights-area-chart"
import { InsightsScatterChart } from "@/components/dashboard/charts/insights-scatter-chart"
import { InsightsFilter } from "@/components/dashboard/insights-filter"

export const metadata: Metadata = {
  title: "Dashboard | Insights",
  description: "Detailed insights with interactive filtering",
}

export default function InsightsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Insights</h1>
          <p className="text-muted-foreground">Detailed analysis with interactive filtering.</p>
        </div>
        <InsightsFilter />
      </div>

      <Tabs defaultValue="area" className="space-y-4">
        <TabsList>
          <TabsTrigger value="area">Area Chart</TabsTrigger>
          <TabsTrigger value="scatter">Scatter Plot</TabsTrigger>
        </TabsList>
        <TabsContent value="area" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cumulative Growth</CardTitle>
              <CardDescription>Visualize cumulative growth across different metrics.</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <InsightsAreaChart />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="scatter" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Correlation Analysis</CardTitle>
              <CardDescription>Explore relationships between different metrics.</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <InsightsScatterChart />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Key Findings</CardTitle>
            <CardDescription>Important insights from the data.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="mr-2 rounded-full bg-primary/10 p-1 text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </span>
                <span>User engagement increases by 24% during weekends</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 rounded-full bg-primary/10 p-1 text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </span>
                <span>Product A and C show strong positive correlation</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 rounded-full bg-primary/10 p-1 text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </span>
                <span>Mobile users convert 15% more than desktop users</span>
              </li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recommendations</CardTitle>
            <CardDescription>Suggested actions based on insights.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="mr-2 rounded-full bg-primary/10 p-1 text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M12 5v14"></path>
                    <path d="M5 12h14"></path>
                  </svg>
                </span>
                <span>Increase weekend marketing campaigns</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 rounded-full bg-primary/10 p-1 text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M12 5v14"></path>
                    <path d="M5 12h14"></path>
                  </svg>
                </span>
                <span>Bundle Products A and C for promotional offers</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 rounded-full bg-primary/10 p-1 text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M12 5v14"></path>
                    <path d="M5 12h14"></path>
                  </svg>
                </span>
                <span>Optimize mobile experience for higher conversions</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
