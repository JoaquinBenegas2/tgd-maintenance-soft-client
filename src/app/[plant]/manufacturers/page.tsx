import PageContainer from "@/components/custom/page/app-page-container";
import PageHeader from "@/components/custom/page/app-page-header";
import ProtectedPage from "@/components/protected-page/protected-page";
import ManufacturerList from "@/modules/manufacturer/components/manufacturer-list";
import React from "react";
import { MdPrecisionManufacturing } from "react-icons/md";

export default function ManufacturersPage() {
  return (
    <ProtectedPage allowedRoles={["PLANT_MANAGER", "PLANT_SUPERVISOR"]}>
      <PageContainer variant="contained">
        <PageHeader
          icon={<MdPrecisionManufacturing className="w-8 h-8" />}
          title="Manufacturers"
          description="In this page you can manage your manufacturers"
        />
        <ManufacturerList />
      </PageContainer>
    </ProtectedPage>
  );
}
