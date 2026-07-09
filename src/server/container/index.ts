import { InvitationRepository } from "../features/invitation/invitation.repository";
import { InvitationService } from "../features/invitation/invitation.service";
import db from "../infra/database/client";

const invitationRepository = new InvitationRepository(db);

const invitationService = new InvitationService(invitationRepository);

export const container = {
  invitationService,
};
