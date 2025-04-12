"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

// This page displays project details for CATI users in view-only mode.
export default function CATIProjectDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Unwrap asynchronous params with React.use()
  const resolvedParams = React.use(params);
  const { id } = resolvedParams;

  const router = useRouter();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch project details from the server
  useEffect(() => {
    async function fetchProject() {
      try {
        const res = await fetch(`/api/admin/projects/${id}`);
        if (!res.ok) throw new Error("Error fetching project details");
        const data = await res.json();
        setProject(data);
      } catch (err: any) {
        console.error(err);
        setError("Failed to load project details.");
      } finally {
        setLoading(false);
      }
    }
    fetchProject();
  }, [id]);

  if (loading) return <p>Loading project details...</p>;
  if (error) return <p>{error}</p>;
  if (!project) return <p>No project found.</p>;

  return (
    <div className="container py-8 flex justify-center items-center">
      <div className="w-[90%]">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => router.push("/admin/cati")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        <Card>
          <CardHeader>
            <CardTitle>{project.title}</CardTitle>
            <CardDescription>
              {project.state} on{" "}
              {new Date(
                project.createdAt || project.updatedAt
              ).toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="mb-2 text-lg font-medium">Project Description</h3>
              <p>{project.description}</p>
            </div>

            <div>
              <h3 className="mb-2 text-lg font-medium">Team Members</h3>
              {project.teamMembers.map((member: any, index: number) => (
                <div key={index} className="p-4 mb-2 border rounded-md">
                  <p>
                    <strong>Name:</strong> {member.name}
                  </p>
                  <p>
                    <strong>Student ID:</strong> {member.studentId}
                  </p>
                  <p>
                    <strong>Email:</strong> {member.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {member.phone}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
