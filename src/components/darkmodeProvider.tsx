"use client";
import useDarkMode from "@/hooks/darknode";
import React from "react";

export default function DarkmodeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useDarkMode();
  return <>{children}</>;
}
