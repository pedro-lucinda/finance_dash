"use client";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "../templates/ui/sidebar";
import SignoutButton from "./signout-btn";
import { useUserStore } from "@/store/user";

export function AppSidebar() {
  const pathname = usePathname();
  const { user } = useUserStore();

  const name = user?.email?.split("@")[0] ?? "User";

  if (pathname !== "/dashboard") {
    return null;
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <p className="text-sm font-bold capitalize">Welcome {name}!</p>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <a href="/" className=" font-bold">
            Home
          </a>
          <a href="/dashboard" className=" font-bold">
            Dashboard
          </a>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SignoutButton />
      </SidebarFooter>
    </Sidebar>
  );
}
