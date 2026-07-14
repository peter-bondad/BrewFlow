import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { RadioGroup } from "@base-ui/react";
import { Switch } from "@/components/ui/switch";

export function AppearanceSettings() {
  return (
    <div className="space-y-6">
      {/* Theme */}
      <Card
        className="
          border-[#d9b07f]/70
          bg-[#fffaf5]
          shadow-sm
        "
      >
        <CardHeader>
          <CardTitle className="text-[#4a2c1a]">Theme</CardTitle>

          <CardDescription>
            Choose how BrewFlow looks on your device.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <RadioGroup defaultValue="light" className="space-y-3">
            <div
              className="
                flex
                items-center
                gap-3
                rounded-lg
                border
                border-[#d9b07f]/60
                bg-white
                p-4
              "
            >
              <RadioGroupItem value="light" id="light" />

              <Label
                htmlFor="light"
                className="
                  cursor-pointer
                  text-[#4a2c1a]
                "
              >
                Light
              </Label>
            </div>

            <div
              className="
                flex
                items-center
                gap-3
                rounded-lg
                border
                border-[#d9b07f]/60
                bg-white
                p-4
              "
            >
              <RadioGroupItem value="dark" id="dark" />

              <Label
                htmlFor="dark"
                className="
                  cursor-pointer
                  text-[#4a2c1a]
                "
              >
                Dark
              </Label>
            </div>

            <div
              className="
                flex
                items-center
                gap-3
                rounded-lg
                border
                border-[#d9b07f]/60
                bg-white
                p-4
              "
            >
              <RadioGroupItem value="system" id="system" />

              <Label
                htmlFor="system"
                className="
                  cursor-pointer
                  text-[#4a2c1a]
                "
              >
                System
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Dashboard Preferences */}
      <Card
        className="
          border-[#d9b07f]/70
          bg-[#fffaf5]
          shadow-sm
        "
      >
        <CardHeader>
          <CardTitle className="text-[#4a2c1a]">
            Dashboard Preferences
          </CardTitle>

          <CardDescription>
            Customize your workspace experience.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-5">
          <div
            className="
              flex
              items-center
              justify-between
              rounded-lg
              border
              border-[#d9b07f]/60
              bg-white
              p-4
            "
          >
            <div className="space-y-1">
              <Label
                className="
                  text-[#4a2c1a]
                "
              >
                Enable Animations
              </Label>

              <p
                className="
                  text-sm
                  text-[#8b5e34]
                "
              >
                Show smooth transitions and UI animations.
              </p>
            </div>

            <Switch defaultChecked />
          </div>

          <div
            className="
              flex
              items-center
              justify-between
              rounded-lg
              border
              border-[#d9b07f]/60
              bg-white
              p-4
            "
          >
            <div className="space-y-1">
              <Label
                className="
                  text-[#4a2c1a]
                "
              >
                Compact Mode
              </Label>

              <p
                className="
                  text-sm
                  text-[#8b5e34]
                "
              >
                Reduce spacing to show more data on screen.
              </p>
            </div>

            <Switch />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
