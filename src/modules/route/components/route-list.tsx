"use client";

import CustomTable, { TableColumn } from "@/components/custom/table/app-custom-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useGetAllRoutes } from "../handlers/route-handler";
import { RouteResponseDto, RouteStatusEnum } from "../models/route-model";
import RouteRequestDialog from "./route-request-dialog";
import { Badge } from "@/components/ui/badge";
import RouteActionsCell from "./route-actions-cell";
import { DateCell } from "@/components/custom/cells/date-cell";
import WithPermission from "@/components/with-permission/with-permission";
import { useHasRole } from "@/hooks/use-has-role/use-has-role";

export default function RouteList() {
  const { data, isLoading } = useGetAllRoutes();

  const isOperator = useHasRole("PLANT_OPERATOR");

  const baseColumns: TableColumn<RouteResponseDto>[] = [
    { header: "Name", accessorKey: "name" },
    { header: "Description", accessorKey: "description" },
    {
      header: "Periodicity",
      accessorKey: "periodicity_in_days",
      cellRenderer: (item) => `${item.periodicity_in_days} days`,
    },
    {
      header: "Start Date",
      accessorKey: "start_date",
      cellRenderer: (item) => <DateCell date={item.start_date} />,
    },
    {
      header: "Status",
      accessorKey: "status",
      cellRenderer: (item) =>
        item.status === RouteStatusEnum.ACTIVE ? (
          <Badge className="bg-green-600 hover:bg-green-500">Active</Badge>
        ) : (
          <Badge className="bg-red-600 hover:bg-red-500">Inactive</Badge>
        ),
    },
  ];

  const actionColumn: TableColumn<RouteResponseDto> = {
    header: "Actions",
    accessorKey: "actions",
    cellRenderer: (item) => <RouteActionsCell item={item} />,
  };

  const columns: TableColumn<RouteResponseDto>[] = isOperator
    ? baseColumns
    : [...baseColumns, actionColumn];

  return (
    <CustomTable
      height="100%"
      tableClassName="flex-1"
      className="flex-1"
      items={data || []}
      columns={columns}
      isDataLoading={isLoading}
      headerChildren={
        <WithPermission roles={["PLANT_MANAGER", "PLANT_SUPERVISOR"]}>
          <div className="w-full flex justify-end">
            <RouteRequestDialog>
              <Button className="w-full md:w-auto">
                <Plus />
              </Button>
            </RouteRequestDialog>
          </div>
        </WithPermission>
      }
      showColumnToggle={true}
      showRowFilters={true}
      showSearchBar={true}
    />
  );
}
