import { eq } from "drizzle-orm";

import { auth } from "@/lib/auth";
import { env } from "@/lib/env";
import db from "./client";
import { users } from "./schemas";

async function seedOwner() {
  const email = env.ADMIN_EMAIL;
  const password = env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD must be configured.");
  }

  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (existingUser) {
    if (existingUser.role !== "owner" || !existingUser.emailVerified) {
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
      email,
      password,
      name: "System Owner",
      firstName: "System",
      middleName: undefined,
      lastName: "Owner",

      phoneNumber: undefined,
    },
  });

  if (!result?.user) {
    throw new Error("Failed to create owner account.");
  }

  await db
    .update(users)
    .set({
      role: "owner",
      emailVerified: true,
    })
    .where(eq(users.id, result.user.id));

  console.log(`Owner created: ${email}`);
}

async function main() {
  await seedOwner();

  console.log("Seed completed.");
}

main().catch((error) => {
  console.error("Seed failed.");
  console.error(error);
  process.exit(1);
});
