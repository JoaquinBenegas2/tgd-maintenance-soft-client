"use client";

import React from "react";
import { useGetAllManufacturers } from "../handlers/manufacturer-handler";
import CustomTable, { TableColumn } from "@/components/custom/table/app-custom-table";
import { ManufacturerResponseDto } from "../models/manufacturer-model";
import { Badge } from "@/components/ui/badge";
import ManufacturerActionsCell from "./manufacturer-actions-cell";
import ManufacturerRequestDialog from "./manufacturer-request-dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function ManufacturerList() {
  const { data, isLoading } = useGetAllManufacturers();

  const columns: TableColumn<ManufacturerResponseDto>[] = [
    { header: "Name", accessorKey: "name" },
    { header: "Country", accessorKey: "country" },
    {
      header: "Active",
      accessorKey: "active",
      cellRenderer: (item) =>
        item.active ? (
          <Badge className="bg-green-600 hover:bg-green-500">Active</Badge>
        ) : (
          <Badge className="bg-red-600 hover:bg-red-500">Inactive</Badge>
        ),
    },
    {
      header: "Actions",
      accessorKey: "actions",
      cellRenderer: (item) => <ManufacturerActionsCell item={item} />,
    },
  ];

  return (
    <CustomTable
      items={data || []}
      columns={columns}
      isDataLoading={isLoading}
      headerChildren={
        <div className="w-full flex justify-end">
          <ManufacturerRequestDialog>
            <Button>
              <Plus /> New manufacturer
            </Button>
          </ManufacturerRequestDialog>
        </div>
      }
      showColumnToggle={true}
      showRowFilters={true}
      showSearchBar={true}
    />
  );
}
