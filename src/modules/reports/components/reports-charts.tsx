"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import type { MaintenanceResponseDto } from "@/modules/maintenance/models/maintenance-model";
import { RouteResponseDto } from "@/modules/route/models/route-model";
import { eachWeekOfInterval, endOfWeek, format, parseISO, startOfWeek } from "date-fns";
import { es } from "date-fns/locale";
import { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";
import { ReportsFilters } from "./reports-page-content";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { PencilRuler } from "lucide-react";
import { MdInfoOutline } from "react-icons/md";

interface ReportsChartsProps {
  maintenances: MaintenanceResponseDto[];
  filters: ReportsFilters;
  routes: RouteResponseDto[];
}

const COLORS = [
  "var(--chart-3)",
  "var(--chart-1)",
  "var(--chart-3)",
  "var(--chart-3)",
  "var(--chart-3)",
];

export function ReportsCharts({ maintenances, filters, routes }: ReportsChartsProps) {
  const maintenanceByTypeData = useMemo(() => {
    const typeCount = maintenances.reduce((acc, maintenance) => {
      const type = maintenance.form.maintenance_type.name;
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(typeCount).map(([type, count]) => ({
      type,
      count,
    }));
  }, [maintenances]);

  const maintenanceBySectorData = useMemo(() => {
    const sectorCount = maintenances.reduce((acc, maintenance) => {
      const sector = maintenance.element.component.asset.sector.name;
      acc[sector] = (acc[sector] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(sectorCount).map(([sector, count]) => ({
      sector,
      count,
    }));
  }, [maintenances]);

  const maintenanceTimelineData = useMemo(() => {
    if (maintenances.length === 0) return [];

    const dates = maintenances.map((m) => parseISO(m.maintenance_date));
    const minDate = new Date(Math.min(...dates.map((d) => d.getTime())));
    const maxDate = new Date(Math.max(...dates.map((d) => d.getTime())));

    const weeks = eachWeekOfInterval(
      { start: startOfWeek(minDate), end: endOfWeek(maxDate) },
      { locale: es }
    );

    return weeks.map((week) => {
      const weekStart = startOfWeek(week);
      const weekEnd = endOfWeek(week);

      const count = maintenances.filter((m) => {
        const date = parseISO(m.maintenance_date);
        return date >= weekStart && date <= weekEnd;
      }).length;

      return {
        week: format(weekStart, "dd/MM", { locale: es }),
        count,
      };
    });
  }, [maintenances]);

  const statusData = useMemo(() => {
    if (!routes || !filters.dateFrom || !filters.dateTo) return [];

    type ExpectedMaintenance = {
      elementId: number;
      routeId: number;
      expectedDate: string;
    };

    const expectedMaintenances: ExpectedMaintenance[] = [];

    routes.forEach((route) => {
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

    const totalDone = maintenances.filter((m) => {
      const date = new Date(m.maintenance_date).toISOString().split("T")[0];
      const key = `${m.element.id}-${m.route.id}-${date}`;
      return expectedSet.has(key);
    }).length;

    const totalPlanned = expectedSet.size;
    const totalPending = Math.max(totalPlanned - totalDone, 0);

    return [
      { name: "Completados", value: totalDone },
      { name: "Pendientes", value: totalPending },
    ];
  }, [routes, maintenances, filters]);

  const chartConfig = {
    count: {
      label: "Cantidad",
      color: "var(--chart-1)",
    },
    type: {
      label: "Tipo",
      color: "var(--chart-2)",
    },
    sector: {
      label: "Sector",
      color: "var(--chart-3)",
    },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Maintenance by Type Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Maintenance by Type</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            {maintenanceByTypeData.length === 0 ? (
              <Alert variant="default" className="bg-sky-50 text-sky-700 border-sky-700">
                <MdInfoOutline className="h-4 w-4 inline-block mr-2" />
                <AlertDescription className="text-sky-700">No results.</AlertDescription>
              </Alert>
            ) : (
              <BarChart data={maintenanceByTypeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="type"
                  tick={{ fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="count" fill="var(--color-count)" radius={4} />
              </BarChart>
            )}
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Maintenance by Sector Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Maintenance by Sector</CardTitle>
        </CardHeader>
        <CardContent>
          {maintenanceBySectorData.length === 0 ? (
            <Alert variant="default" className="bg-sky-50 text-sky-700 border-sky-700">
              <MdInfoOutline className="h-4 w-4 inline-block mr-2" />
              <AlertDescription className="text-sky-700">No results.</AlertDescription>
            </Alert>
          ) : (
            <ChartContainer config={chartConfig} className="h-[300px]">
              <BarChart data={maintenanceBySectorData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="sector"
                  tick={{ fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="count" fill="var(--color-sector)" radius={4} />
              </BarChart>
            </ChartContainer>
          )}
        </CardContent>
      </Card>

      {/* Timeline Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Evolution Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          {maintenanceTimelineData.length === 0 ? (
            <Alert variant="default" className="bg-sky-50 text-sky-700 border-sky-700">
              <MdInfoOutline className="h-4 w-4 inline-block mr-2" />
              <AlertDescription className="text-sky-700">No results.</AlertDescription>
            </Alert>
          ) : (
            <ChartContainer config={chartConfig} className="h-[300px]">
              <LineChart data={maintenanceTimelineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="var(--color-count)"
                  strokeWidth={2}
                  dot={{ fill: "var(--color-count)" }}
                />
              </LineChart>
            </ChartContainer>
          )}
        </CardContent>
      </Card>

      {/* Status Pie Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Status</CardTitle>
        </CardHeader>
        <CardContent>
          {maintenanceTimelineData.length === 0 ? (
            <Alert variant="default" className="bg-sky-50 text-sky-700 border-sky-700">
              <MdInfoOutline className="h-4 w-4 inline-block mr-2" />
              <AlertDescription className="text-sky-700">No results.</AlertDescription>
            </Alert>
          ) : (
            <ChartContainer config={chartConfig} className="h-[300px]">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
