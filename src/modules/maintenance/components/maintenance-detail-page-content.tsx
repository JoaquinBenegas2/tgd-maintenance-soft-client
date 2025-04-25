"use client";

import {
  Tabs,
  TabsContent,
  TabsContents,
  TabsList,
  TabsTrigger,
} from "@/components/animate-ui/radix-tabs";
import PageHeader from "@/components/custom/page/app-page-header";
import CustomTable from "@/components/custom/table/app-custom-table";
import { Separator } from "@/components/ui/separator";
import { generateColumnsFromAnswers } from "@/modules/maintenance-form/utils/generate-columns-from-answers";
import { mapAnswersToRecord } from "@/modules/maintenance-form/utils/map-answers-to-record";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { Pen, Wrench } from "lucide-react";
import { useParams } from "next/navigation";
import { useGetMaintenanceById } from "../handlers/maintenance-handler";
import MaintenanceDetailRequestForm from "./maintenance-detail-request-form";
import { Button } from "@/components/ui/button";
import MaintenanceUpdateRequestForm from "./maintenance-update-request-form";

export default function MaintenanceDetailPageContent() {
  const { maintenanceId } = useParams();

  const { data: maintenance, isLoading } = useGetMaintenanceById(Number(maintenanceId));

  const title = `Maintenance Detail: ${
    (maintenance &&
      format(parseISO(maintenance?.maintenance_date), "dd/MM/yyyy", { locale: es })) ||
    "..."
  }`;

  const columns = generateColumnsFromAnswers(maintenance?.answers || []);
  const answer = mapAnswersToRecord(maintenance?.answers || []);

  return (
    <>
      <PageHeader
        icon={<Wrench className="w-8 h-8" />}
        title={title}
        description="This is the maintenance detail page"
      />

      <MaintenanceDetailRequestForm initialData={maintenance} />

      <Separator className="my-6" />
      <Tabs defaultValue="maintenance-answers" className="w-full flex flex-1">
        <TabsList className="grid w-full grid-cols-1">
          <TabsTrigger value="maintenance-answers">Maintenance answers</TabsTrigger>
        </TabsList>
        <TabsContents className="mx-1 mt-2 flex flex-1">
          <TabsContent value="maintenance-answers" className="flex">
            <CustomTable
              height="100%"
              className="flex-1"
              tableClassName="flex-1"
              isDataLoading={isLoading}
              columns={columns as any}
              items={[answer]}
              headerChildren={
                <div className="w-full flex justify-end">
                  <MaintenanceUpdateRequestForm maintenance={maintenance}>
                    <Button>
                      <Pen />
                    </Button>
                  </MaintenanceUpdateRequestForm>
                </div>
              }
            />
          </TabsContent>
        </TabsContents>
      </Tabs>
    </>
  );
}
