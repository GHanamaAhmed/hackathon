"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type StatusProps = {
  status: string
  routedTo?: string
}

export function ProjectStatus({ status, routedTo }: StatusProps) {
  const getStatusDetails = () => {
    switch (status) {
      case "submitted":
        return {
          title: "Submitted",
          description: "Your project has been submitted and is awaiting review.",
          color: "default",
        }
      case "processing":
        return {
          title: "Under Process",
          description: "Your project is currently being reviewed by the administrators.",
          color: "blue",
        }
      case "routed":
        return {
          title: `Routed to ${routedTo || "Interface"}`,
          description: "Your project has been routed to the next stage of the process.",
          color: "green",
        }
      case "rejected":
        return {
          title: "Rejected",
          description: "Your project has been rejected. Please check the feedback for more information.",
          color: "destructive",
        }
      default:
        return {
          title: "Unknown",
          description: "The status of your project is unknown.",
          color: "default",
        }
    }
  }

  const details = getStatusDetails()

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Project Status</CardTitle>
          <Badge variant={details.color as any}>{details.title}</Badge>
        </div>
        <CardDescription>{details.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between">
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${status !== "rejected" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
            >
              1
            </div>
            <p className="mt-2 text-sm">Submitted</p>
          </div>
          <div className="flex-1 h-1 mt-4 bg-muted">
            <div className={`h-1 ${status === "submitted" ? "w-0" : "w-full"} bg-primary transition-all`}></div>
          </div>
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${(status === "processing" || status === "routed") && status !== "rejected" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
            >
              2
            </div>
            <p className="mt-2 text-sm">Processing</p>
          </div>
          <div className="flex-1 h-1 mt-4 bg-muted">
            <div
              className={`h-1 ${status === "submitted" || status === "processing" ? "w-0" : "w-full"} bg-primary transition-all`}
            ></div>
          </div>
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${status === "routed" && status !== "rejected" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
            >
              3
            </div>
            <p className="mt-2 text-sm">Routed</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
