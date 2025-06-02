import { DynamicBreadcrumbTrail } from "@/components/custom/dynamic-breadcrumb/dynamic-breadcrumb-trail";
import PageHeader from "@/components/custom/page/app-page-header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { useParams, usePathname } from "next/navigation";
import ElementRequestForm from "./element-request-form";
import { Button } from "@/components/ui/button";
import { Grip, Pen, Save, X } from "lucide-react";
import { useState } from "react";
import { useGetElementByIdComponentIdAndAssetId } from "../handlers/element-handler";
import {
  Tabs,
  TabsContent,
  TabsContents,
  TabsList,
  TabsTrigger,
} from "@/components/animate-ui/radix-tabs";
import { MaintenanceByList } from "@/modules/maintenance/components/maintenance-by-list";
import { Separator } from "@/components/ui/separator";

export default function ElementDetailPageContent() {
  const { assetId, componentId, elementId } = useParams();

  const [editMode, setEditMode] = useState(false);
  const [formUtils, setFormUtils] = useState<{
    resetForm: () => void;
    isUpdating: boolean;
  } | null>(null);

  const { data: element, isLoading } = useGetElementByIdComponentIdAndAssetId(
    Number(assetId),
    Number(componentId),
    Number(elementId)
  );

  const pathname = usePathname();

  const customPathname = [
    { href: pathname.split("/")[1], name: pathname.slice(1) },
    { href: "assets", name: "Assets" },
    { href: element?.component?.asset?.id || "", name: element?.component?.asset?.name || "..." },
    { href: "components", name: "Components" },
    { href: element?.component?.id || "", name: element?.component?.name || "..." },
    { href: "elements", name: "Elements" },
    { href: element?.id || "", name: element?.name || "..." },
  ];

  const title = "Element: " + (element?.name || "...");

  return (
    <>
      <PageHeader icon={<Grip className="w-8 h-8" />} title={title} className="mb-0!" />
      <Breadcrumb className="mb-4 flex flex-col md:flex-row gap-4 justify-between">
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
          <Button size={"sm"} type="button" onClick={() => setEditMode(true)} disabled={isLoading}>
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
      <Separator className="my-6" />
      <Tabs defaultValue="maintenance" className="w-full flex flex-1">
        <TabsList className="grid w-full grid-cols-1">
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        </TabsList>
        <TabsContents className="mx-1 mt-2 flex flex-1">
          <TabsContent value="maintenance" className="flex">
            <MaintenanceByList by="element" id={element?.id || 0} />
          </TabsContent>
        </TabsContents>
      </Tabs>
    </>
  );
}
