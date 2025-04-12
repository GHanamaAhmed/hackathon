import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const project = await db.project.findMany({
      where: { id },
      include: { teamMembers: true },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Ensure that the project is routed to interface 3.
    // Adjust the field name according to your schema; here we assume either:
    // - project.state must equal "ROUTED_TO_UI", and
    // - project.interfaceNo (or currentStep) equals "3" (or 3)
    if (project.state !== "ROUTED_TO_UI" || project.currentStep !== 2) {
      return NextResponse.json(
        { error: "Project is not routed to Interface 3" },
        { status: 403 }
      );
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json(
      { error: "Failed to fetch project" },
      { status: 500 }
    );
  }
}
