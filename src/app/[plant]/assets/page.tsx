"use client";

import { DynamicBreadcrumbTrail } from "@/components/custom/dynamic-breadcrumb/dynamic-breadcrumb-trail";
import PageContainer from "@/components/custom/page/app-page-container";
import PageHeader from "@/components/custom/page/app-page-header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";

export default function AssetsPage() {
  const pathname = usePathname();
  const router = useRouter();

  const assetId = 1;

  const go = () => {
    router.push(`${pathname}/${assetId}`);
  };

  return (
    <PageContainer variant="contained">
      <PageHeader
        title="Assets"
        description="In this page you can manage your assets"
      />
      <Breadcrumb className="mb-4">
        <DynamicBreadcrumbTrail startFrom={2} />
      </Breadcrumb>
      <Button onClick={go}>View Asset</Button>
    </PageContainer>
  );
}
