"use client";

import * as React from "react";
import { useState, useEffect } from "react";
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

// Function to map UI status strings to enum values (ProjectState)
function mapStatusToEnum(status: string): string {
  switch (status) {
    case "submitted":
      return "SENT";
    case "processing":
      return "PROCESSING";
    case "routed":
      return "ROUTED_TO_UI";
    case "rejected":
      return "REJECTED";
    default:
      return status;
  }
}

// Unwrap the params promise using React.use()
export default function ProjectDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Unwrap asynchronous params with React.use()
  const resolvedParams = React.use(params);
  const { id } = resolvedParams;

  const router = useRouter();
  const [status, setStatus] = useState("submitted");
  const [interface_, setInterface] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isRouted, setIsRouted] = useState(false);

  // State for fetched project details
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

  const handleStatusChange = (value: string) => {
    setStatus(value);
    if (value !== "routed") {
      setInterface("");
    }
  };

  // Save changes to backend using the mapped enum value for status.
  // If status is routed then include the interface number.
  const handleSave = async () => {
    try {
      const payload: any = {
        status: mapStatusToEnum(status),
        feedback,
      };
      if (status === "routed" && interface_) {
        payload.interfaceNo = interface_;
      }
      const res = await fetch(`/api/admin/projects/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        throw new Error("Failed to update project");
      }
      router.push("/admin/dashboard");
    } catch (error) {
      console.error(error);
      setError("Failed to update project.");
    }
  };

  const handleConfirmRouting = () => {
    setIsRouted(true);
  };

  if (loading) return <p>Loading project details...</p>;
  if (error) return <p>{error}</p>;
  if (!project) return <p>No project found.</p>;

  return (
    <div className="container py-8 flex justify-center items-center">
      <div className="w-[90%]">
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
                  {project.state} on{" "}
                  {new Date(
                    project.createdAt || project.updateAt
                  ).toLocaleDateString()}
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
                    <Label htmlFor="interface">
                      Route To (Interface Number)
                    </Label>
                    <Select
                      value={interface_}
                      onValueChange={setInterface}
                      disabled={isRouted}
                    >
                      <SelectTrigger id="interface">
                        <SelectValue placeholder="Select interface" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Incabator</SelectItem>
                        <SelectItem value="2">Cde</SelectItem>
                        <SelectItem value="3">Cati 3</SelectItem>
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
                      {interface_ === "1"
                        ? "Interface 1"
                        : interface_ === "2"
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
                  <Button variant="destructive" onClick={handleSave}>
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
    </div>
  );
}
