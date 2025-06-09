import { DateCell } from "@/components/custom/cells/date-cell";
import CustomTable, { TableColumn } from "@/components/custom/table/app-custom-table";
import { Badge } from "@/components/ui/badge";
import { useGetAllElements } from "../handlers/element-handler";
import { ElementStatusEnum, ElementWithoutComponentResponseDto } from "../models/element-model";
import ElementActionsCell from "./element-actions-cell";

export default function AllElementList() {
  const { data, isLoading } = useGetAllElements();

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
      cellRenderer: (item) =>
        item.last_maintenance_date ? <DateCell date={item.last_maintenance_date} /> : "-",
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
