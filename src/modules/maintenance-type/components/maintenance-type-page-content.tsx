import PageHeader from "@/components/custom/page/app-page-header";
import { Tags } from "lucide-react";
import React from "react";
import MaintenanceTypeList from "./maintenance-type-list";

export default function MaintenanceTypePageContent() {
  return (
    <>
      <PageHeader
        icon={<Tags className="w-8 h-8" />}
        title="Maintenance Types"
        description="Here you can manage your maintenance types"
      />
      <MaintenanceTypeList />
    </>
  );
}
