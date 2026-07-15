import { createAuthClient } from "better-auth/client";
import { adminClient, inferAdditionalFields } from "better-auth/client/plugins";
import { ac, owner, manager, staff } from "./permission/permissions";
import { Auth } from "./auth-types";

const authClient = createAuthClient({
  plugins: [
    inferAdditionalFields<Auth>(),
    adminClient({
      ac,
      roles: {
        owner,
        manager,
        staff,
      },
    }),
  ],
});
export default authClient;
