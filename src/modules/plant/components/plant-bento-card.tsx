import { BentoCard } from "@/components/magicui/bento-grid";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";
import { useState } from "react";
import { FaUserCog } from "react-icons/fa";
import { TbBuildingFactory } from "react-icons/tb";
import PlantAssignedUsersSheet from "./plant-assigned-users-sheet";
import { PlantResponseDto } from "../models/plant-model";
import FlexContainer from "@/components/custom/flex-container/flex-container";

interface PlantBentoCardProps {
  plant: PlantResponseDto;
  image: StaticImageData;
  alwaysActive?: boolean;
}

export default function PlantBentoCard({ plant, image, alwaysActive }: PlantBentoCardProps) {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <>
      <BentoCard
        key={plant.id}
        Icon={TbBuildingFactory}
        name={plant.name}
        description={plant.location}
        href="/plant"
        cta="View Plant"
        className="h-64 col-span-1"
        alwaysActive={alwaysActive}
        background={
          <Image
            src={image}
            alt="Plant"
            fill
            className={cn(
              "absolute object-cover object-center opacity-25 transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_25%,#000_80%)]",
              alwaysActive ? "scale-105 opacity-35" : "group-hover:scale-105 group-hover:opacity-50"
            )}
          />
        }
        nextToTheButton={
          <FlexContainer justify="end" className="w-full">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={"ghost"}
                    className="pointer-events-auto rounded-full"
                    onClick={() => setSheetOpen(true)}
                  >
                    <FaUserCog className="scale-150" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Manage users</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </FlexContainer>
        }
      />
      <PlantAssignedUsersSheet plant={plant} open={sheetOpen} onOpenChange={setSheetOpen} />
    </>
  );
}
