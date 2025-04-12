"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";

type Project = {
  id: string;
  title: string;
  description: string;
  submittedDate: string;
  status: string;
  statusText: string;
  representative: string;
};

type CDEProjectListProps = {
  filter: string;
};

export function CDEProjectList({ filter }: CDEProjectListProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch projects from the server based on the filter.
  useEffect(() => {
    async function fetchProjects() {
      try {
        // Using the CDE endpoint
        const res = await fetch(`/api/cde/projects`);
        if (!res.ok) throw new Error("Error fetching projects");
        const data = await res.json();
        setProjects(data);
      } catch (err: any) {
        console.error(err);
        setError("Failed to fetch projects.");
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, [filter]);

  if (loading) return <p>Loading projects...</p>;
  if (error) return <p>{error}</p>;
  if (projects.length === 0)
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-6">
          <p className="text-muted-foreground">
            No projects found in this category.
          </p>
        </CardContent>
      </Card>
    );

  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <Card key={project.id}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>
                  Submitted by {project.representative} on{" "}
                  {project.submittedDate}
                </CardDescription>
              </div>
              {/*@ts-ignore*/}
              <Badge variant="blue">{project.statusText}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="line-clamp-2">{project.description}</p>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Link href={`/cde/projects/${project.id}`}>
              <Button variant="outline">
                <Eye className="w-4 h-4 mr-1" />
                View Details
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
