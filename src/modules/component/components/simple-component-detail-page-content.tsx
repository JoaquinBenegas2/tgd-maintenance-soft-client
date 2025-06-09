import {
  Tabs,
  TabsContent,
  TabsContents,
  TabsList,
  TabsTrigger,
} from "@/components/animate-ui/radix-tabs";
import PageHeader from "@/components/custom/page/app-page-header";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ElementList from "@/modules/element/components/element-list";
import { MaintenanceByList } from "@/modules/maintenance/components/maintenance-by-list";
import { Pen, Puzzle, Save, X } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useGetComponentById } from "../handlers/component-handler";
import ComponentRequestForm from "./component-request-form";

export default function SimpleComponentDetailPageContent() {
  const { id } = useParams();

  const [editMode, setEditMode] = useState(false);
  const [formUtils, setFormUtils] = useState<{
    resetForm: () => void;
    isUpdating: boolean;
  } | null>(null);

  const { data: component, isLoading } = useGetComponentById(Number(id));

  const title = "Component: " + (component?.name || "...");

  return (
    <>
      <PageHeader
        icon={<Puzzle className="w-8 h-8" />}
        title={title}
        description="Component detail with its maintenance"
      >
        <div className="flex flex-1 justify-end">
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
            <Button
              size={"sm"}
              type="button"
              onClick={() => setEditMode(true)}
              disabled={isLoading}
            >
              <Pen />
            </Button>
          )}
        </div>
      </PageHeader>
      <ComponentRequestForm
        formId="component-form"
        editMode={editMode}
        onEditModeChange={setEditMode}
        requestType="update"
        initialData={component}
        assetId={Number(component?.asset?.id)}
        onExpose={setFormUtils}
      />
      <Separator className="my-6" />
      <Tabs defaultValue="elements" className="w-full flex flex-1">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="elements">Elements</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        </TabsList>
        <TabsContents className="mx-1 mt-2 flex flex-1">
          <TabsContent value="elements" className="flex">
            <ElementList
              assetId={component?.asset?.id}
              component={component}
              isLoading={isLoading}
            />
          </TabsContent>
          <TabsContent value="maintenance" className="flex">
            <MaintenanceByList by="component" id={component?.id || 0} />
          </TabsContent>
        </TabsContents>
      </Tabs>
    </>
  );
}
