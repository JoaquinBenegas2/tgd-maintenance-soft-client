import CustomTable, { TableColumn } from "@/components/custom/table/app-custom-table";
import { Button } from "@/components/ui/button";
import { useGetAllElements } from "@/modules/element/handlers/element-handler";
import { ElementResponseDto, ElementStatusEnum } from "@/modules/element/models/element-model";
import { Check, X } from "lucide-react";
import { useState } from "react";
import { useAssignElementToRoute, useUnassignElementFromRoute } from "../handlers/route-handler";
import { RouteResponseDto } from "../models/route-model";
import { Badge } from "@/components/ui/badge";
import { queryClient } from "@/providers/providers";

interface AssignElementToRouteTableProps {
  route?: RouteResponseDto;
}
export default function AssignElementToRouteTable({ route }: AssignElementToRouteTableProps) {
  const [loadingElementId, setLoadingElementId] = useState<number[]>([]);

  const { data: elements, isLoading } = useGetAllElements();

  const { mutateAsync: assignElementToRouteAsync } = useAssignElementToRoute();
  const { mutateAsync: unassignElementFromRouteAsync } = useUnassignElementFromRoute();

  const assignedElementIds = route?.assigned_elements?.map((u) => u.id) || [];

  const columns: TableColumn<ElementResponseDto>[] = [
    {
      header: "Asset",
      accessorKey: "component.asset.name",
    },
    {
      header: "Component",
      accessorKey: "component.name",
    },
    { header: "Element", accessorKey: "name" },
    { header: "Description", accessorKey: "description" },
    {
      header: "Manufacturer",
      accessorKey: "manufacturer.name",
    },
    {
      header: "Status",
      accessorKey: "status",
      cellRenderer: (item: ElementResponseDto) =>
        item.status === ElementStatusEnum.ACTIVE ? (
          <Badge className="bg-green-600 hover:bg-green-500">Active</Badge>
        ) : (
          <Badge className="bg-red-600 hover:bg-red-500">Inactive</Badge>
        ),
    },
    {
      header: "Action",
      accessorKey: "action",
      cellRenderer: (element: ElementResponseDto) => {
        const isAssigned = assignedElementIds.includes(element.id);
        const isLoading = loadingElementId.includes(element.id);

        const handleClick = async () => {
          setLoadingElementId((prev) => [...prev, element.id]);
          try {
            if (route) {
              if (isAssigned) {
                await unassignElementFromRouteAsync({ routeId: route.id, elementId: element.id });
                await queryClient.refetchQueries({ queryKey: ["routes", route.id.toString()] });
              } else {
                await assignElementToRouteAsync({ routeId: route.id, elementId: element.id });
                await queryClient.refetchQueries({ queryKey: ["routes", route.id.toString()] });
              }
            }
          } finally {
            setLoadingElementId((prev) => prev.filter((id) => id !== element.id));
          }
        };

        return isAssigned ? (
          <Button variant="destructive" size="sm" onClick={handleClick} disabled={isLoading}>
            <X className="w-4 h-4" />
            Unassign
          </Button>
        ) : (
          <Button
            size="sm"
            className="bg-emerald-600 hover:bg-emerald-500"
            onClick={handleClick}
            disabled={isLoading}
          >
            <Check className="w-4 h-4" />
            Assign
          </Button>
        );
      },
    },
  ];

  return <CustomTable items={elements || []} columns={columns} isDataLoading={isLoading} />;
}
