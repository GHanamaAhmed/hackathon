"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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

type AdminProjectListProps = {
  filter: string;
};

export function AdminProjectList({ filter }: AdminProjectListProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "submitted":
        return "default";
      case "processing":
        return "blue";
      case "routed":
        return "green";
      case "rejected":
        return "destructive";
      default:
        return "default";
    }
  };

  useEffect(() => {
    async function fetchProjects() {
      setIsLoading(true);
      setError(null);
      // Build query parameter if filter is not "all"
      let url = "/api/admin/projects";
      if (filter !== "all") {
        url += `?status=${filter}`;
      }
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
        const data = await response.json();
        setProjects(data);
      } catch (err: any) {
        console.error("Error fetching projects:", err);
        setError("Failed to load projects.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchProjects();
  }, [filter]);

  if (isLoading) {
    return <p>Loading projects...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="space-y-4">
      {projects.length === 0 ? (
        <Card>
          <CardContent className="flex items-center justify-center p-6">
            <p className="text-muted-foreground">
              No projects found with this status.
            </p>
          </CardContent>
        </Card>
      ) : (
        projects.map((project) => (
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
                <Badge variant={getStatusColor(project.status)}>
                  {project.statusText}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="line-clamp-2">{project.description}</p>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Link href={`/admin/projects/${project.id}`}>
                <Button>
                  <Eye className="w-4 h-4 mr-1" />
                  View Details
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))
      )}
    </div>
  );
}
