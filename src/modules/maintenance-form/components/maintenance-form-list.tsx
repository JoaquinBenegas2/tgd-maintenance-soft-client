"use client";

import CustomTable, { TableColumn } from "@/components/custom/table/app-custom-table";
import { useGetAllForms } from "../handlers/maintenance-form-handler";
import { FormResponseDto } from "../models/maintenance-form-model";
import MaintenanceFormActionsCell from "./maintenance-form-actions-cell";
import { Badge } from "@/components/ui/badge";

export default function MaintenanceFormList() {
  const { data, isLoading } = useGetAllForms();

  const columns: TableColumn<FormResponseDto>[] = [
    { header: "Name", accessorKey: "name" },
    { header: "Type", accessorKey: "maintenance_type.name", cellRenderer: (item) => <Badge variant={"secondary"}>{item.maintenance_type.name}</Badge> },
    { header: "Description", accessorKey: "description" },
    {
      header: "Actions",
      accessorKey: "actions",
      cellRenderer: (item) => <MaintenanceFormActionsCell item={item} />,
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
