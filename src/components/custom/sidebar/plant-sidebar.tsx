"use client";

import LogoIcon from "@/assets/svg/color-isotype.svg";
import { Sidebar } from "@/components/ui/sidebar/sidebar";
import { SidebarContent } from "@/components/ui/sidebar/sidebar-content";
import { SidebarFooter } from "@/components/ui/sidebar/sidebar-footer";
import { SidebarGroup } from "@/components/ui/sidebar/sidebar-group";
import { SidebarHeader } from "@/components/ui/sidebar/sidebar-header";
import { SidebarItem } from "@/components/ui/sidebar/sidebar-item";
import { usePlantPath } from "@/hooks/plant-path/use-plant-path";
import { SignOutButton } from "@/modules/auth/components/sign-out-button";
import { usePlantStore } from "@/stores/selected-plant-store";
import { Package, Tags, Wrench } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";
import { MdHome, MdOutlineMyLocation, MdPrecisionManufacturing } from "react-icons/md";
import { RiSurveyLine } from "react-icons/ri";
import { TbRoute2 } from "react-icons/tb";

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
        <SidebarGroup title="Maintenance">
          <SidebarItem
            icon={<TbRoute2 className="h-5 w-5" />}
            text="Routes"
            tooltip="Routes"
            href={`${basePath}/routes`}
            isActive={pathname.startsWith(`${basePath}/routes`)}
          />
          <SidebarItem
            icon={<Wrench className="h-5 w-5" />}
            text="Maintenance"
            tooltip="Maintenance"
            href={`${basePath}/maintenance`}
            isActive={
              pathname.startsWith(`${basePath}/maintenance`) &&
              !pathname.startsWith(`${basePath}/maintenance-types`)
            }
          />
          <SidebarItem
            icon={<Tags className="h-5 w-5" />}
            text="Maintenance Types"
            tooltip="Maintenance Types"
            href={`${basePath}/maintenance-types`}
            isActive={pathname.startsWith(`${basePath}/maintenance-types`)}
          />
          <SidebarItem
            icon={<RiSurveyLine className="h-5 w-5" />}
            text="Forms"
            tooltip="Forms"
            href={`${basePath}/forms`}
            isActive={pathname.startsWith(`${basePath}/forms`)}
          />
        </SidebarGroup>
        <SidebarGroup title="Configuration">
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
          <SidebarItem
            icon={<Package className="h-5 w-5" />}
            text="Assets"
            tooltip="Assets"
            href={`${basePath}/assets`}
            isActive={pathname.startsWith(`${basePath}/assets`)}
          />
        </SidebarGroup>
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
