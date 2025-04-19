"use client";

import CustomTable, { TableColumn } from "@/components/custom/table/app-custom-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useGetAllMaintenanceTypes } from "../handlers/maintenance-type-handler";
import { MaintenanceTypeResponseDto } from "../models/maintenance-type-model";
import MaintenanceTypeActionsCell from "./maintenance-type-actions-cell";
import MaintenanceTypeRequestDialog from "./maintenance-type-request-dialog";

export default function MaintenanceTypeList() {
  const { data, isLoading } = useGetAllMaintenanceTypes();

  const columns: TableColumn<MaintenanceTypeResponseDto>[] = [
    { header: "Name", accessorKey: "name" },
    { header: "Description", accessorKey: "description" },
    {
      header: "Actions",
      accessorKey: "actions",
      cellRenderer: (item) => <MaintenanceTypeActionsCell item={item} />,
    },
  ];

  return (
    <CustomTable
      items={data || []}
      columns={columns}
      isDataLoading={isLoading}
      headerChildren={
        <div className="w-full flex justify-end">
          <MaintenanceTypeRequestDialog>
            <Button>
              <Plus />
            </Button>
          </MaintenanceTypeRequestDialog>
        </div>
      }
      showColumnToggle={true}
      showRowFilters={true}
      showSearchBar={true}
    />
  );
}
