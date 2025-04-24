import PlantHomePageContent from "@/modules/home/components/plant-home-page-content";
import PageContainer from "@/components/custom/page/app-page-container";
import React from "react";

export default function PlantHomePage() {
  return (
    <PageContainer padding="my-4 mx-2 sm:mx-5 ">
      <PlantHomePageContent />
    </PageContainer>
  );
}
