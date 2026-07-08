import { auth } from "@/lib/auth";
import type { Context, Next } from "hono";
import type { Env } from "@/server/types/hono-types";

export function requirePermission(permissions: Record<string, string[]>) {
  return async (c: Context<Env>, next: Next) => {
    const user = c.get("user");

    if (!user) {
      return c.json({ message: "Unauthorized" }, 401);
    }

    const result = await auth.api.userHasPermission({
      body: {
        userId: user.id,
        permissions,
      },
    });

    if (!result.success) {
      return c.json({ message: "Forbidden" }, 403);
    }

    await next();
  };
}
