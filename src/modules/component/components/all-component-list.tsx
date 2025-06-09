import CustomTable, { TableColumn } from "@/components/custom/table/app-custom-table";
import { Badge } from "@/components/ui/badge";
import { useGetAllComponents } from "../handlers/component-handler";
import { ComponentStatusEnum, ComponentWithoutAssetResponseDto } from "../models/component-model";
import ComponentActionsCell from "./component-actions-cell";

export default function AllComponentList() {
  const { data, isLoading } = useGetAllComponents();

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
      height="100%"
      tableClassName="flex-1"
      className="flex-1"
      items={data || []}
      columns={columns}
      isDataLoading={isLoading}
      showColumnToggle={true}
      showRowFilters={true}
      showSearchBar={true}
    />
  );
}
