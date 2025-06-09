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
import { MaintenanceByList } from "@/modules/maintenance/components/maintenance-by-list";
import { Pen, Puzzle, Save, X } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useGetElementById } from "../handlers/element-handler";
import ElementRequestForm from "./element-request-form";

export default function SimpleElementDetailPageContent() {
  const { id } = useParams();

  const [editMode, setEditMode] = useState(false);
  const [formUtils, setFormUtils] = useState<{
    resetForm: () => void;
    isUpdating: boolean;
  } | null>(null);

  const { data: element, isLoading } = useGetElementById(Number(id));

  const title = "Element: " + (element?.name || "...");

  return (
    <>
      <PageHeader
        icon={<Puzzle className="w-8 h-8" />}
        title={title}
        description="Element detail with its maintenance"
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
                form="element-form"
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
      <ElementRequestForm
        formId="element-form"
        editMode={editMode}
        onEditModeChange={setEditMode}
        requestType="update"
        initialData={element}
        componentId={Number(element?.component?.id)}
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
