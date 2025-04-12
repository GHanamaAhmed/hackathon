"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, Loader2 } from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { AuthData, AuthError } from "@/types/auth";

// Zod schema for username and password.
const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginSchema = z.infer<typeof loginSchema>;

export function SignInForm() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Initialize react-hook-form with Zod for validation
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // onSubmit now receives valid data from the form
  const onSubmit = async (data: LoginSchema) => {
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const responseData: {
        data: AuthData | AuthError;
      } = await res.json();

      if (!res.ok) {
        //@ts-ignore
        setError(responseData.data.error || "Something went wrong");
        return;
      }
      //@ts-ignore
      // set all the data in local storage
      localStorage.setItem("expirationDate", responseData.data.expirationDate);
      //@ts-ignore
      localStorage.setItem("token", responseData.data.token);
      //@ts-ignore
      localStorage.setItem("userId", responseData.data.userId);
      //@ts-ignore
      localStorage.setItem("uuid", responseData.data.uuid);
      //@ts-ignore
      localStorage.setItem("idIndividu", responseData.data.idIndividu);
      localStorage.setItem(
        "etablissementId",
        //@ts-ignore
        responseData.data.etablissementId
      );
      //@ts-ignore
      localStorage.setItem("userName", responseData.data.userName);

      router.push("/student/dashboard");
    } catch (err) {
      console.error("Login failed:", err);
      setError("Failed to log in");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid gap-6">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign In
          </Button>
        </form>
      </Form>
    </div>
  );
}
