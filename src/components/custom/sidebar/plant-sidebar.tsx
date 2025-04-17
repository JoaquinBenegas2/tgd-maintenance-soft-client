"use client";

import LogoIcon from "@/assets/svg/color-isotype.svg";
import { Sidebar } from "@/components/ui/sidebar/sidebar";
import { SidebarContent } from "@/components/ui/sidebar/sidebar-content";
import { SidebarFooter } from "@/components/ui/sidebar/sidebar-footer";
import { SidebarHeader } from "@/components/ui/sidebar/sidebar-header";
import { SidebarItem } from "@/components/ui/sidebar/sidebar-item";
import { usePlantPath } from "@/hooks/plant-path/use-plant-path";
import { SignOutButton } from "@/modules/auth/components/sign-out-button";
import { usePlantStore } from "@/stores/selected-plant-store";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";
import { MdHome, MdOutlineMyLocation, MdPrecisionManufacturing } from "react-icons/md";

export default function PlantSidebar() {
  const pathname = usePathname();
  const basePath = usePlantPath();

  const router = useRouter();

  const clearSelectedPlant = usePlantStore((state) => state.clearSelectedPlant);

  const handleGoBack = () => {
    clearSelectedPlant(() => router.push("/plants"));
  };

  return (
    <Sidebar>
      <SidebarHeader logo={<Image src={LogoIcon} alt="Logo" className="min-h-10 min-w-10" />} />
      <SidebarContent>
        <SidebarItem
          icon={<MdHome className="h-5 w-5" />}
          text="Home"
          tooltip="Home"
          href={`${basePath}/home`}
          isActive={pathname.startsWith(`${basePath}/home`)}
        />
        <SidebarItem
          icon={<MdOutlineMyLocation className="h-5 w-5" />}
          text="Sectors"
          tooltip="Sectors"
          href={`${basePath}/sectors`}
          isActive={pathname.startsWith(`${basePath}/sectors`)}
        />
        <SidebarItem
          icon={<MdPrecisionManufacturing className="h-5 w-5" />}
          text="Manufacturers"
          tooltip="Manufacturers"
          href={`${basePath}/manufacturers`}
          isActive={pathname.startsWith(`${basePath}/manufacturers`)}
        />
      </SidebarContent>
      <SidebarFooter>
        <SidebarItem
          icon={<IoArrowBack className="h-5 w-5" />}
          text="Go back"
          tooltip="Go back"
          className="hover:!text-primary hover:!bg-sidebar"
          onClick={handleGoBack}
        />
        <SignOutButton />
      </SidebarFooter>
    </Sidebar>
  );
}
