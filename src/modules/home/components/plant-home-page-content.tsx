"use client";

import MaintenanceTypeBarChart from "@/modules/maintenance/components/maintenance-type-bar-chart";
import MonthMaintenanceCard from "@/modules/maintenance/components/month-maintenance-card";
import DelayedRouteList from "@/modules/route/components/delayed-route-list";
import RiskIndicatorCard from "@/modules/route/components/risk-indicator-card";
import TodayRouteList from "@/modules/route/components/today-route-list";
import TodayRouteProgressCard from "@/modules/route/components/today-route-progress-card";
import AIAssistant from "@/modules/ai-assistant/components/ai-assistant";

export default function PlantHomePageContent() {
  return (
    <div className="w-full flex flex-1 gap-4">
      <div className="flex flex-col flex-1 gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 w-full h-full">
          <DelayedRouteList />
          <TodayRouteList />
          <TodayRouteProgressCard />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 w-full h-full">
          <div className="flex flex-col gap-4 col-span-1 lg:col-span-3">
            <RiskIndicatorCard />
            <MonthMaintenanceCard />
          </div>
          <MaintenanceTypeBarChart />
        </div>
      </div>
      <AIAssistant />
    </div>
  );
}
