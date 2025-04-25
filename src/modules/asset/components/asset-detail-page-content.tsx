import { DynamicBreadcrumbTrail } from "@/components/custom/dynamic-breadcrumb/dynamic-breadcrumb-trail";
import PageHeader from "@/components/custom/page/app-page-header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ComponentList from "@/modules/component/components/component-list";
import { Package, Pen, Save, X } from "lucide-react";
import { useParams, usePathname } from "next/navigation";
import { useState } from "react";
import { useGetAssetById } from "../handlers/asset-handler";
import AssetRequestForm from "./asset-request-form";
import {
  Tabs,
  TabsContent,
  TabsContents,
  TabsList,
  TabsTrigger,
} from "@/components/animate-ui/radix-tabs";

export default function AssetDetailPageContent() {
  const { assetId } = useParams();

  const [editMode, setEditMode] = useState(false);
  const [formUtils, setFormUtils] = useState<{
    resetForm: () => void;
    isUpdating: boolean;
  } | null>(null);

  const { data: asset, isLoading } = useGetAssetById(Number(assetId));

  const pathname = usePathname();

  const customPathname = [
    { href: pathname.split("/")[1], name: pathname.slice(1) },
    { href: "assets", name: "Assets" },
    { href: asset?.id || "", name: asset?.name || "..." },
  ];

  const title = "Asset: " + (asset?.name || "...");

  return (
    <>
      <PageHeader icon={<Package className="w-8 h-8" />} title={title} className="mb-0!" />
      <Breadcrumb className="mb-4 flex flex-col md:flex-row gap-4 justify-between">
        <DynamicBreadcrumbTrail startFrom={2} customPathname={customPathname} />
        {editMode ? (
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant={"secondary"}
              size={"sm"}
              type="button"
              onClick={() => {
                setEditMode(false);
                formUtils?.resetForm();
              }}
              disabled={formUtils?.isUpdating}
            >
              <X />
            </Button>
            <Button size={"sm"} type="submit" form="asset-form" disabled={formUtils?.isUpdating}>
              <Save />
            </Button>
          </div>
        ) : (
          <Button size={"sm"} type="button" onClick={() => setEditMode(true)} disabled={isLoading}>
            <Pen />
          </Button>
        )}
      </Breadcrumb>
      <AssetRequestForm
        formId="asset-form"
        editMode={editMode}
        onEditModeChange={setEditMode}
        requestType="update"
        initialData={asset}
        onExpose={setFormUtils}
      />
      <Separator className="my-6" />
      <Tabs defaultValue="components" className="w-full flex flex-1">
        <TabsList className="grid w-full grid-cols-1">
          <TabsTrigger value="components">Components</TabsTrigger>
        </TabsList>
        <TabsContents className="mx-1 mt-2 flex flex-1">
          <TabsContent value="components" className="flex">
            <ComponentList asset={asset} isLoading={isLoading} />
          </TabsContent>
        </TabsContents>
      </Tabs>
    </>
  );
}
