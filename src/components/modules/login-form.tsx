"use client";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/templates/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/templates/ui/card";
import { Input } from "@/components/templates/ui/input";
import { Label } from "@/components/templates/ui/label";

type IAuthTypes = "login" | "signup";

interface Props {
  title: string;
  description: string;
  type: IAuthTypes;
}

export function AuthForm({ title, description, type }: Props) {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function onSubmit() {
    if (!email) {
      alert("Please enter an email");
      return;
    }

    // Make a request to set the email cookie on the server
    await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    // Redirect to dashboard after login
    router.push("/dashboard");
  }

  return (
    <Card className="mx-auto  max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>{description} </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full" onClick={onSubmit}>
            {type === "login" ? "Login" : "Sign up"}
          </Button>
        </div>
        {type === "login" && (
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{""}
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
