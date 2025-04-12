// app/api/projects/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;
// POST endpoint to create a new project with team members
export async function POST(request: Request) {
  try {
    const data = await request.json();
    // // get token from Auth header
    // const token = request.headers.get("Authorization")?.split(" ")[1];
    // if (!token) {
    //   return NextResponse.json(
    //     { error: "Unauthorized" },
    //     { status: 401 }
    //   );
    // }
    console.log("Creating project with data:", data.userId);
    
    const newProject = await db.project.create({
      data: {
        title: data.title,
        description: data.description,
        userId: data.userId,
        teamMembers: {
          create: data.teamMembers, // expects an array of team member objects
        },
      },
    });

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
