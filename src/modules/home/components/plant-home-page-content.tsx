"use client";

import MaintenanceTypeBarChart from "@/modules/maintenance/components/maintenance-type-bar-chart";
import MonthMaintenanceCard from "@/modules/maintenance/components/month-maintenance-card";
import DelayedRouteList from "@/modules/route/components/delayed-route-list";
import RiskIndicatorCard from "@/modules/route/components/risk-indicator-card";
import TodayRouteList from "@/modules/route/components/today-route-list";
import TodayRouteProgressCard from "@/modules/route/components/today-route-progress-card";

export default function PlantHomePageContent() {
  return (
    <div className="w-full flex flex-1 gap-4">
      <div className="flex flex-col flex-1 gap-4">
        <div className="flex gap-4 w-full h-full overflow-y-auto">
          <DelayedRouteList />
          <TodayRouteList />
          <TodayRouteProgressCard />
        </div>
        <div className="grid grid-cols-12 gap-4 w-full h-full overflow-y-auto">
          <div className="flex flex-col gap-4 col-span-3">
            <RiskIndicatorCard />
            <MonthMaintenanceCard />
          </div>
          <MaintenanceTypeBarChart />
        </div>
      </div>
    </div>
  );
}
