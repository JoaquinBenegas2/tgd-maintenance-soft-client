import { DynamicBreadcrumbTrail } from "@/components/custom/dynamic-breadcrumb/dynamic-breadcrumb-trail";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import AssetList from "./asset-list";
import PageHeader from "@/components/custom/page/app-page-header";
import { Package } from "lucide-react";

export default function AssetPageContent() {
  return (
    <>
      <PageHeader icon={<Package className="w-8 h-8" />} title="Assets" className="mb-0!" />
      <Breadcrumb className="mb-4 flex justify-between h-8">
        <DynamicBreadcrumbTrail startFrom={2} />
      </Breadcrumb>
      <AssetList />
    </>
  );
}
