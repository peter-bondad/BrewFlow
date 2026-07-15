// src/server/auth/require-permission.ts
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { Permission } from "@/lib/permission/permissions";
import { requireSession } from "./require-session";

// this is for client side checks of session before permission.
// will use in ui for ui role-based authorization
export async function requirePermission(permissions: Permission) {
  const session = await requireSession();

  const result = await auth.api.userHasPermission({
    body: {
      userId: session.user.id,
      permissions,
    },
  });

  if (!result.success) {
    redirect("/forbidden");
  }

  return session;
}
