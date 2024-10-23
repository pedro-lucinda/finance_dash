import type { Metadata } from "next";
import { AppSidebar } from "@/components/modules/sidebar";
import {
  SidebarProvider,
  SidebarTrigger,
} from "@/components/templates/ui/sidebar";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <div className="flex w-full">
        <SidebarTrigger />
        {children}
      </div>
    </SidebarProvider>
  );
}
