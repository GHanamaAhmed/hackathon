"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectList } from "@/components/project-list";
import { Moon, Sun } from "lucide-react";

export default function StudentDashboard() {
  const [hasProjects, setHasProjects] = useState(false);
  const [projects, setProjects] = useState([]);
  const [theme, setTheme] = useState("");

  const toggleTheme = () => {
    // Toggle between "dark" and empty string
    const newTheme = localStorage.getItem("theme") === "dark" ? "" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    // Update the DOM to reflect the new theme
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };
  // Fetch projects from the server
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // userid
        const userid = localStorage.getItem("userId");
        const response = await fetch("/api/projects/" + userid, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }

        const data = await response.json();
        setProjects(data);
        setHasProjects(data.length > 0);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="container py-8 w-full flex justify-center items-center">
      <div className="w-[90%]">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Student Dashboard</h1>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
            >
              {theme === "dark" ? (
                <Sun className="size-[18px]" />
              ) : (
                <Moon className="size-[18px]" />
              )}
            </Button>
            <Link href="/">
              <Button variant="ghost">Sign Out</Button>
            </Link>
          </div>
        </div>

        <Tabs defaultValue="projects">
          <TabsList className="mb-4">
            <TabsTrigger value="projects">My Projects</TabsTrigger>
            <TabsTrigger value="new">New Project</TabsTrigger>
          </TabsList>

          <TabsContent value="projects">
            {hasProjects ? (
              <ProjectList projects={projects} />
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>No Projects Found</CardTitle>
                  <CardDescription>
                    You haven't submitted any projects yet.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/student/dashboard?tab=new">
                    <Button>Create Your First Project</Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="new">
            <Card>
              <CardHeader>
                <CardTitle>Submit New Project</CardTitle>
                <CardDescription>
                  Fill in the details for your new project submission
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/student/projects/new">
                  <Button>Start New Submission</Button>
                </Link>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
