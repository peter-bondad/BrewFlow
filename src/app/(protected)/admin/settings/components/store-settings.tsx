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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export function StoreSettings() {
  return (
    <div className="space-y-6">
      {/* Store Information */}
      <Card
        className="
          border-[#d9b07f]/70
          bg-[#fffaf5]
          shadow-sm
        "
      >
        <CardHeader>
          <CardTitle className="text-[#4a2c1a]">Store Information</CardTitle>

          <CardDescription>Manage your coffee shop details.</CardDescription>
        </CardHeader>

        <CardContent className="space-y-5">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Store Name</Label>

              <Input placeholder="Brew Haven Coffee" />
            </div>

            <div className="space-y-2">
              <Label>Contact Number</Label>

              <Input placeholder="+63 900 000 0000" />
            </div>

            <div className="space-y-2">
              <Label>Store Email</Label>

              <Input placeholder="hello@brewhaven.com" />
            </div>

            <div className="space-y-2">
              <Label>Currency</Label>

              <Select defaultValue="php">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="php">PHP (₱)</SelectItem>

                  <SelectItem value="usd">USD ($)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Address</Label>

            <Textarea placeholder="Enter store address..." />
          </div>

          <Button
            className="
              bg-[#8b5e34]
              text-white
              hover:bg-[#6d451f]
            "
          >
            Save Changes
          </Button>
        </CardContent>
      </Card>

      {/* Business Hours */}
      <Card
        className="
          border-[#d9b07f]/70
          bg-[#fffaf5]
          shadow-sm
        "
      >
        <CardHeader>
          <CardTitle className="text-[#4a2c1a]">Business Hours</CardTitle>

          <CardDescription>
            Set your coffee shop operating schedule.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-5">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Opening Time</Label>

              <Input type="time" defaultValue="07:00" />
            </div>

            <div className="space-y-2">
              <Label>Closing Time</Label>

              <Input type="time" defaultValue="21:00" />
            </div>
          </div>

          <Button
            className="
              bg-[#8b5e34]
              text-white
              hover:bg-[#6d451f]
            "
          >
            Update Hours
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
