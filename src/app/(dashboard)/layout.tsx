import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../components/dashboard/appsidebar";
import { DashboardHeader } from "../components/dashboard/dashboard-header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <DashboardHeader />
        <main className="min-h-screen bg-[#fffaf5] p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
