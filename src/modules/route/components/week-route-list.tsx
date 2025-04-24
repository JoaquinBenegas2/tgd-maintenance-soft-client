"use client";

import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { useGetWeekRoutes } from "../handlers/route-handler";
import RouteListItem from "./route-list-item";
import { addDays, format } from "date-fns";

export default function WeekRouteList() {
  const { data: routes } = useGetWeekRoutes();

  return (
    <Card className="h-[calc(100vh-96px)]">
      <CardContent className="overflow-y-auto">
        <CardTitle>Week Routes</CardTitle>
        <CardDescription>Routes to be completed in the next 7 days</CardDescription>

        <ul className="mt-3 space-y-4 overflow-y-auto pr-2">
          {Object.entries(routes || {}).map(([key, routeList]) => {
            const dayOffset = parseInt(key); // 1 - 7
            const date = addDays(new Date(), dayOffset);
            const formattedDate = format(date, "eeee dd/MM/yyyy");

            return (
              <li key={key}>
                <p className="text-muted-foreground mb-2 text-sm">{formattedDate}</p>
                <ul className="space-y-3">
                  {routeList.map((route) => (
                    <RouteListItem key={route.id} route={route} />
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
