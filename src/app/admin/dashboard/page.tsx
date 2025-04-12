"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminProjectList } from "@/components/admin-project-list";
import { DownloadIcon, Settings } from "lucide-react";

export default function AdminDashboard() {
  const [projectCount, setProjectCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await fetch("/api/admin/dashboard");
        const data = await response.json();
        setProjectCount(data.totalCount);
        setPendingCount(data.pendingCount);
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchCounts();
  }, []);
  return (
    <div className="container py-8 w-full flex justify-center items-center">
      <div className="w-[90%]">
        {" "}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Administrator Dashboard</h1>
          <div className="flex gap-2">
            <Link href="/admin/settings">
              <Button variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </Link>
            <Link href="/">
              <Button variant="ghost">Sign Out</Button>
            </Link>
          </div>
        </div>
        <div className="grid gap-6 mb-8 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Total Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{projectCount}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Pending Review</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{pendingCount}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Export Data</CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="w-full">
                <DownloadIcon className="w-4 h-4 mr-2" />
                Download CSV/Excel
              </Button>
            </CardContent>
          </Card>
        </div>
        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Projects</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="processing">Processing</TabsTrigger>
            <TabsTrigger value="routed">Routed</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <AdminProjectList filter="all" />
          </TabsContent>

          <TabsContent value="pending">
            <AdminProjectList filter="pending" />
          </TabsContent>

          <TabsContent value="processing">
            <AdminProjectList filter="processing" />
          </TabsContent>

          <TabsContent value="routed">
            <AdminProjectList filter="routed" />
          </TabsContent>

          <TabsContent value="rejected">
            <AdminProjectList filter="rejected" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
