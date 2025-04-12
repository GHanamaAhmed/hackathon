"use client";

import { UserProfile } from "@clerk/nextjs";
import { ArrowLeft } from "lucide-react";

export default function Page() {
  return (
    <UserProfile
      appearance={{
        elements: {
          card: {
            boxShadow: "none",
            width: "100%",
            maxWidth: "100%",
          },
          rootBox: {
            width: "100%",
          },
          navbar: {
            borderRight: "none",
          },
        },
      }}
    >
      <UserProfile.Link
        label="Return to App"
        url="/dashboard"
        labelIcon={
          <div className="h-full flex justify-center items-center">
            <ArrowLeft className="size-4" />
          </div>
        }
      />
    </UserProfile>
  );
}
