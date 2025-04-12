"use client";
import { useClerk } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function VerifyEmailLink() {
  const { handleEmailLinkVerification } = useClerk();
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const verify = async () => {
      try {
        await handleEmailLinkVerification({
          redirectUrl: "/dashboard", // Redirect after successful verification
        });
        setStatus("verified");
      } catch (err) {
        console.error("Verification error:", err);
        setStatus("failed");
      }
    };

    verify();
  }, [handleEmailLinkVerification]);

  if (status === "loading") return <p>Verifying...</p>;
  if (status === "verified") return <p>Email verified! Redirecting...</p>;
  return <p>Verification failed. Please try again.</p>;
}
