import { betterAuth } from "better-auth";
import { env } from "./env";
import { hashPassword, verifyHashedPassword } from "@/utils/password-hashing";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import db from "@/server/infra/database/client";
import { ac, manager, owner, staff } from "./permission/permissions";
import { admin } from "better-auth/plugins";
import * as schema from "@/server/infra/database/schemas/index";
import { container } from "@/server/container";
import { userRole } from "@/server/shared/user-role.types";

export const auth = betterAuth({
  baseURL: {
    allowedHosts: [
      "brew-flow-five.vercel.app", // Your strict production domain
      "localhost:3000", // Allows local development to work seamlessly
    ],
    fallback: env.BETTER_AUTH_URL,
    protocol: process.env.NODE_ENV === "development" ? "http" : "https",
  },
  secret: env.BETTER_AUTH_SECRET,
  appName: env.NEXT_PUBLIC_APP_NAME,
  session: {
    expiresIn: 60 * 60 * 12, // 12 hours — session dies after this, no matter what
    updateAge: 60 * 60 * 1, // 1 hour — if user is active, extend expiry by another 12h every 1h
    freshAge: 60 * 15, // 15 minutes — sensitive actions (change password, revoke session, delete account) need a session created within the last 15 min, else blocked
    cookieCache: {
      enabled: true,
      maxAge: 60, // 1 minute — how long session data is cached in the cookie before re-checking the DB (short = faster logout/revocation reflects almost instantly)
    },
  },
  rateLimit: {
    enabled: true,
    window: 60, // 1 minute
    max: 100,
    storage: "database",
    customRules: {
      "/sign-in/email": {
        window: 60,
        max: 5,
      },
      "/sign-up/email": {
        window: 60,
        max: 3,
      },
      "/forget-password": {
        window: 300, // 5 minutes
        max: 3,
      },
      "/reset-password": {
        window: 300,
        max: 5,
      },
    },
  },
  advanced: {
    ipAddress: {
      ipAddressHeaders: ["x-forwarded-for"],
    },
    useSecureCookies: true, // force Secure flag even if NODE_ENV detection ever misfires on Vercel
  },
  database: drizzleAdapter(db, {
    provider: "pg", // Specify the database provider (e.g., "pg" for PostgreSQL)
    usePlural: true, // Use plural table names (e.g., "users" instead of "user")
    schema,
  }),
  user: {
    additionalFields: {
      firstName: {
        type: "string",
        required: true,
      },

      middleName: {
        type: "string",
        required: false,
      },

      lastName: {
        type: "string",
        required: true,
      },

      phoneNumber: {
        type: "string",
        required: false,
      },
    },
  },
  databaseHooks: {
    user: {
      create: {},
    },
  },
  disabledPaths: ["/sign-up/email"],
  emailAndPassword: {
    requireEmailVerification: true,
    enabled: true,
    password: {
      hash: hashPassword,
      verify: verifyHashedPassword,
    },
    sendResetPassword: async ({ user, url }) => {
      await container.emailService.sendPasswordReset({
        email: user.email,
        resetUrl: url,
      });
    },
    resetPasswordTokenExpiresIn: 60 * 60,
    revokeSessionsOnPasswordReset: true,
  },

  plugins: [
    admin({
      ac,
      roles: {
        owner,
        manager,
        staff,
      },
      defaultRole: userRole.Staff, // default role to "staff"
    }),
  ],
});
