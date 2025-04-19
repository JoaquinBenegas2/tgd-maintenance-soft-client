import PageHeader from "@/components/custom/page/app-page-header";
import { Wrench } from "lucide-react";
import React from "react";

export default function MaintenancePageContent() {
  return (
    <>
      <PageHeader
        icon={<Wrench className="w-8 h-8" />}
        title="Maintenance"
        description="Here you can manage your maintenance"
      />
    </>
  );
}
