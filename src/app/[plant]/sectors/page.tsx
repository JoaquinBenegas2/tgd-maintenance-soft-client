import PageContainer from "@/components/custom/page/app-page-container";
import PageHeader from "@/components/custom/page/app-page-header";
import SectorList from "@/modules/sector/components/sector-list";
import React from "react";
import { MdOutlineMyLocation } from "react-icons/md";

export default function SectorsPage() {
  return (
    <PageContainer variant="contained">
      <PageHeader
        icon={<MdOutlineMyLocation className="w-8 h-8" />}
        title="Sectors"
        description="In this page you can manage your sectors"
      />
      <SectorList />
    </PageContainer>
  );
}
