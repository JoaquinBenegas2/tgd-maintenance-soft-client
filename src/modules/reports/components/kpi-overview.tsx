"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { AlertTriangle, CheckCircle, ClipboardList, Info, Map } from "lucide-react";

interface KPIOverviewProps {
  totalCount: number;
  overdueCount: number;
  activeRoutesCount: number;
  complianceRate: number;
}

export function KPIOverview({
  totalCount,
  overdueCount,
  complianceRate,
  activeRoutesCount,
}: KPIOverviewProps) {
  const kpiCards = [
    {
      title: "Total Maintenance",
      value: totalCount.toString(),
      icon: ClipboardList,
      description: "Registered in the period",
      info: "Total number of maintenance events recorded between the 'From' and 'To' dates selected in the filters.",
      variant: "default" as const,
    },
    {
      title: "Overdue Maintenance",
      value: overdueCount.toString(),
      icon: AlertTriangle,
      description: "They require attention",
      info: "Number of planned maintenance operations that were not performed in a timely manner according to the periodicity of their route.",
      variant: overdueCount > 5 ? ("destructive" as const) : ("default" as const),
    },
    {
      title: "Compliance Rate",
      value: `${complianceRate}%`,
      icon: CheckCircle,
      description: "Maintenance completed",
      info: "Percentage of maintenance actually performed compared to what was expected in the filtered period.",
      variant: complianceRate >= 80 ? ("secondary" as const) : ("destructive" as const),
    },
    {
      title: "Active Routes",
      value: activeRoutesCount.toString(),
      icon: Map,
      description: "Scheduled during this period",
      info: "Number of routes that had at least one planned maintenance between the filtered dates.",
      variant: "default" as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
      {kpiCards.map((kpi, index) => {
        const Icon = kpi.icon;
        return (
          <Card key={index} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {kpi.title}
              </CardTitle>
              {kpi.info && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-muted-foreground hover:text-primary transition-all" />
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-xs text-sm">
                    {kpi.info}
                  </TooltipContent>
                </Tooltip>
              )}
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <Icon className="h-8 w-8 text-muted-foreground" />
                    <div className="text-4xl font-bold">{kpi.value}</div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{kpi.description}</p>
                  {kpi.variant !== "default" && (
                    <Badge variant={kpi.variant} className="mt-2">
                      {kpi.variant === "destructive" ? "Attention" : "Good"}
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
