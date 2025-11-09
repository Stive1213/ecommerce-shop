"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/lib/store/authSlice";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import Cookies from "js-cookie";
import { RootState } from "@/lib/store";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

function LoginForm() {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isAuthenticated = useSelector((s: RootState) => s.auth.isAuthenticated);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    if (isAuthenticated) {
      const redirect = searchParams.get("redirect");
      router.replace(redirect || "/");
    }
  }, [isAuthenticated, router, searchParams]);

  const onSubmit = async (data: LoginFormData) => {
    try {
      if (data.password !== "password123") {
        toast({
          title: "Invalid credentials",
          description: "Use password: password123",
          variant: "destructive",
        });
        return;
      }

      await new Promise((r) => setTimeout(r, 800));

      dispatch(login({ email: data.email }));
      Cookies.set("mock-auth", "true", { expires: 7 });

      toast({
        title: "Logged in!",
        description: `Welcome back, ${data.email.split("@")[0]}!`,
      });

      const redirect = searchParams.get("redirect");
      router.push(redirect || "/");
    } catch (err) {
      toast({
        title: "Error",
        description: "Something went wrong.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-md shadow-xl">
      <CardHeader className="text-center space-y-2">
        <CardTitle className="text-2xl font-bold">Login</CardTitle>
        <p className="text-sm text-muted-foreground">
          Use any email + password:{" "}
          <code className="font-mono bg-muted px-1 rounded">password123</code>
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              {...register("email")}
              disabled={isSubmitting}
              className={errors.email ? "border-destructive" : ""}
            />
            {errors.email && (
              <p className="text-sm text-destructive mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register("password")}
              disabled={isSubmitting}
              className={errors.password ? "border-destructive" : ""}
            />
            {errors.password && (
              <p className="text-sm text-destructive mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </form>

        <p className="text-xs text-muted-foreground text-center mt-6">
          This is a mock login. Any valid email works.
        </p>
      </CardContent>
    </Card>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <LoginForm />
    </div>
  );
}
