"use client";

import LogoIcon from "@/assets/svg/color-isotype.svg";
import { Sidebar } from "@/components/ui/sidebar/sidebar";
import { SidebarContent } from "@/components/ui/sidebar/sidebar-content";
import { SidebarFooter } from "@/components/ui/sidebar/sidebar-footer";
import { SidebarHeader } from "@/components/ui/sidebar/sidebar-header";
import { SidebarItem } from "@/components/ui/sidebar/sidebar-item";
import { SignOutButton } from "@/modules/auth/components/sign-out-button";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { MdPeople } from "react-icons/md";
import { TbBuildingFactory } from "react-icons/tb";

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader logo={<Image src={LogoIcon} alt="Logo" className="min-h-10 min-w-10" />} />
      <SidebarContent>
        <SidebarItem
          icon={<TbBuildingFactory className="h-5 w-5" />}
          text="Plants"
          tooltip="Plants"
          href="/plants"
          isActive={pathname === "/plants"}
        />
        <SidebarItem
          icon={<MdPeople className="h-5 w-5" />}
          text="Users"
          tooltip="Users"
          href="/users"
          isActive={pathname === "/users"}
        />
      </SidebarContent>
      <SidebarFooter>
        <SignOutButton />
      </SidebarFooter>
    </Sidebar>
  );
}
