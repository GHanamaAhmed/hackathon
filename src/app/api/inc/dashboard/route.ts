import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    // Count only projects that belong to CDE
    const totalCount = await db.project.count({
      where: {
        currentStep: 1,
      },
    });

    // Assuming pending review means projects in the SENT state
    const pendingCount = await db.project.count({
      where: {
        currentStep: 1,
        state: "SENT",
      },
    });

    return NextResponse.json({ totalCount, pendingCount });
  } catch (error) {
    console.error("Error fetching dashboard counts:", error);
    return NextResponse.json(
      { error: "Failed to fetch counts" },
      { status: 500 }
    );
  }
}
