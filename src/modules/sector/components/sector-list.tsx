"use client";

import React from "react";
import { useGetAllSectors } from "../handlers/sector-handler";
import CustomTable, { TableColumn } from "@/components/custom/table/app-custom-table";
import { SectorResponseDto } from "../models/sector-model";
import { Badge } from "@/components/ui/badge";
import SectorActionsCell from "./sector-actions-cell";
import SectorRequestDialog from "./sector-request-dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function SectorList() {
  const { data, isLoading } = useGetAllSectors();

  const columns: TableColumn<SectorResponseDto>[] = [
    { header: "Name", accessorKey: "name" },
    { header: "Description", accessorKey: "description" },
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
      cellRenderer: (item) => <SectorActionsCell item={item} />,
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
          <SectorRequestDialog>
            <Button className="w-full md:w-auto">
              <Plus />
            </Button>
          </SectorRequestDialog>
        </div>
      }
      showColumnToggle={true}
      showRowFilters={true}
      showSearchBar={true}
    />
  );
}
