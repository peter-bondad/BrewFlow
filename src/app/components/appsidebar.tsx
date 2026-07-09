import {
  Coffee,
  LayoutDashboard,
  MailPlus,
  Users,
  CupSoda,
  Package,
  ShoppingBag,
  BarChart3,
  Settings,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import Link from "next/link";

const navigation = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Overview",
        href: "/admin",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    title: "Management",
    items: [
      {
        title: "Invitations",
        href: "/admin/invitations",
        icon: MailPlus,
      },
      {
        title: "Users",
        href: "/admin/users",
        icon: Users,
      },
      {
        title: "Menu",
        href: "/admin/menu",
        icon: CupSoda,
      },
      {
        title: "Inventory",
        href: "/admin/inventory",
        icon: Package,
      },
    ],
  },
  {
    title: "Sales",
    items: [
      {
        title: "Orders",
        href: "/admin/orders",
        icon: ShoppingBag,
      },
      {
        title: "Reports",
        href: "/admin/reports",
        icon: BarChart3,
      },
    ],
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-3 px-3 py-4">
          <div className="flex size-10 items-center justify-center rounded-xl bg-[#6f3e1d] text-[#fff8ef]">
            <Coffee className="size-5" />
          </div>

          <div>
            <h1 className="font-semibold text-[#3d2413]">Coffee House</h1>
            <p className="text-xs text-[#7b5f46]">Admin Panel</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {navigation.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel className="text-[#8d5a2b]">
              {group.title}
            </SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton render={<Link href={item.href} />}>
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton render={<Link href="/dashboard/settings" />}>
              <Settings />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
