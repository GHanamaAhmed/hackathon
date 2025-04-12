"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, ArrowLeft, CheckCircle } from "lucide-react";

export default async function ProjectDetails({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [status, setStatus] = useState("submitted");
  const [interface_, setInterface] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isRouted, setIsRouted] = useState(false);

  // Mock project data - in a real app, you would fetch this from your API
  const project = {
    id: params.id,
    title: "Smart Campus Navigation System",
    description:
      "A mobile application that helps students navigate around campus, find classrooms, and get information about facilities.",
    submittedDate: "2023-04-10",
    status: "submitted",
    teamMembers: [
      {
        name: "John Doe",
        studentId: "ST12345",
        email: "john.doe@university.edu",
        phone: "123-456-7890",
      },
      {
        name: "Jane Smith",
        studentId: "ST12346",
        email: "jane.smith@university.edu",
        phone: "123-456-7891",
      },
    ],
  };

  const handleStatusChange = (value: string) => {
    setStatus(value);
    if (value !== "routed") {
      setInterface("");
    }
  };

  const handleSave = () => {
    // In a real app, you would save to a backend
    // For demo purposes, we'll just go back to the dashboard
    router.push("/admin/dashboard");
  };

  const handleConfirmRouting = () => {
    setIsRouted(true);
  };

  return (
    <div className="container py-8">
      <Button
        variant="ghost"
        className="mb-6"
        onClick={() => router.push("/admin/dashboard")}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Dashboard
      </Button>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
              <CardDescription>
                Submitted on {project.submittedDate}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="mb-2 text-lg font-medium">
                  Project Description
                </h3>
                <p>{project.description}</p>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-medium">Team Members</h3>
                {project.teamMembers.map((member, index) => (
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

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Project Status</CardTitle>
              <CardDescription>
                Update the status of this project
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={status}
                  onValueChange={handleStatusChange}
                  disabled={isRouted}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="submitted">Submitted</SelectItem>
                    <SelectItem value="processing">Under Process</SelectItem>
                    <SelectItem value="routed">Routed</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {status === "routed" && (
                <div className="space-y-2">
                  <Label htmlFor="interface">Route To</Label>
                  <Select
                    value={interface_}
                    onValueChange={setInterface}
                    disabled={isRouted}
                  >
                    <SelectTrigger id="interface">
                      <SelectValue placeholder="Select interface" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="interface1">Interface 1</SelectItem>
                      <SelectItem value="interface2">Interface 2</SelectItem>
                      <SelectItem value="interface3">Interface 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="feedback">Feedback/Notes</Label>
                <Textarea
                  id="feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows={4}
                  disabled={isRouted}
                />
              </div>

              {isRouted ? (
                <Alert>
                  <CheckCircle className="w-4 h-4" />
                  <AlertTitle>Routing Confirmed</AlertTitle>
                  <AlertDescription>
                    This project has been routed to{" "}
                    {interface_ === "interface1"
                      ? "Interface 1"
                      : interface_ === "interface2"
                      ? "Interface 2"
                      : "Interface 3"}{" "}
                    and can no longer be modified.
                  </AlertDescription>
                </Alert>
              ) : status === "routed" && interface_ ? (
                <Alert variant="destructive">
                  <AlertCircle className="w-4 h-4" />
                  <AlertTitle>Warning</AlertTitle>
                  <AlertDescription>
                    Once you confirm routing, it cannot be changed. Please
                    ensure all information is correct.
                  </AlertDescription>
                </Alert>
              ) : null}
            </CardContent>
            <CardFooter className="flex justify-between">
              {status === "routed" && interface_ && !isRouted ? (
                <Button variant="destructive" onClick={handleConfirmRouting}>
                  Confirm Routing
                </Button>
              ) : (
                <Button onClick={handleSave} disabled={isRouted}>
                  Save Changes
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
