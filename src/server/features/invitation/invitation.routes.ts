import { Hono } from "hono";
import { createInvitationController } from "./invitation.controller";

const invitationRoutes = new Hono()

  // User Invitation Endpoint
  .post("/", ...createInvitationController);

export default invitationRoutes;
