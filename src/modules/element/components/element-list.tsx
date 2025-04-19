import CustomTable, { TableColumn } from "@/components/custom/table/app-custom-table";
import { Badge } from "@/components/ui/badge";
import { ElementResponseDto, ElementStatusEnum } from "../models/element-model";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ElementActionsCell from "./element-actions-cell";
import ElementRequestDialog from "./element-request-dialog";
import { useGetAllElementsByComponentIdAndAssetId } from "../handlers/element-handler";

interface ElementListProps {
  assetId?: number;
  componentId?: number;
}

export default function ElementList({ assetId, componentId }: ElementListProps) {
  const { data, isLoading } = useGetAllElementsByComponentIdAndAssetId(assetId, componentId);

  const columns: TableColumn<ElementResponseDto>[] = [
    { header: "Name", accessorKey: "name" },
    { header: "Description", accessorKey: "description" },
    {
      header: "Component",
      accessorKey: "component.name",
    },
    {
      header: "Manufacturer",
      accessorKey: "manufacturer.name",
    },
    {
      header: "Last Maintenance",
      accessorKey: "last_maintenance_date",
    },
    {
      header: "Last Replacement",
      accessorKey: "last_replacement_date",
    },
    {
      header: "Status",
      accessorKey: "status",
      cellRenderer: (item) =>
        item.status === ElementStatusEnum.ACTIVE ? (
          <Badge className="bg-green-600 hover:bg-green-500">Active</Badge>
        ) : (
          <Badge className="bg-red-600 hover:bg-red-500">Inactive</Badge>
        ),
    },
    {
      header: "Actions",
      accessorKey: "actions",
      cellRenderer: (item) => <ElementActionsCell item={item} />,
    },
  ];

  return (
    <CustomTable
      items={data || []}
      height="100%"
      className="flex-1"
      tableClassName="flex-1"
      columns={columns}
      isDataLoading={isLoading || !assetId || !componentId}
      headerChildren={
        <div className="w-full flex justify-end">
          <ElementRequestDialog assetId={assetId} componentId={componentId}>
            <Button>
              <Plus />
            </Button>
          </ElementRequestDialog>
        </div>
      }
      showColumnToggle={true}
      showRowFilters={true}
      showSearchBar={true}
    />
  );
}
