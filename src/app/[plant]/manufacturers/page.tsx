import PageContainer from "@/components/custom/page/app-page-container";
import PageHeader from "@/components/custom/page/app-page-header";
import ManufacturerList from "@/modules/manufacturer/components/manufacturer-list";
import React from "react";

export default function ManufacturersPage() {
  return (
    <PageContainer variant="contained">
      <PageHeader
        title="Manufacturers"
        description="In this page you can manage your manufacturers"
      />
      <ManufacturerList />
    </PageContainer>
  );
}
