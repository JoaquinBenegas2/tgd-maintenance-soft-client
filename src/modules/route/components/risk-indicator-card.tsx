import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, ShieldCheck } from "lucide-react";
import React from "react";
import { useGetDelayedRoutes } from "../handlers/route-handler";
import { Skeleton } from "@/components/ui/skeleton";

export default function RiskIndicatorCard() {
  const { data: routes, isLoading } = useGetDelayedRoutes();

  const overdue =
    routes?.reduce((acc, route) => {
      const overdueElements = route.assigned_elements.filter(
        (el) => el.received_maintenance === false
      );

      return acc + overdueElements.length;
    }, 0) || 0;

  const riskLevel = overdue > 15 ? "High" : overdue > 5 ? "Medium" : "Low";

  const riskColor =
    riskLevel === "High"
      ? "text-red-500"
      : riskLevel === "Medium"
      ? "text-yellow-500"
      : "text-green-500";

  const RiskIcon = riskLevel === "High" ? AlertTriangle : ShieldCheck;

  return (
    <Card className="h-full">
      <CardHeader className="text-center">
        <CardTitle>Risk indicator</CardTitle>
        <CardDescription>Based on the number of overdue items to this day</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col justify-center h-full text-center">
        {isLoading ? (
          <div className="flex flex-col h-full items-center justify-center">
            <Skeleton className="w-10 h-10 mx-auto"></Skeleton>
            <Skeleton className="w-20 h-8 mx-auto mt-2"></Skeleton>
            <Skeleton className="w-24 h-5 mx-auto mt-1"></Skeleton>
          </div>
        ) : (
          <div className="flex flex-col h-full items-center justify-center">
            <RiskIcon className={`w-10 h-10 mx-auto ${riskColor}`} />
            <p className={`mt-2 text-2xl font-bold ${riskColor}`}>{riskLevel}</p>
            <p className="text-muted-foreground text-sm">{overdue} overdue items</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
