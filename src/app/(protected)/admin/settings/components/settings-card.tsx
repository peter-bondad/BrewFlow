import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ReactNode } from "react";

interface SettingsCardProps {
  title: string;
  description: string;
  children: ReactNode;
}

export function SettingsCard({
  title,
  description,
  children,
}: SettingsCardProps) {
  return (
    <Card
      className="
        mt-6
        border-[#d9b07f]/70
        bg-[#fffaf5]
        shadow-[0_20px_60px_-30px_rgba(109,69,31,0.35)]
      "
    >
      <CardHeader>
        <CardTitle
          className="
            text-xl
            text-[#4a2c1a]
          "
        >
          {title}
        </CardTitle>

        <CardDescription
          className="
            text-[#8b5e34]
          "
        >
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent>{children}</CardContent>
    </Card>
  );
}
