import { DynamicBreadcrumbTrail } from "@/components/custom/dynamic-breadcrumb/dynamic-breadcrumb-trail";
import PageHeader from "@/components/custom/page/app-page-header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { useParams, usePathname } from "next/navigation";
import ElementRequestForm from "./element-request-form";
import { Button } from "@/components/ui/button";
import { Pen, Save, X } from "lucide-react";
import { useState } from "react";
import { useGetElementByIdComponentIdAndAssetId } from "../handlers/element-handler";

export default function ElementDetailPageContent() {
  const { assetId, componentId, elementId } = useParams();

  const [editMode, setEditMode] = useState(false);
  const [formUtils, setFormUtils] = useState<{
    resetForm: () => void;
    isUpdating: boolean;
  } | null>(null);

  const { data: element } = useGetElementByIdComponentIdAndAssetId(
    Number(assetId),
    Number(componentId),
    Number(elementId)
  );

  const pathname = usePathname();

  const customPathname = [
    { href: pathname.split("/")[1], name: pathname.slice(1) },
    { href: "assets", name: "Assets" },
    { href: element?.component?.asset?.id || "", name: element?.component?.asset?.name || "" },
    { href: "components", name: "Components" },
    { href: element?.component?.id || "", name: element?.component?.name || "" },
    { href: "elements", name: "Elements" },
    { href: element?.id || "", name: element?.name || "" },
  ];

  console.log({customPathname});
  

  return (
    <>
      <PageHeader title={"Element: " + element?.name} className="mb-3!" />
      <Breadcrumb className="mb-4 flex justify-between">
        <DynamicBreadcrumbTrail
          startFrom={2}
          customPathname={customPathname}
          ignore={["components", "elements"]}
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
            <Button size={"sm"} type="submit" form="element-form" disabled={formUtils?.isUpdating}>
              <Save />
            </Button>
          </div>
        ) : (
          <Button size={"sm"} type="button" onClick={() => setEditMode(true)}>
            <Pen />
          </Button>
        )}
      </Breadcrumb>
      <ElementRequestForm
        formId="element-form"
        editMode={editMode}
        onEditModeChange={setEditMode}
        requestType="update"
        initialData={element}
        assetId={Number(element?.component?.asset?.id)}
        componentId={Number(componentId)}
        onExpose={setFormUtils}
      />
    </>
  );
}
