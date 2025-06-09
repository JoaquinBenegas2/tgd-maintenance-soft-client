"use client";

import { Tabs } from "@/components/animate-ui/radix-tabs";
import PageContainer from "@/components/custom/page/app-page-container";
import PageHeader from "@/components/custom/page/app-page-header";
import { format, subWeeks } from "date-fns";
import { es } from "date-fns/locale";
import { useState } from "react";
import FormTabs from "./form-tabs";

export interface ReportsFilters {
  dateFrom: Date;
  dateTo: Date;
}

export function FormReportsPageContent() {
  const [filters, setFilters] = useState<ReportsFilters>({
    dateFrom: subWeeks(new Date(), 2),
    dateTo: new Date(),
  });

  const handleFiltersChange = (newFilters: ReportsFilters) => {
    setFilters(newFilters);
  };

  const handleResetFilters = () => {
    setFilters({
      dateFrom: subWeeks(new Date(), 2),
      dateTo: new Date(),
    });
  };

  return (
    <PageContainer>
      <PageHeader
        title="Form reports"
        description={`Form analysis and metrics: ${format(filters.dateFrom, "dd/MM/yyyy", {
          locale: es,
        })} to ${format(filters.dateTo, "dd/MM/yyyy", { locale: es })}`}
      />

      <div className="flex-1 flex">
        <FormTabs
          filters={filters}
          handleFiltersChange={handleFiltersChange}
          handleResetFilters={handleResetFilters}
        />
      </div>
    </PageContainer>
  );
}
