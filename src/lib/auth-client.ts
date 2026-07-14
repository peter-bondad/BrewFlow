import { createAuthClient } from "better-auth/client";
import { adminClient } from "better-auth/client/plugins";
import { ac, owner, manager, staff } from "./permission/permissions";

const authClient = createAuthClient({
  plugins: [
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
