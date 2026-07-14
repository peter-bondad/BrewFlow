import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Camera, LockKeyhole, Trash2 } from "lucide-react";

export function AccountSettings() {
  return (
    <div className="space-y-8">
      {/* Profile */}
      <Card
        className="
          border-[#d9b07f]/60
          bg-[#fffaf5]
        "
      >
        <CardHeader>
          <CardTitle className="text-[#4a2c1a]">Account Information</CardTitle>

          <CardDescription>
            Update your personal profile details.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Avatar */}
          {/* Profile Header */}
          <div className="flex items-center gap-5">
            <button
              type="button"
              aria-label="Change profile picture"
              className="
      group
      relative
      h-32
      w-32
      cursor-pointer
      overflow-hidden
      rounded-full
      border
      border-[#d9b07f]
      shrink-0
    "
            >
              <Avatar className="h-full w-full">
                <AvatarImage src="" className="object-cover" />

                <AvatarFallback
                  className="
          bg-[#e8c79d]
          text-lg
          text-[#4a2c1a]
        "
                >
                  PB
                </AvatarFallback>
              </Avatar>

              <div
                className="
        absolute
        inset-0
        flex
        items-center
        justify-center
        bg-black/40
        opacity-0
        transition-opacity
        duration-200
        group-hover:opacity-100
      "
              >
                <Camera
                  className="
          h-6
          w-6
          text-white
        "
                />
              </div>
            </button>

            <div className="space-y-1">
              <h3
                className="
        text-xl
        font-semibold
        text-[#4a2c1a]
      "
              >
                Peter Bondad
              </h3>

              <p
                className="
        text-sm
        text-[#8b5e34]
      "
              >
                peter@email.com
              </p>

              <p
                className="
        text-sm
        text-[#a6784d]
      "
              >
                Click your profile picture to update it.
              </p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Full Name</Label>

              <Input defaultValue="Peter Bondad" />
            </div>

            <div className="space-y-2">
              <Label>Email Address</Label>

              <Input defaultValue="peter@email.com" disabled />
            </div>

            <div className="space-y-2">
              <Label>Phone Number</Label>

              <Input placeholder="+63 900 000 0000" />
            </div>
          </div>

          <Button
            className="
              cursor-pointer
              bg-[#8b5e34]
              text-white
              transition-colors
              duration-200
              hover:bg-[#6d451f]
            "
          >
            Save Changes
          </Button>
        </CardContent>
      </Card>

      {/* Password */}
      <Card
        className="
          border-[#d9b07f]/60
          bg-[#fffaf5]
        "
      >
        <CardHeader>
          <CardTitle className="text-[#4a2c1a]">Password</CardTitle>

          <CardDescription>
            Keep your account secure by updating your password.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Button
            variant="outline"
            className="
              cursor-pointer
              border-[#c28b52]
              text-[#6d451f]
              transition-colors
              hover:bg-[#f4e0c8]
            "
          >
            <LockKeyhole className="mr-2 h-4 w-4" />
            Change Password
          </Button>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card
        className="
          border-red-200
          bg-red-50/40
        "
      >
        <CardHeader>
          <CardTitle className="text-red-700">Danger Zone</CardTitle>

          <CardDescription>
            Permanently remove your account and data.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Button
            variant="destructive"
            className="
              cursor-pointer
            "
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Account
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
