import CustomTable, { TableColumn } from "@/components/custom/table/app-custom-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ComponentResponseDto } from "@/modules/component/models/component-model";
import { Plus } from "lucide-react";
import { ElementStatusEnum, ElementWithoutComponentResponseDto } from "../models/element-model";
import ElementActionsCell from "./element-actions-cell";
import ElementRequestDialog from "./element-request-dialog";

interface ElementListProps {
  assetId?: number;
  component?: ComponentResponseDto;
  isLoading?: boolean;
}

export default function ElementList({ assetId, component, isLoading }: ElementListProps) {
  const columns: TableColumn<ElementWithoutComponentResponseDto>[] = [
    { header: "Name", accessorKey: "name" },
    { header: "Description", accessorKey: "description" },
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
      items={component?.elements || []}
      height="100%"
      className="flex-1"
      tableClassName="flex-1"
      columns={columns}
      isDataLoading={isLoading}
      headerChildren={
        <div className="w-full flex justify-end">
          <ElementRequestDialog assetId={assetId} componentId={component?.id}>
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
