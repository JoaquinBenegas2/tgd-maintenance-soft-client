"use client";

import { DynamicBreadcrumbTrail } from "@/components/custom/dynamic-breadcrumb/dynamic-breadcrumb-trail";
import PageContainer from "@/components/custom/page/app-page-container";
import PageHeader from "@/components/custom/page/app-page-header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { useParams, usePathname, useRouter } from "next/navigation";

export default function ComponentDetailPage() {
  const { componentId } = useParams();

  const router = useRouter();
  const pathname = usePathname();

  const elementId = 1;

  const go = () => {
    router.push(`${pathname}/elements/${elementId}`);
  };

  return (
    <PageContainer variant="contained">
      <PageHeader
        title={"Component: " + componentId}
        description="In this page you can manage your component"
      />
      <Breadcrumb className="mb-4">
        <DynamicBreadcrumbTrail startFrom={2} ignore={["components"]} />
      </Breadcrumb>
      <Button onClick={go}>View Element</Button>
    </PageContainer>
  );
}
