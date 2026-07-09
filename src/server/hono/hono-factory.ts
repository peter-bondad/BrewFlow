import { Env } from "@/server/hono/hono-types";
import { createFactory } from "hono/factory";

export const factory = createFactory<Env>();
