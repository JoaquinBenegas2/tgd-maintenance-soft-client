import { useGetAllForms } from "@/modules/maintenance-form/handlers/maintenance-form-handler";
import { FormReportsFilterHeader } from "./form-reports-filter-header";
import { ReportsFilters } from "./form-reports-page-content";
import FormTabsList from "./form-tabs-list";
import GeneratedFormTabsContent from "./generated-form-tabs-content";
import { Tabs } from "@/components/animate-ui/radix-tabs";

interface FormTabsContentProps {
  filters: ReportsFilters;
  handleFiltersChange: (filters: ReportsFilters) => void;
  handleResetFilters: () => void;
}

export default function FormTabs({
  filters,
  handleFiltersChange,
  handleResetFilters,
}: FormTabsContentProps) {
  const { data: forms } = useGetAllForms();

  return (
    <>
      {forms && (
        <Tabs defaultValue={forms[0]?.id?.toString()} className="flex-1 flex overflow-hidden gap-0">
          <FormTabsList forms={forms} />

          <FormReportsFilterHeader
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onResetFilters={handleResetFilters}
          />

          <GeneratedFormTabsContent forms={forms} filters={filters} />
        </Tabs>
      )}
    </>
  );
}
