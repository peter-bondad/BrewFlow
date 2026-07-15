import { eq } from "drizzle-orm";

import { auth } from "@/lib/auth";
import { env } from "@/lib/env";
import db from "./client";
import { users } from "./schemas";

async function seedProductionOwner() {
  const email = env.ADMIN_EMAIL;
  const password = env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD must be configured.");
  }

  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (existingUser) {
    if (existingUser.role !== "owner") {
      await db
        .update(users)
        .set({
          role: "owner",
          emailVerified: true,
        })
        .where(eq(users.id, existingUser.id));

      console.log(`Promoted "${email}" to owner.`);
    } else {
      console.log(`Owner already exists: ${email}`);
    }

    return;
  }

  const result = await auth.api.signUpEmail({
    body: {
      name: "System Owner",
      firstName: "System",
      lastName: "Owner",
      email,
      password,
    },
  });

  if (!result?.user) {
    throw new Error("Failed to create production owner account.");
  }

  await db
    .update(users)
    .set({
      role: "owner",
      emailVerified: true,
    })
    .where(eq(users.id, result.user.id));

  console.log(`Production owner created: ${email}`);
}

async function main() {
  await seedProductionOwner();

  console.log("Production seed completed.");
}

main().catch((error) => {
  console.error("Production seed failed.");
  console.error(error);
  process.exit(1);
});
