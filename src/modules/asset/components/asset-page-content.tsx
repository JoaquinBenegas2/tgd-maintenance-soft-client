import { DynamicBreadcrumbTrail } from "@/components/custom/dynamic-breadcrumb/dynamic-breadcrumb-trail";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import AssetList from "./asset-list";
import PageHeader from "@/components/custom/page/app-page-header";

export default function AssetPageContent() {
  return (
    <>
      <PageHeader title="Assets" className="mb-3!" />
      <Breadcrumb className="mb-4 flex justify-between h-8">
        <DynamicBreadcrumbTrail startFrom={2} />
      </Breadcrumb>
      <AssetList />
    </>
  );
}
