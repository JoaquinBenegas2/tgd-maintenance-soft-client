"use client";

import CustomTable, { TableColumn } from "@/components/custom/table/app-custom-table";
import { useGetAllMaintenances } from "../handlers/maintenance-handler";
import { MaintenanceResponseDto } from "../models/maintenance-model";
import { DateCell } from "@/components/custom/cells/date-cell";
import MaintenanceActionsCell from "./maintenance-actions-cell";

export default function MaintenanceList() {
  const { data, isLoading } = useGetAllMaintenances();

  const columns: TableColumn<MaintenanceResponseDto>[] = [
    { header: "Route", accessorKey: "route.name" },
    { header: "Asset", accessorKey: "element.component.asset.name" },
    { header: "Component", accessorKey: "element.component.name" },
    { header: "Element", accessorKey: "element.name" },
    { header: "Form", accessorKey: "form.name" },
    {
      header: "Date",
      accessorKey: "maintenance_date",
      cellRenderer: (item) => <DateCell date={item.maintenance_date} />,
    },
    {
      header: "Actions",
      accessorKey: "actions",
      cellRenderer: (item) => <MaintenanceActionsCell item={item} />,
    },
  ];

  return (
    <CustomTable
      items={data || []}
      columns={columns}
      isDataLoading={isLoading}
      showColumnToggle={true}
      showRowFilters={true}
      showSearchBar={true}
    />
  );
}
