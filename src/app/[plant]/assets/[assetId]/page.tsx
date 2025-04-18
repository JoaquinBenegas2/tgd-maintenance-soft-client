"use client";

import { DynamicBreadcrumbTrail } from "@/components/custom/dynamic-breadcrumb/dynamic-breadcrumb-trail";
import PageContainer from "@/components/custom/page/app-page-container";
import PageHeader from "@/components/custom/page/app-page-header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { useParams, usePathname, useRouter } from "next/navigation";

export default function AssetDetailPage() {
  const { assetId } = useParams();

  const router = useRouter();
  const pathname = usePathname();

  const componentId = 1;

  const go = () => {
    router.push(`${pathname}/components/${componentId}`);
  };

  return (
    <PageContainer variant="contained">
      <PageHeader
        title={"Asset: " + assetId}
        description="In this page you can manage your asset"
      />
      <Breadcrumb className="mb-4">
        <DynamicBreadcrumbTrail startFrom={2} />
      </Breadcrumb>
      <Button onClick={go}>View Component</Button>
    </PageContainer>
  );
}
