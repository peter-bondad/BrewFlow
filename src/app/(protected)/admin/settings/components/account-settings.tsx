import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getSession } from "@/server/auth/get-session";
import { Camera, LockKeyhole, Trash2 } from "lucide-react";

export async function AccountSettings() {
  const session = await getSession();

  if (!session) return null;

  const user = session.user; // already check in the authlayout so no need to check
  const canDeleteAccount = true; // TODO: Replace with role check

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <Card className="overflow-hidden rounded-3xl border-[#e3c7a4] bg-[#fffaf5] shadow-sm">
        <CardHeader className="space-y-2 border-b border-[#f1dfca] bg-[#fff5ea] px-6 py-5">
          <CardTitle className="text-[#4a2c1a]">Account Information</CardTitle>

          <CardDescription>
            Update your profile information and keep your account secure.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 p-6">
          {/* Profile */}
          <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:items-center sm:text-left">
            <button
              type="button"
              aria-label="Change profile picture"
              className="
                group
                relative
                h-28
                w-28
                shrink-0
                cursor-pointer
                overflow-hidden
                rounded-full
                border-4
                border-[#f3dcc0]
                shadow-lg
                transition-transform
                duration-200
                hover:scale-[1.03]
              "
            >
              <Avatar className="h-full w-full">
                <AvatarImage src={user.image ?? undefined} />

                <AvatarFallback className="bg-[#e8c79d] text-xl font-semibold text-[#4a2c1a]">
                  {user.name
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="absolute inset-0 flex items-center justify-center bg-[#4a2b1c]/60 opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100">
                <Camera className="h-6 w-6 text-white" />
              </div>
            </button>

            <div className="space-y-1">
              <h3 className="text-2xl font-semibold text-[#4a2c1a]">
                {user.name}
              </h3>

              <p className="text-[#7b5f46]">{user.email}</p>

              <p className="text-sm text-[#a6784d]">
                Click your profile picture to upload a new one.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="grid gap-5 md:grid-cols-2">
            {/* Full Name */}
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input defaultValue={user.name} />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label>Email Address</Label>
              <Input defaultValue={user.email} disabled />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label>Phone Number</Label>
              <Input placeholder="+63 900 000 0000" />
            </div>

            {/* Password */}
            <div className="rounded-xl border border-[#ead5bb] bg-[#fff7ee] p-4">
              <div className="flex h-full items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-[#f4e2cd] p-2">
                    <LockKeyhole className="h-4 w-4 text-[#8b5e34]" />
                  </div>

                  <div>
                    <p className="font-medium text-[#4a2c1a]">Password</p>
                    <p className="text-xs text-[#8b5e34]">
                      Last changed: Never
                    </p>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="cursor-pointer rounded-full border-[#c28b52] text-[#6d451f] hover:bg-[#f4e2cd]"
                >
                  Change
                </Button>
              </div>
            </div>
          </div>

          {/* Save */}
          <div className="flex justify-end">
            <Button
              className="
                cursor-pointer
                rounded-full
                bg-[#6f3e1d]
                px-7
                text-[#fff8ef]
                shadow-[0_12px_24px_-16px_rgba(74,43,28,0.9)]
                hover:bg-[#8d5a2b]
              "
            >
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>

      {canDeleteAccount && (
        <Card className="overflow-hidden rounded-3xl border border-red-200 bg-[#fff7f6] shadow-sm">
          <CardHeader className="border-b border-red-100">
            <CardTitle className="text-red-700">Danger Zone</CardTitle>

            <CardDescription>
              Permanently delete your BrewFlow account and all associated data.
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col gap-5 p-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-medium text-[#4a2c1a]">Delete your account</p>

              <p className="mt-1 text-sm text-[#7b5f46]">
                This action cannot be undone.
              </p>
            </div>

            <Button
              variant="destructive"
              className="cursor-pointer rounded-full"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Account
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
