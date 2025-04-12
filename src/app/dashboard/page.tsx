import type { Metadata } from "next";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Overview } from "@/components/dashboard/charts/overview";
import { RecentActivity } from "@/components/dashboard/charts/recent-activity";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { VaultTable } from "@/components/table";

export const metadata: Metadata = {
  title: "Dashboard | Overview",
  description: "Dashboard overview with key metrics and charts",
};

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Dashboard Overview
        </h1>
        <p className="text-muted-foreground">
          Welcome back! Here's a summary of your data.
        </p>
      </div>

      <StatsCards />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardDescription>
              Monthly performance metrics for the current year.
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview />
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>User Distribution</CardTitle>
            <CardDescription>
              Breakdown of user roles and permissions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentActivity />
          </CardContent>
        </Card>
      </div>
      <div className="mt-6">
        <VaultTable />
      </div>
    </div>
  );
}
