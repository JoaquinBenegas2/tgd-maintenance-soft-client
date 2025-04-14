"use client";

import PlantImage1 from "@/assets/images/plant-image-1.jpg";
import PlantImage2 from "@/assets/images/plant-image-2.jpg";
import PlantImage3 from "@/assets/images/plant-image-3.jpg";
import FlexContainer from "@/components/custom/flex-container/flex-container";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useGetAssignedPlants } from "@/modules/user/handlers/user-handler";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { FaUserCog } from "react-icons/fa";
import { TbBuildingFactory } from "react-icons/tb";

const PlantImages = [PlantImage1, PlantImage2, PlantImage3];

const getPlantImage = (index: number) => PlantImages[index % PlantImages.length];

export default function AvailablePlants() {
  const { data: session } = useSession();

  const userId = session?.user?.auth0Id || "";

  const { data: plants, isLoading } = useGetAssignedPlants(userId);

  return (
    <FlexContainer className="mt-8">
      <BentoGrid className="grid-cols-3 auto-rows-auto">
        {/* Loading */}
        {isLoading && (
          <>
            <Skeleton className="h-64 col-span-1" />
            <Skeleton className="h-64 col-span-1" />
            <Skeleton className="h-64 col-span-1" />
          </>
        )}

        {/* Plants */}
        {plants?.map((plant, index) => (
          <BentoCard
            key={plant.id}
            Icon={TbBuildingFactory}
            name={plant.name}
            description={plant.location}
            href="/plant"
            cta="View Plant"
            className="h-64 col-span-1"
            background={
              <Image
                src={getPlantImage(index)}
                alt="Plant"
                fill
                className="absolute object-cover object-center opacity-25 transition-all duration-300 ease-out group-hover:scale-105 group-hover:opacity-50 [mask-image:linear-gradient(to_top,transparent_25%,#000_80%)]"
              />
            }
            nextToTheButton={
              <FlexContainer justify="end" className="w-full">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant={"ghost"} className="pointer-events-auto rounded-full">
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
        ))}
      </BentoGrid>
    </FlexContainer>
  );
}
