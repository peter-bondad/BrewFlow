import { eq } from "drizzle-orm";
import db from "./client";
import { auth } from "@/lib/auth";
import { users } from "./schemas";
import { env } from "@/lib/env";

async function seedAdmin() {
  const email = env.ADMIN_EMAIL;
  const password = env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD are required.");
  }

  const existingOwner = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (existingOwner) {
    if (existingOwner.role !== "owner") {
      await db
        .update(users)
        .set({ role: "owner" })
        .where(eq(users.id, existingOwner.id));

      console.log("Existing user promoted to owner");
    } else {
      console.log("Admin already exists");
    }

    return;
  }

  const result = await auth.api.signUpEmail({
    body: {
      name: "System Admin",
      firstName: "System",
      lastName: "Admin",
      email,
      password,
    },
  });

  if (!result?.user) {
    throw new Error("Failed to create owner account.");
  }

  const userId = result.user.id;

  await db
    .update(users)
    .set({
      role: "owner",
    })
    .where(eq(users.id, userId));

  console.log(`Owner ready: ${email}`);
}

seedAdmin()
  .then(() => {
    console.log("Seed completed");
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
