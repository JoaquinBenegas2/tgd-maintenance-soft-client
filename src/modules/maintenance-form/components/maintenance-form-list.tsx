"use client";

import CustomTable, { TableColumn } from "@/components/custom/table/app-custom-table";
import { useGetAllForms } from "../handlers/maintenance-form-handler";
import { FormResponseDto } from "../models/maintenance-form-model";
import MaintenanceFormActionsCell from "./maintenance-form-actions-cell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import MaintenanceFormRequestDialog from "./maintenance-form-request-dialog";

export default function MaintenanceFormList() {
  const { data, isLoading } = useGetAllForms();

  const columns: TableColumn<FormResponseDto>[] = [
    { header: "Name", accessorKey: "name" },
    {
      header: "Type",
      accessorKey: "maintenance_type.name",
      cellRenderer: (item) => <Badge variant={"secondary"}>{item.maintenance_type.name}</Badge>,
    },
    { header: "Description", accessorKey: "description" },
    {
      header: "Actions",
      accessorKey: "actions",
      cellRenderer: (item) => <MaintenanceFormActionsCell item={item} />,
    },
  ];

  return (
    <CustomTable
      height="100%"
      tableClassName="flex-1"
      className="flex-1"
      items={data || []}
      columns={columns}
      isDataLoading={isLoading}
      headerChildren={
        <div className="w-full flex justify-end">
          <MaintenanceFormRequestDialog>
            <Button className="w-full md:w-auto">
              <Plus />
            </Button>
          </MaintenanceFormRequestDialog>
        </div>
      }
      showColumnToggle={true}
      showRowFilters={true}
      showSearchBar={true}
    />
  );
}
