import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AccountSettings } from "./account-settings";
import { SettingsCard } from "./settings-card";
import { SecuritySettings } from "./security-settings";
import { AppearanceSettings } from "./appearance-settings";
import { StoreSettings } from "./store-settings";

export function SettingsTabs() {
  return (
    <Tabs defaultValue="account" className="w-full">
      <TabsList
        variant="line"
        className="
          w-full
          justify-start
          gap-6
          border-b
          border-[#d9b07f]/40
          bg-transparent
        "
      >
        <TabsTrigger
          value="account"
          className="
            relative
            px-1
            pb-3
            text-[#8b5e34]
            transition-all
            duration-300

            hover:text-[#4a2c1a]

            data-[state=active]:text-[#4a2c1a]

            after:absolute
            after:bottom-0
            after:left-0
            after:h-0.5
            after:w-full
            after:origin-left
            after:scale-x-0
            after:bg-[#8b5e34]
            after:transition-transform
            after:duration-300

            data-[state=active]:after:scale-x-100
          "
        >
          Account
        </TabsTrigger>

        <TabsTrigger
          value="security"
          className="
            relative
            px-1
            pb-3
            text-[#8b5e34]
            transition-all
            duration-300

            hover:text-[#4a2c1a]

            data-[state=active]:text-[#4a2c1a]

            after:absolute
            after:bottom-0
            after:left-0
            after:h-0.5
            after:w-full
            after:origin-left
            after:scale-x-0
            after:bg-[#8b5e34]
            after:transition-transform
            after:duration-300

            data-[state=active]:after:scale-x-100
          "
        >
          Security
        </TabsTrigger>

        <TabsTrigger
          value="appearance"
          className="
            relative
            px-1
            pb-3
            text-[#8b5e34]
            transition-all
            duration-300

            hover:text-[#4a2c1a]

            data-[state=active]:text-[#4a2c1a]

            after:absolute
            after:bottom-0
            after:left-0
            after:h-0.5
            after:w-full
            after:origin-left
            after:scale-x-0
            after:bg-[#8b5e34]
            after:transition-transform
            after:duration-300

            data-[state=active]:after:scale-x-100
          "
        >
          Appearance
        </TabsTrigger>

        <TabsTrigger
          value="store"
          className="
            relative
            px-1
            pb-3
            text-[#8b5e34]
            transition-all
            duration-300

            hover:text-[#4a2c1a]

            data-[state=active]:text-[#4a2c1a]

            after:absolute
            after:bottom-0
            after:left-0
            after:h-0.5
            after:w-full
            after:origin-left
            after:scale-x-0
            after:bg-[#8b5e34]
            after:transition-transform
            after:duration-300

            data-[state=active]:after:scale-x-100
          "
        >
          Store
        </TabsTrigger>
      </TabsList>

      <TabsContent value="account">
        <AccountSettings />
      </TabsContent>

      <TabsContent value="security">
        <SettingsCard
          title="Security"
          description="Manage your password and authentication settings."
        >
          <SecuritySettings />
        </SettingsCard>
      </TabsContent>

      <TabsContent value="appearance">
        <SettingsCard
          title="Appearance"
          description="Customize your BrewFlow interface."
        >
          <AppearanceSettings />
        </SettingsCard>
      </TabsContent>

      <TabsContent value="store">
        <SettingsCard
          title="Store Settings"
          description="Manage your coffee shop information."
        >
          <StoreSettings />
        </SettingsCard>
      </TabsContent>
    </Tabs>
  );
}
