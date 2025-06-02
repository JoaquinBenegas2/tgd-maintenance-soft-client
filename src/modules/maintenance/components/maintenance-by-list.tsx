import { DateCell } from "@/components/custom/cells/date-cell";
import CustomTable from "@/components/custom/table/app-custom-table";
import { ActiveDateRangeFilter } from "@/components/custom/table/row-filters";
import MaintenanceActionsCell from "@/modules/maintenance/components/maintenance-actions-cell";
import {
  useGetMaintenancesByAsset,
  useGetMaintenancesByComponent,
  useGetMaintenancesByElement,
} from "@/modules/maintenance/handlers/maintenance-handler";
import { MaintenanceResponseDto } from "@/modules/maintenance/models/maintenance-model";
import { parseISO, subDays, subMonths } from "date-fns";
import React from "react";

type By = "asset" | "component" | "element";

interface MaintenanceByListProps {
  by: By;
  id: number;
}

export function MaintenanceByList({ by, id }: MaintenanceByListProps) {
  const [dateFilter, setDateFilter] = React.useState<[Date, Date]>([
    subMonths(new Date(), 1),
    new Date(),
  ]);

  const { data, isLoading } = (() => {
    switch (by) {
      case "asset":
        return useGetMaintenancesByAsset(id, dateFilter[0], dateFilter[1]);
      case "component":
        return useGetMaintenancesByComponent(id, dateFilter[0], dateFilter[1]);
      case "element":
        return useGetMaintenancesByElement(id, dateFilter[0], dateFilter[1]);
    }
  })();

  const columns = React.useMemo(
    () => [
      { header: "Route", accessorKey: "route.name" },
      { header: "Asset", accessorKey: "element.component.asset.name" },
      { header: "Component", accessorKey: "element.component.name" },
      { header: "Element", accessorKey: "element.name" },
      { header: "Form", accessorKey: "form.name" },
      {
        header: "Date",
        accessorKey: "maintenance_date",
        cellRenderer: (item: MaintenanceResponseDto) => <DateCell date={item.maintenance_date} />,
      },
      {
        header: "Actions",
        accessorKey: "actions",
        cellRenderer: (item: MaintenanceResponseDto) => <MaintenanceActionsCell item={item} />,
      },
    ],
    []
  );

  const initialDateRangeFilter: ActiveDateRangeFilter = {
    id: "date",
    type: "date-range",
    label: "Date",
    startLabel: "Start Date",
    endLabel: "End Date",
    nonErasable: true,
    selectedRange: {
      from: dateFilter[0],
      to: dateFilter[1],
    },
  };

  return (
    <CustomTable<MaintenanceResponseDto>
      height="100%"
      tableClassName="flex-1"
      className="flex-1"
      items={data || []}
      columns={columns}
      isDataLoading={isLoading}
      showColumnToggle
      showRowFilters
      showSearchBar
      initialRowFilters={[initialDateRangeFilter]}
      availableRowFilters={[
        {
          type: "date-range",
          label: "Date",
          startLabel: "Start Date",
          endLabel: "End Date",
          id: "date",
        },
      ]}
      onRowFiltersChange={(filters) => {
        const startIso = filters["date_start"];
        const endIso = filters["date_end"];

        if (startIso && endIso) {
          const from = parseISO(startIso);
          const to = parseISO(endIso);
          setDateFilter([from, to]);
        }
      }}
    />
  );
}
