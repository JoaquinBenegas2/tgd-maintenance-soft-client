"use client";

import { DateCell } from "@/components/custom/cells/date-cell";
import CustomTable, { TableColumn } from "@/components/custom/table/app-custom-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useGetAllAssets } from "../handlers/asset-handler";
import { AssetResponseDto, AssetStatusEnum } from "../models/asset-model";
import AssetActionsCell from "./asset-actions-cell";
import AssetRequestDialog from "./asset-request-dialog";

export default function AssetList() {
  const {
    data: assets,
    searchTerm,
    setSearchTerm,
    setFilters,
    pageIndex,
    pageSize,
    pageCount,
    setPageSize,
    setPageIndex,
    setPageCount,
    isLoading,
  } = useGetAllAssets({
    pagination: { pageIndex: 0, pageSize: 10 },
    filterable: true,
    cancelable: true,
    debounce: 300,
    queryOptions: {
      onSuccess: (data) => {
        setPageCount?.(data.totalPages);
      },
    },
  });

  const columns: TableColumn<AssetResponseDto>[] = [
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Description",
      accessorKey: "description",
    },
    {
      header: "Sector",
      accessorKey: "sector.name",
    },
    {
      header: "Manufacturer",
      accessorKey: "manufacturer.name",
    },
    {
      header: "Model",
      accessorKey: "model",
    },
    {
      header: "Serial Number",
      accessorKey: "serial_number",
    },
    {
      header: "Status",
      accessorKey: "status",
      cellRenderer: (item) =>
        item.status === AssetStatusEnum.ACTIVE ? (
          <Badge className="bg-green-600 hover:bg-green-500">Active</Badge>
        ) : (
          <Badge className="bg-red-600 hover:bg-red-500">Inactive</Badge>
        ),
    },
    {
      header: "Installation Date",
      accessorKey: "installation_date",
      cellRenderer: (item) => <DateCell date={item.installation_date} />,
    },
    {
      header: "Actions",
      accessorKey: "actions",
      cellRenderer: (item) => <AssetActionsCell item={item} />,
    },
  ];

  const pagination = {
    pageSize: pageSize || 0,
    pageCount: pageCount || 0,
    pageIndex: pageIndex || 0,
    onPageChange: (page: number) => setPageIndex?.(page),
    onPageSizeChange: (size: number) => setPageSize?.(size),
  };

  return (
    <CustomTable
      items={assets?.content || []}
      columns={columns}
      searchValue={searchTerm}
      onSearchValueChange={(searchValue) => setSearchTerm?.(searchValue)}
      onRowFiltersChange={(filters) => setFilters?.(filters)}
      pagination={pagination}
      isDataLoading={isLoading}
      headerChildren={
        <div className="w-full flex justify-end">
          <AssetRequestDialog>
            <Button>
              <Plus />
            </Button>
          </AssetRequestDialog>
        </div>
      }
    />
  );
}
