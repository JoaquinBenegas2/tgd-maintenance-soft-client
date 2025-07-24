"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetDelayedRoutes } from "../handlers/route-handler";
import RouteListItem from "./route-list-item";

export default function DelayedRouteList() {
  const { data: routes } = useGetDelayedRoutes();

  return (
    <Card className="w-full col-span-1 md:col-span-2 xl:col-span-1">
      <CardHeader>
        <CardTitle>Delayed routes</CardTitle>
        <CardDescription>Routes that are delayed</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {routes?.map((route) => (
            <RouteListItem delayed key={route.id} route={route} />
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
