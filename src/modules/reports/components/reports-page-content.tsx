"use client";

import PageContainer from "@/components/custom/page/app-page-container";
import PageHeader from "@/components/custom/page/app-page-header";
import { Skeleton } from "@/components/ui/skeleton";
import type { MaintenanceResponseDto } from "@/modules/maintenance/models/maintenance-model";
import { format, subWeeks } from "date-fns";
import { es } from "date-fns/locale";
import { useMemo, useState } from "react";
import { KPIOverview } from "./kpi-overview";
import { ReportsCharts } from "./reports-charts";
import { ReportsFilterHeader } from "./reports-filter-header";
import { useGetAllMaintenances } from "@/modules/maintenance/handlers/maintenance-handler";
import { useGetAllRoutes, useGetDelayedRoutes } from "@/modules/route/handlers/route-handler";
import { RouteResponseDto } from "@/modules/route/models/route-model";

export interface ReportsFilters {
  dateFrom: Date;
  dateTo: Date;
  maintenanceType?: string;
}

export function ReportsPageContent() {
  const [filters, setFilters] = useState<ReportsFilters>({
    dateFrom: subWeeks(new Date(), 2),
    dateTo: new Date(),
  });

  const { data: maintenances, isLoading } = useGetAllMaintenances();
  const { data: delayedRoutes, isLoading: delayedRoutesLoading } = useGetDelayedRoutes();
  const { data: routes } = useGetAllRoutes();

  const filteredMaintenances = useMemo(() => {
    if (!maintenances) return [];

    return maintenances.filter((maintenance: MaintenanceResponseDto) => {
      const maintenanceDate = new Date(maintenance.maintenance_date);
      const isInDateRange =
        maintenanceDate >= filters.dateFrom && maintenanceDate <= filters.dateTo;

      if (!isInDateRange) return false;

      if (filters.maintenanceType && filters.maintenanceType !== "all") {
        return maintenance.form.maintenance_type.name === filters.maintenanceType;
      }

      return true;
    });
  }, [maintenances, filters]);

  const overdueCount = useMemo(() => {
    if (!delayedRoutes || !filters.dateTo) return 0;

    return delayedRoutes.reduce((acc, route) => {
      const overdueElements = route.assigned_elements.filter((el) => {
        if (el.received_maintenance) return false;

        const startDate = new Date(route.start_date);
        const periodicity = route.periodicity_in_days;

        if (isNaN(startDate.getTime()) || !periodicity) return false;

        const diffInDays = Math.floor(
          (filters.dateTo.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
        );
        const expectedCycles = Math.floor(diffInDays / periodicity);

        return expectedCycles >= 1;
      });

      return acc + overdueElements.length;
    }, 0);
  }, [delayedRoutes, filters.dateTo]);

  const complianceRate = useMemo(() => {
    if (!routes || !filters.dateFrom || !filters.dateTo) return 0;

    type ExpectedMaintenance = {
      elementId: number;
      routeId: number;
      expectedDate: string;
    };

    const expectedMaintenances: ExpectedMaintenance[] = [];

    routes.forEach((route: RouteResponseDto) => {
      const startDate = new Date(route.start_date);
      const periodicity = route.periodicity_in_days;

      if (isNaN(startDate.getTime()) || !periodicity) return;

      route.assigned_elements.forEach((el) => {
        let currentDate = new Date(startDate);

        while (currentDate <= filters.dateTo) {
          if (currentDate >= filters.dateFrom) {
            expectedMaintenances.push({
              elementId: el.id,
              routeId: route.id,
              expectedDate: currentDate.toISOString().split("T")[0],
            });
          }
          currentDate.setDate(currentDate.getDate() + periodicity);
        }
      });
    });

    const expectedSet = new Set(
      expectedMaintenances.map((item) => `${item.elementId}-${item.routeId}-${item.expectedDate}`)
    );

    const totalDoneReal = filteredMaintenances.filter((m: MaintenanceResponseDto) => {
      const date = new Date(m.maintenance_date).toISOString().split("T")[0];
      const key = `${m.element.id}-${m.route.id}-${date}`;
      console.log({ key });

      return expectedSet.has(key);
    }).length;

    const totalPlanned = expectedMaintenances.length;

    console.log({
      expectedSet: expectedSet,
      totalDoneReal,
      totalPlanned,
    });

    if (totalPlanned === 0) return 100;

    const compliance = (totalDoneReal / totalPlanned) * 100;
    return Math.min(Math.round(compliance), 100);
  }, [routes, filters, filteredMaintenances]);

  const activeRoutesCount = useMemo(() => {
    if (!routes || !filters.dateFrom || !filters.dateTo) return 0;

    type ExpectedMaintenance = {
      routeId: number;
    };

    const routeHasExpectedMaintenance = new Set<number>();

    routes.forEach((route: RouteResponseDto) => {
      const startDate = new Date(route.start_date);
      const periodicity = route.periodicity_in_days;

      if (isNaN(startDate.getTime()) || !periodicity) return;

      let hasMaintenance = false;

      route.assigned_elements.forEach((el) => {
        let currentDate = new Date(startDate);

        while (currentDate <= filters.dateTo) {
          if (currentDate >= filters.dateFrom) {
            hasMaintenance = true;
            break;
          }
          currentDate.setDate(currentDate.getDate() + periodicity);
        }
      });

      if (hasMaintenance) {
        routeHasExpectedMaintenance.add(route.id);
      }
    });

    return routeHasExpectedMaintenance.size;
  }, [routes, filters.dateFrom, filters.dateTo]);

  const handleFiltersChange = (newFilters: ReportsFilters) => {
    setFilters(newFilters);
  };

  const handleResetFilters = () => {
    setFilters({
      dateFrom: subWeeks(new Date(), 2),
      dateTo: new Date(),
    });
  };

  if (isLoading) {
    return (
      <PageContainer>
        <PageHeader title="Reports" description="Maintenance analysis and metrics" />
        <div className="space-y-6">
          <Skeleton className="h-36 w-full" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-[190px]" />
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Skeleton className="h-[394px]" />
            <Skeleton className="h-[394px]" />
            <Skeleton className="h-[394px]" />
            <Skeleton className="h-[394px]" />
          </div>
        </div>
      </PageContainer>
    );
  }

  console.log({
    filters,
    filteredMaintenances,
    maintenances,
    routes,
    overdueCount,
    complianceRate,
  });

  return (
    <PageContainer>
      <PageHeader
        title="Reports"
        description={`Maintenance analysis and metrics: ${format(
          filters.dateFrom,
          "dd/MM/yyyy",
          { locale: es }
        )} al ${format(filters.dateTo, "dd/MM/yyyy", { locale: es })}`}
      />

      <div className="space-y-6">
        <ReportsFilterHeader
          filters={filters}
          onFiltersChange={handleFiltersChange}
          onResetFilters={handleResetFilters}
          maintenances={maintenances || []}
        />

        <KPIOverview
          totalCount={filteredMaintenances.length}
          overdueCount={overdueCount}
          activeRoutesCount={activeRoutesCount}
          complianceRate={complianceRate}
        />

        <ReportsCharts
          maintenances={filteredMaintenances}
          filters={filters}
          routes={routes}
        />
      </div>
    </PageContainer>
  );
}
