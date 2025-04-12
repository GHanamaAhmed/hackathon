import type React from "react";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import DashboardProvider from "@/components/dashboardProvider";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/sign-in");
  }
  return (
    <DashboardProvider>
      <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
        {children}
      </main>
    </DashboardProvider>
  );
}
