"use client";

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
import { Clock, Edit, Eye } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  submittedDate: string;
  status: string;
  statusText: string;
}

interface ProjectListProps {
  projects: Project[];
}

export function ProjectList({ projects }: ProjectListProps) {
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

  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <Card key={project.id}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>
                  Submitted on {project.submittedDate}
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
          <CardFooter className="flex justify-between">
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="w-4 h-4 mr-1" />
              <span>Last updated: {project.submittedDate}</span>
            </div>
            <div className="flex gap-2">
              {project.status !== "routed" && project.status !== "rejected" && (
                <Link href={`/student/projects/${project.id}/edit`}>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                </Link>
              )}
              <Link href={`/student/projects/${project.id}`}>
                <Button size="sm">
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </Button>
              </Link>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
