"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetTodayRoutes } from "../handlers/route-handler";
import RouteListItem from "./route-list-item";

export default function TodayRouteList() {
  const { data: routes } = useGetTodayRoutes();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Today routes</CardTitle>
        <CardDescription>Routes to be completed today</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {routes?.map((route) => (
            <RouteListItem key={route.id} route={route} />
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
