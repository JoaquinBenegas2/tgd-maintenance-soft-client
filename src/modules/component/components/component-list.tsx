import CustomTable, { TableColumn } from "@/components/custom/table/app-custom-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AssetResponseDto } from "@/modules/asset/models/asset-model";
import { Plus } from "lucide-react";
import { ComponentStatusEnum, ComponentWithoutAssetResponseDto } from "../models/component-model";
import ComponentActionsCell from "./component-actions-cell";
import ComponentRequestDialog from "./component-request-dialog";
import useIsMobile from "@/hooks/is-mobile/use-is-mobile";

interface ComponentListProps {
  asset?: AssetResponseDto;
  isLoading?: boolean;
}

export default function ComponentList({ asset, isLoading }: ComponentListProps) {
  const isMobile = useIsMobile();

  const columns: TableColumn<ComponentWithoutAssetResponseDto>[] = [
    { header: "Name", accessorKey: "name" },
    { header: "Description", accessorKey: "description" },
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
      items={asset?.components || []}
      height={!isMobile ? "100%" : "400px"}
      className={!isMobile ? "flex-1" : "w-full"}
      tableClassName={!isMobile ? "flex-1" : ""}
      columns={columns}
      isDataLoading={isLoading}
      headerChildren={
        <div className="w-full flex justify-end">
          <ComponentRequestDialog assetId={asset?.id}>
            <Button className="w-full md:w-auto">
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
