"use client";

import { DynamicBreadcrumbTrail } from "@/components/custom/dynamic-breadcrumb/dynamic-breadcrumb-trail";
import PageContainer from "@/components/custom/page/app-page-container";
import PageHeader from "@/components/custom/page/app-page-header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { useParams } from "next/navigation";

export default function ElementDetailPage() {
  const { elementId } = useParams();

  return (
    <PageContainer variant="contained">
      <PageHeader
        title={"Element: " + elementId}
        description="In this page you can manage your component"
      />
      <Breadcrumb className="mb-4">
        <DynamicBreadcrumbTrail startFrom={2} ignore={["components", "elements"]} />
      </Breadcrumb>
    </PageContainer>
  );
}
