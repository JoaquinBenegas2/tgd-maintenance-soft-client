"use client";

import PlantImage1 from "@/assets/images/plant-image-1.jpg";
import PlantImage2 from "@/assets/images/plant-image-2.jpg";
import PlantImage3 from "@/assets/images/plant-image-3.jpg";
import FlexContainer from "@/components/custom/flex-container/flex-container";
import { BentoGrid } from "@/components/magicui/bento-grid";
import { Skeleton } from "@/components/ui/skeleton";
import useIsMobile from "@/hooks/is-mobile/use-is-mobile";
import { useGetAssignedPlants } from "@/modules/user/handlers/user-handler";
import PlantBentoCard from "./plant-bento-card";

const PlantImages = [PlantImage1, PlantImage2, PlantImage3];

const getPlantImage = (index: number) => PlantImages[index % PlantImages.length];

export default function AvailablePlants() {
  const isMobile = useIsMobile();

  const { data: plants, isLoading } = useGetAssignedPlants();

  return (
    <FlexContainer className="mt-8">
      <BentoGrid className="grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 auto-rows-auto">
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
          <PlantBentoCard
            plant={plant}
            key={plant.id}
            image={getPlantImage(index)}
            alwaysActive={isMobile}
          />
        ))}
      </BentoGrid>
    </FlexContainer>
  );
}
