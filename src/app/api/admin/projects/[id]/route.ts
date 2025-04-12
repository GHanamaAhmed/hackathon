import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// GET method: Fetch a single project by its id (including team members)
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const project = await db.project.findUnique({
      where: { id },
      include: { teamMembers: true },
    });
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
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

// PATCH method: Update project status or other fields
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    // Build the update data object dynamically
    const updateData: any = {
      state: body.status, // expected to be a mapped enum value ("SENT", "PROCESSING", "ROUTED_TO_UI", "REJECTED")
    };

    // If the status is "ROUTED_TO_UI" and an interface number is provided, update it
    if (body.status === "ROUTED_TO_UI" && body.interfaceNo) {
      updateData.currentStep = Number(body.interfaceNo);
    }
    const updatedProject = await db.project.update({
      where: { id },
      data: updateData,
    });
    return NextResponse.json(updatedProject);
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
}
