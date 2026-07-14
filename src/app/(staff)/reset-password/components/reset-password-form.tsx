"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import authClient from "@/lib/auth-client";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useId, useMemo, useState } from "react";
import { toast } from "sonner";

export function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const passwordId = useId();
  const confirmPasswordId = useId();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  const passwordValid = password.length >= 8;

  const passwordsMatch = useMemo(
    () =>
      password.length > 0 &&
      confirmPassword.length > 0 &&
      password === confirmPassword,
    [password, confirmPassword],
  );

  const canSubmit = !!token && passwordValid && passwordsMatch && !submitting;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!token) {
      toast.error("This password reset link is invalid or has expired.");
      return;
    }

    setSubmitting(true);

    try {
      const { error } = await authClient.resetPassword({
        token,
        newPassword: password,
      });

      if (error) {
        toast.error(
          error.message ??
            "This password reset link is invalid or has expired.",
        );
        return;
      }

      toast.success("Password updated successfully.");

      setTimeout(() => {
        router.replace("/login");
      }, 1000);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!token) {
    return (
      <div className="w-full max-w-md text-center space-y-6">
        <h2 className="text-3xl font-bold text-[#3f2718]">
          Invalid reset link
        </h2>

        <p className="text-sm leading-6 text-[#7b5f46]">
          This password reset link is missing or has expired. Please request a
          new password reset email.
        </p>

        <Link
          href="/forgot-password"
          className="flex h-12 items-center justify-center rounded-full bg-[#6f3e1d] text-[#fff8ef] transition hover:bg-[#8d5a2b]"
        >
          Request another reset link
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="space-y-3">
        <div className="inline-flex rounded-full bg-[#f6ede6] px-3 py-1 text-xs font-medium text-[#6f3e1d]">
          Password Reset
        </div>

        <h2 className="text-3xl font-bold tracking-tight text-[#3f2718]">
          Create a new password
        </h2>

        <p className="text-sm leading-6 text-[#7b5f46]">
          Choose a strong password for your BrewFlow account.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor={passwordId}>New Password</Label>

          <div className="relative">
            <Input
              id={passwordId}
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              value={password}
              disabled={submitting}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 rounded-xl border-[#ddc0a0] bg-[#fffdf9] pr-12"
            />

            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute inset-y-0 right-3 flex items-center text-[#7b5f46] hover:text-[#6f3e1d]"
            >
              {showPassword ? (
                <EyeOff className="size-5" />
              ) : (
                <Eye className="size-5" />
              )}
            </button>
          </div>

          <p className="text-xs text-[#8d725d]">
            Must contain at least 8 characters.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor={confirmPasswordId}>Confirm Password</Label>

          <div className="relative">
            <Input
              id={confirmPasswordId}
              type={showConfirmPassword ? "text" : "password"}
              autoComplete="new-password"
              value={confirmPassword}
              disabled={submitting}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="h-12 rounded-xl border-[#ddc0a0] bg-[#fffdf9] pr-12"
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword((v) => !v)}
              className="absolute inset-y-0 right-3 flex items-center text-[#7b5f46] hover:text-[#6f3e1d]"
            >
              {showConfirmPassword ? (
                <EyeOff className="size-5" />
              ) : (
                <Eye className="size-5" />
              )}
            </button>
          </div>

          {confirmPassword.length > 0 && !passwordsMatch && (
            <p className="text-sm text-red-600">Passwords do not match.</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={!canSubmit}
          className="h-12 w-full rounded-full bg-[#6f3e1d] hover:bg-[#8d5a2b]"
        >
          {submitting && <Loader2 className="mr-2 size-4 animate-spin" />}

          {submitting ? "Updating password..." : "Update Password"}
        </Button>

        <p className="text-center text-sm text-[#7b5f46]">
          Remember your password?{" "}
          <Link
            href="/login"
            className="font-medium text-[#8d5a2b] hover:text-[#6f3e1d]"
          >
            Back to login
          </Link>
        </p>
      </form>
    </div>
  );
}
