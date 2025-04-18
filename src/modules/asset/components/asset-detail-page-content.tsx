import { DynamicBreadcrumbTrail } from "@/components/custom/dynamic-breadcrumb/dynamic-breadcrumb-trail";
import PageHeader from "@/components/custom/page/app-page-header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { useParams, usePathname } from "next/navigation";
import { useGetAssetById } from "../handlers/asset-handler";
import AssetRequestForm from "./asset-request-form";
import ComponentList from "@/modules/component/components/component-list";
import { Button } from "@/components/ui/button";
import { Pen, Save, X } from "lucide-react";
import { useState } from "react";

export default function AssetDetailPageContent() {
  const { assetId } = useParams();

  const [editMode, setEditMode] = useState(false);
  const [formUtils, setFormUtils] = useState<{
    resetForm: () => void;
    isUpdating: boolean;
  } | null>(null);

  const { data: asset } = useGetAssetById(Number(assetId));

  const pathname = usePathname();

  const customPathname = [
    { href: pathname.split("/")[1], name: pathname.slice(1) },
    { href: "assets", name: "Assets" },
    { href: asset?.id || "", name: asset?.name || "" },
  ];

  return (
    <>
      <PageHeader title={"Asset: " + asset?.name} className="mb-3!" />
      <Breadcrumb className="mb-4 flex justify-between">
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
          <Button size={"sm"} type="button" onClick={() => setEditMode(true)} form="user-form">
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
      <h2 className="text-lg font-bold text-foreground mb-3">Components</h2>
      <ComponentList assetId={asset?.id} />
    </>
  );
}
