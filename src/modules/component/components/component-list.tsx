import CustomTable, { TableColumn } from "@/components/custom/table/app-custom-table";
import { Badge } from "@/components/ui/badge";
import { useGetAllComponentsByAssetId } from "../handlers/component-handler";
import { ComponentResponseDto, ComponentStatusEnum } from "../models/component-model";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ComponentActionsCell from "./component-actions-cell";
import ComponentRequestDialog from "./component-request-dialog";

interface ComponentListProps {
  assetId?: number;
}

export default function ComponentList({ assetId }: ComponentListProps) {
  const { data, isLoading } = useGetAllComponentsByAssetId(assetId);

  const columns: TableColumn<ComponentResponseDto>[] = [
    { header: "Name", accessorKey: "name" },
    { header: "Description", accessorKey: "description" },
    {
      header: "Asset",
      accessorKey: "asset.name",
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
        item.status === ComponentStatusEnum.ACTIVE ? (
          <Badge className="bg-green-600 hover:bg-green-500">Active</Badge>
        ) : (
          <Badge className="bg-red-600 hover:bg-red-500">Inactive</Badge>
        ),
    },
    {
      header: "Actions",
      accessorKey: "actions",
      cellRenderer: (item) => <ComponentActionsCell item={item} />,
    },
  ];

  return (
    <CustomTable
      items={data || []}
      height="100%"
      className="flex-1"
      tableClassName="flex-1"
      columns={columns}
      isDataLoading={isLoading || !assetId}
      headerChildren={
        <div className="w-full flex justify-end">
          <ComponentRequestDialog assetId={assetId}>
            <Button>
              <Plus />
            </Button>
          </ComponentRequestDialog>
        </div>
      }
      showColumnToggle={true}
      showRowFilters={true}
      showSearchBar={true}
    />
  );
}
