import { TabsContent } from "@/components/animate-ui/radix-tabs";
import { FormResponseDto } from "@/modules/maintenance-form/models/maintenance-form-model";
import { useGetAllMaintenances } from "@/modules/maintenance/handlers/maintenance-handler";
import {
  MaintenanceAnswerResponseDto,
  MaintenanceResponseDto,
} from "@/modules/maintenance/models/maintenance-model";
import { format, parse } from "date-fns";
import { ReportsFilters } from "./form-reports-page-content";
import GenericList from "@/components/custom/generic-list/generic-list";
import { Card, CardContent } from "@/components/ui/card";
import { generateColumnsFromAnswers } from "@/modules/maintenance-form/utils/generate-columns-from-answers";
import { mapAnswersToRecord } from "@/modules/maintenance-form/utils/map-answers-to-record";
import CustomTable from "@/components/custom/table/app-custom-table";
import useIsMobile from "@/hooks/is-mobile/use-is-mobile";

interface GeneratedFormTabsContentProps {
  forms: FormResponseDto[];
  filters: ReportsFilters;
}

export default function GeneratedFormTabsContent({
  forms,
  filters,
}: GeneratedFormTabsContentProps) {
  const isMobile = useIsMobile();

  const { data: maintenance, isLoading } = useGetAllMaintenances();

  const fromDate = filters.dateFrom instanceof Date ? filters.dateFrom : new Date(filters.dateFrom);
  const toDate = filters.dateTo instanceof Date ? filters.dateTo : new Date(filters.dateTo);

  const filtered: MaintenanceResponseDto[] = (maintenance || []).filter(
    (m: MaintenanceResponseDto) => {
      const mDate = new Date(m.maintenance_date);
      return mDate >= fromDate && mDate <= toDate;
    }
  );

  const maintenanceByForm = filtered.reduce<Record<number, typeof filtered>>((acc, m) => {
    const formId = m.form.id;
    if (!acc[formId]) acc[formId] = [];
    acc[formId].push(m);
    return acc;
  }, {});

  return (
    <>
      {forms?.map((form: FormResponseDto) => {
        const dynamicColumns = generateColumnsFromAnswers(
          maintenanceByForm[form.id]?.[0]?.answers || []
        );

        const staticColumns = [
          {
            header: "Date",
            accessorKey: "maintenance_date",
            cellRenderer: (row: Record<string, any>) => <span>{row.maintenance_date}</span>,
          },
          {
            header: "Route",
            accessorKey: "route",
            cellRenderer: (row: Record<string, any>) => <span>{row.route}</span>,
          },
          {
            header: "Element",
            accessorKey: "element",
            cellRenderer: (row: Record<string, any>) => <span>{row.element}</span>,
          },
        ];

        const columns = [...staticColumns, ...dynamicColumns];

        const answers =
          maintenanceByForm[form.id]?.map((m) => ({
            ...mapAnswersToRecord(m.answers),
            maintenance_date: format(parse(m.maintenance_date, "yyyy-MM-dd", new Date()), "dd/MM/yyyy"),
            route: m.route.name,
            element: m.element.name,
          })) || [];

        return (
          <TabsContent key={form.id} value={form.id.toString()} className="flex-1">
            <Card className="h-full">
              <CardContent>
                <CustomTable
                  height={!isMobile ? "100%" : "400px"}
                  className={!isMobile ? "flex-1" : "w-full"}
                  tableClassName={!isMobile ? "flex-1" : ""}
                  isDataLoading={isLoading}
                  columns={columns as any}
                  items={answers}
                  showExcelReportButton
                />
              </CardContent>
            </Card>
          </TabsContent>
        );
      })}
    </>
  );
}
