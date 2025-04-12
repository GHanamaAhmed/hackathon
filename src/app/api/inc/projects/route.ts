import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req: NextRequest) {
  try {
    // Return only projects routed to interface 3.
    const projects = await db.project.findMany({
      where: {
        state: "ROUTED_TO_UI",
        currentStep: 1,
      },
      // Optionally include team members:
      include: { teamMembers: true },
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error("Error fetching CATI projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}
