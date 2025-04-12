import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const statusFilter = searchParams.get("status");

  let whereClause = {};
  if (statusFilter && statusFilter !== "all") {
    let stateEnum: string | undefined;
    // Map the filter from the client to your Prisma enum values.
    // In this example, we assume that "pending" corresponds to the "SENT" state.
    if (statusFilter === "pending") {
      stateEnum = "SENT";
    } else if (statusFilter === "processing") {
      stateEnum = "PROCESSING";
    } else if (statusFilter === "routed") {
      stateEnum = "ROUTED_TO_UI";
    } else if (statusFilter === "rejected") {
      stateEnum = "REJECTED";
    }
    if (stateEnum) {
      whereClause = { state: stateEnum };
    }
  }

  try {
    const projects = await db.project.findMany({
      where: { ...whereClause },
    });
    return NextResponse.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}
