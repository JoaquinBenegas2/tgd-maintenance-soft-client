import PageContainer from "@/components/custom/page/app-page-container";
import PageHeader from "@/components/custom/page/app-page-header";
import SectorList from "@/modules/sector/components/sector-list";
import React from "react";

export default function SectorsPage() {
  return (
    <PageContainer variant="contained">
      <PageHeader title="Sectors" description="In this page you can manage your sectors" />
      <SectorList />
    </PageContainer>
  );
}
