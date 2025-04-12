"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// Use the incubator project list—make sure it exists under the inc folder.
import { IncProjectList } from "@/components/inc-project-list";
import { DownloadIcon, LogOut, FileText } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

export default function IncDashboard() {
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [pdfBase64, setPdfBase64] = useState("");
  const [projectCount, setProjectCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await fetch("/api/inc/dashboard");
        const data = await response.json();
        setProjectCount(data.totalCount);
        setPendingCount(data.pendingCount);
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchCounts();
  }, []);

  // Reads the selected file as Base64
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPdfBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to send incubator program via API
  const handleSendProgram = async () => {
    if (!subject || !message || !pdfBase64) {
      alert("Please fill in subject, message, and select a PDF file.");
      return;
    }
    setSending(true);
    setSendError(null);
    try {
      const res = await fetch(`/api/inc/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject,
          message,
          pdf: pdfBase64,
        }),
      });
      if (!res.ok) {
        throw new Error("Failed to send incubator program via email.");
      }
      alert("Incubator program PDF sent successfully via email.");
      // Reset form fields
      setSubject("");
      setMessage("");
      setPdfBase64("");
    } catch (error: any) {
      console.error(error);
      setSendError("Failed to send incubator program.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="container py-8 w-full flex justify-center items-center">
      <div className="w-[90%]">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Interface Incubator</h1>
            <p className="text-muted-foreground">Business Incubator</p>
          </div>
          <div className="flex gap-2">
            <Link href="/">
              <Button variant="ghost">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-6 mb-8 md:grid-cols-3">
          {/* Assigned Projects Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Assigned Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{projectCount}</p>
            </CardContent>
          </Card>

          {/* Card for Downloading Projects */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Download Business Incubator Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                The incubator manager can, through their account, download
                projects in CSV/Excel format.
              </p>
              <Button className="w-full">
                <DownloadIcon className="w-4 h-4 mr-2" />
                Download CSV/Excel
              </Button>
            </CardContent>
          </Card>

          {/* Card for Sending Incubator Program via Popup */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Send Incubator Program</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Send the incubator program and dates to the project holders in
                PDF format via email.
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <FileText className="w-4 h-4 mr-2" />
                    Send Incubator Program PDF
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Send Incubator Program</DialogTitle>
                    <DialogDescription>
                      Fill in the details below to send the incubator program.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-2 mb-4">
                    <Input
                      type="text"
                      placeholder="Subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full"
                    />
                    <Textarea
                      placeholder="Message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full"
                    />
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={handleFileChange}
                      className="file-input"
                    />
                  </div>
                  <DialogFooter>
                    <Button onClick={handleSendProgram} disabled={sending}>
                      {sending ? "Sending..." : "Send Program"}
                    </Button>
                  </DialogFooter>
                  {sendError && (
                    <p className="text-red-500 mt-2">{sendError}</p>
                  )}
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </div>

        {/* Tabs: Only Assigned Projects are shown */}
        <Tabs defaultValue="projects">
          <TabsList className="mb-4">
            <TabsTrigger value="projects">Assigned Projects</TabsTrigger>
          </TabsList>
          <TabsContent value="projects">
            <IncProjectList filter="projects" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
