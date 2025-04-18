import { DynamicBreadcrumbTrail } from "@/components/custom/dynamic-breadcrumb/dynamic-breadcrumb-trail";
import PageHeader from "@/components/custom/page/app-page-header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { useParams, usePathname } from "next/navigation";
import { useGetComponentByIdAndAssetId } from "../handlers/component-handler";
import ComponentRequestForm from "./component-request-form";
import { Button } from "@/components/ui/button";
import { Pen, Puzzle, Save, X } from "lucide-react";
import { useState } from "react";
import ElementList from "@/modules/element/components/element-list";

export default function ComponentDetailPageContent() {
  const { assetId, componentId } = useParams();

  const [editMode, setEditMode] = useState(false);
  const [formUtils, setFormUtils] = useState<{
    resetForm: () => void;
    isUpdating: boolean;
  } | null>(null);

  const { data: component, isLoading } = useGetComponentByIdAndAssetId(
    Number(assetId),
    Number(componentId)
  );

  const pathname = usePathname();

  const customPathname = [
    { href: pathname.split("/")[1], name: pathname.slice(1) },
    { href: "assets", name: "Assets" },
    { href: component?.asset?.id || "", name: component?.asset?.name || "..." },
    { href: "components", name: "Components" },
    { href: component?.id || "", name: component?.name || "..." },
  ];

  const title = "Component: " + (component?.name || "...");

  return (
    <>
      <PageHeader icon={<Puzzle className="w-8 h-8" />} title={title} className="mb-0!" />
      <Breadcrumb className="mb-4 flex justify-between">
        <DynamicBreadcrumbTrail
          startFrom={2}
          customPathname={customPathname}
          ignore={["components"]}
        />
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
            <Button
              size={"sm"}
              type="submit"
              form="component-form"
              disabled={formUtils?.isUpdating}
            >
              <Save />
            </Button>
          </div>
        ) : (
          <Button size={"sm"} type="button" onClick={() => setEditMode(true)} disabled={isLoading}>
            <Pen />
          </Button>
        )}
      </Breadcrumb>
      <ComponentRequestForm
        formId="component-form"
        editMode={editMode}
        onEditModeChange={setEditMode}
        requestType="update"
        initialData={component}
        assetId={Number(assetId)}
        onExpose={setFormUtils}
      />
      <Separator className="my-6" />
      <h2 className="text-lg font-bold text-foreground mb-3">Elements</h2>
      <ElementList assetId={component?.asset?.id} component={component} isLoading={isLoading} />
    </>
  );
}
