"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { TeamMemberForm } from "@/components/team-member-form";

// Define Zod schemas for each step's validation

// Step 1: Project details (Title & Description)
const projectDetailsSchema = z.object({
  title: z.string().nonempty({ message: "Project title is required." }),
  description: z
    .string()
    .nonempty({ message: "Project description is required." }),
});

// Step 2: Team member fields validation
const teamMemberSchema = z.object({
  name: z.string().nonempty({ message: "Name is required." }),
  studentId: z.string().nonempty({ message: "Student ID is required." }),
  email: z.string().email({ message: "A valid email is required." }),
  phone: z.string().nonempty({ message: "Phone is required." }),
});
const teamMembersSchema = z.array(teamMemberSchema);

export default function NewProject() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [projectData, setProjectData] = useState({
    title: "",
    description: "",
    teamMembers: [{ name: "", studentId: "", email: "", phone: "" }],
  });

  const handleProjectInfoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProjectData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    console.log("userid", localStorage.getItem("userId"));

    try {
      // Final submission validation if needed
      const detailsCheck = projectDetailsSchema.safeParse({
        title: projectData.title,
        description: projectData.description,
      });
      const teamCheck = teamMembersSchema.safeParse(projectData.teamMembers);

      if (!detailsCheck.success || !teamCheck.success) {
        console.error("Validation failed before submission.");
        setErrorMessages([
          ...(!detailsCheck.success
            ? detailsCheck.error.issues.map((issue) => issue.message)
            : []),
          ...(!teamCheck.success
            ? teamCheck.error.issues.map((issue) => issue.message)
            : []),
        ]);
        return;
      }

      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          ...projectData,
          userId: localStorage.getItem("userId"),
        }),
      });
      if (!response.ok) {
        console.error("Failed to create project");
        return;
      }

      const result = await response.json();
      console.log("Project created:", result);

      // Redirect to the dashboard upon successful submission
      router.push("/student/dashboard");
    } catch (error) {
      console.error("Error submitting project:", error);
    }
  };

  // Function to validate fields on the current step and move to the next step if valid
  const handleNextStep = () => {
    setErrorMessages([]); // Clear error messages on new attempt

    // Validate based on the current step
    if (currentStep === 1) {
      const result = projectDetailsSchema.safeParse({
        title: projectData.title,
        description: projectData.description,
      });
      if (!result.success) {
        const errors = result.error.issues.map((issue) => issue.message);
        setErrorMessages(errors);
        console.error("Step 1 errors:", errors);
        return;
      }
    } else if (currentStep === 2) {
      const result = teamMembersSchema.safeParse(projectData.teamMembers);
      if (!result.success) {
        const errors = result.error.issues.map((issue) => issue.message);
        setErrorMessages(errors);
        console.error("Step 2 errors:", errors);
        return;
      }
    }

    // If validation passes, go to the next step
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setErrorMessages([]);
    setCurrentStep((prev) => prev - 1);
  };

  return (
    <div className="container py-8 w-full flex justify-center items-center">
      <div className="w-[90%]">
        <h1 className="mb-6 text-3xl font-bold">Submit New Project</h1>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Project Submission</CardTitle>
            <CardDescription>
              Complete all required information to submit your project
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert className="mb-6">
              <AlertCircle className="w-4 h-4" />
              <AlertTitle>Important</AlertTitle>
              <AlertDescription>
                You can modify your project details until the submission
                deadline. After clicking "Submit Project", no further changes
                will be allowed.
              </AlertDescription>
            </Alert>

            {/* Display error messages if any */}
            {errorMessages.length > 0 && (
              <div className="mb-4 p-4 bg-red-100 border border-red-400 rounded">
                <ul className="list-disc pl-5">
                  {errorMessages.map((err, idx) => (
                    <li key={idx} className="text-red-700">
                      {err}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Tabs value={`step-${currentStep}`}>
              <TabsList className="mb-4 grid w-full grid-cols-3">
                <TabsTrigger value="step-1" disabled={currentStep !== 1}>
                  Project Details
                </TabsTrigger>
                <TabsTrigger value="step-2" disabled={currentStep !== 2}>
                  Team Members
                </TabsTrigger>
                <TabsTrigger value="step-3" disabled={currentStep !== 3}>
                  Review & Submit
                </TabsTrigger>
              </TabsList>

              <TabsContent value="step-1">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Project Title</Label>
                    <Input
                      id="title"
                      name="title"
                      value={projectData.title}
                      onChange={handleProjectInfoChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Project Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={projectData.description}
                      onChange={handleProjectInfoChange}
                      rows={5}
                      required
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button onClick={handleNextStep}>Next: Team Members</Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="step-2">
                <TeamMemberForm
                  teamMembers={projectData.teamMembers}
                  setTeamMembers={(members) =>
                    setProjectData((prev) => ({
                      ...prev,
                      teamMembers: members,
                    }))
                  }
                />
                <div className="flex justify-between mt-4">
                  <Button variant="outline" onClick={prevStep}>
                    Back
                  </Button>
                  <Button onClick={handleNextStep}>Next: Review</Button>
                </div>
              </TabsContent>

              <TabsContent value="step-3">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium">Project Details</h3>
                    <div className="mt-2 p-4 border rounded-md">
                      <p>
                        <strong>Title:</strong> {projectData.title}
                      </p>
                      <p className="mt-2">
                        <strong>Description:</strong>
                      </p>
                      <p className="mt-1">{projectData.description}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium">Team Members</h3>
                    <div className="mt-2 p-4 border rounded-md">
                      {projectData.teamMembers.map((member, index) => (
                        <div
                          key={index}
                          className="py-2 border-b last:border-b-0"
                        >
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
                  </div>

                  <Alert variant="destructive">
                    <AlertCircle className="w-4 h-4" />
                    <AlertTitle>Warning</AlertTitle>
                    <AlertDescription>
                      Once you submit your project, you will not be able to make
                      any changes. Please review all information carefully
                      before submitting.
                    </AlertDescription>
                  </Alert>

                  <div className="flex justify-between">
                    <Button variant="outline" onClick={prevStep}>
                      Back
                    </Button>
                    <Button onClick={handleSubmit}>Submit Project</Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
