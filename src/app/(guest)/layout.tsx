import { requireGuest } from "@/server/auth/require-guest";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coffee House",
  description: "Modern coffee-themed authentication experience",
};

export default async function GuestLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await requireGuest();
  return <>{children}</>;
}
