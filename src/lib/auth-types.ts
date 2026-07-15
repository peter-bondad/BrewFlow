import type { auth } from "./auth";

export type Auth = typeof auth; // full better auth config
export type AuthSession = typeof auth.$Infer.Session; // access to user and session property
export type UserAuth = AuthSession["user"]; // access specifically to user only
