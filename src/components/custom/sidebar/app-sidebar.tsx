"use client";

import LogoIcon from "@/assets/svg/color-isotype.svg";
/* import { AnimatedThemeIcon } from "@/components/ui/animated-theme-icon"; */
import { Sidebar } from "@/components/ui/sidebar/sidebar";
import { SidebarContent } from "@/components/ui/sidebar/sidebar-content";
import { SidebarFooter } from "@/components/ui/sidebar/sidebar-footer";
import { SidebarHeader } from "@/components/ui/sidebar/sidebar-header";
import { SidebarItem } from "@/components/ui/sidebar/sidebar-item";
import { SignOutButton } from "@/modules/auth/components/sign-out-button";
/* import { useTheme } from "next-themes"; */
import Image from "next/image";
import { usePathname } from "next/navigation";
import { MdPeople } from "react-icons/md";
import { TbBuildingFactory } from "react-icons/tb";

export default function AppSidebar() {
  /* const { setTheme } = useTheme(); */
  const pathname = usePathname();

  /* const toggleTheme = () => {
    setTheme((theme) => (theme === "dark" ? "light" : "dark"));
  }; */

  return (
    <Sidebar>
      <SidebarHeader logo={<Image src={LogoIcon} alt="Logo" className="min-h-10 min-w-10" />} />
      <SidebarContent>
        <SidebarItem
          icon={<TbBuildingFactory className="h-5 w-5" />}
          text="Factories"
          tooltip="Factories"
          href="/factories"
          isActive={pathname === "/factories"}
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
        {/* <SidebarItem
          icon={<AnimatedThemeIcon />}
          text="Theme"
          tooltip="Toggle Theme"
          onClick={toggleTheme}
          className="hover:!bg-sidebar"
        /> */}
        <SignOutButton />
      </SidebarFooter>
    </Sidebar>
  );
}
