import {
  createInvitationExpiry,
  createInvitationToken,
  createInvitationUrl,
  hashInvitationToken,
} from "@/utils/invitations";
import { InvitationAlreadyExistsError } from "./invitation.error";
import {
  CreateInvitationInput,
  CreateInvitationResult,
  InvitationIRepository,
} from "./invitation.interface";

export class InvitationService {
  constructor(private readonly invitationIRepository: InvitationIRepository) {}

  async createInvitation(
    userId: string, // user authenticated
    input: CreateInvitationInput,
  ): Promise<CreateInvitationResult> {
    const existingInvitationEmail =
      await this.invitationIRepository.getPendingByEmail(input.email);

    if (existingInvitationEmail) {
      throw new InvitationAlreadyExistsError();
    }

    const invitationToken = createInvitationToken();
    const hashedInvitationToken = hashInvitationToken(invitationToken);
    const invitationExpire = createInvitationExpiry();
    await this.invitationIRepository.create({
      email: input.email,
      name: input.name,
      role: input.role,
      tokenHash: hashedInvitationToken,
      createdBy: userId,
      expiresAt: invitationExpire,
    });

    const invitationUrl = createInvitationUrl(invitationToken);
    return {
      invitationUrl,
      token: invitationToken,
      expiresAt: invitationExpire,
    };
  }
}
