"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye } from "lucide-react"

// Mock data - in a real app, you would fetch this from your API
const mockProjects = [
  {
    id: "1",
    title: "Smart Campus Navigation System",
    description:
      "A mobile application that helps students navigate around campus, find classrooms, and get information about facilities.",
    submittedDate: "2023-04-10",
    status: "submitted",
    statusText: "Submitted",
    representative: "John Doe",
  },
  {
    id: "2",
    title: "Student Collaboration Platform",
    description:
      "An online platform for students to find project partners, collaborate on assignments, and share resources.",
    submittedDate: "2023-04-08",
    status: "processing",
    statusText: "Under Process",
    representative: "Jane Smith",
  },
  {
    id: "3",
    title: "Campus Event Management System",
    description: "A system to manage and promote campus events, handle registrations, and collect feedback.",
    submittedDate: "2023-04-05",
    status: "routed",
    statusText: "Routed to Interface 2",
    representative: "Alex Johnson",
  },
  {
    id: "4",
    title: "Academic Resource Sharing",
    description: "A platform for students to share academic resources, notes, and study materials.",
    submittedDate: "2023-04-03",
    status: "rejected",
    statusText: "Rejected",
    representative: "Sam Wilson",
  },
]

type AdminProjectListProps = {
  filter: string
}

export function AdminProjectList({ filter }: AdminProjectListProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "submitted":
        return "default"
      case "processing":
        return "blue"
      case "routed":
        return "green"
      case "rejected":
        return "destructive"
      default:
        return "default"
    }
  }

  const filteredProjects = filter === "all" ? mockProjects : mockProjects.filter((project) => project.status === filter)

  return (
    <div className="space-y-4">
      {filteredProjects.length === 0 ? (
        <Card>
          <CardContent className="flex items-center justify-center p-6">
            <p className="text-muted-foreground">No projects found with this status.</p>
          </CardContent>
        </Card>
      ) : (
        filteredProjects.map((project) => (
          <Card key={project.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>
                    Submitted by {project.representative} on {project.submittedDate}
                  </CardDescription>
                </div>
                <Badge variant={getStatusColor(project.status)}>{project.statusText}</Badge>
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
  )
}
