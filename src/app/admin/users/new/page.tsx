import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { InviteUserForm } from "./components/InviteUserForm";

export default async function NewAdminUserPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const canCreateInvite = await auth.api.userHasPermission({
    body: {
      userId: session.user.id,
      permissions: {
        invitation: ["create"],
      },
    },
  });

  if (!canCreateInvite.success) {
    return (
      <main className="min-h-screen bg-[#fffaf5] px-6 py-10 text-[#3d2413]">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#8d5a2b]">
            Coffee Admin
          </p>

          <h1 className="mt-3 text-3xl font-semibold">Access denied</h1>

          <p className="mt-3 text-[#7b5f46]">
            Your account does not have permission to create invites.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fffaf5] px-6 py-10 text-[#3d2413]">
      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1fr_420px]">
        <section>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#8d5a2b]">
            Coffee Admin
          </p>
          <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">
            Invite a new user
          </h1>
          <p className="mt-3 max-w-2xl leading-relaxed text-[#7b5f46]">
            Create a one-use setup link for a new account. For now, the invite
            link is printed in the server console instead of being emailed.
          </p>
        </section>

        <section className="rounded-lg border border-[#ddc0a0] bg-white p-5 shadow-sm">
          <InviteUserForm />
        </section>
      </div>
    </main>
  );
}
