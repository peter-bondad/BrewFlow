import type { Context } from "hono";
import {
  ApplicationError,
  ValidationError,
} from "@/server/shared/application.error";

export function appErrorHandler(error: Error, c: Context) {
  if (error instanceof ApplicationError) {
    return c.json(
      {
        code: error.code,
        message: error.message,
      },
      error.status,
    );
  }

  if (error instanceof ValidationError) {
    return c.json(
      {
        code: error.code,
        message: error.message,
        errors: error.errors,
      },
      error.status,
    );
  }

  console.error(error);

  return c.json(
    {
      code: "INTERNAL_SERVER_ERROR",
      message: "Something went wrong.",
    },
    500,
  );
}
