import React from "react";
import {
  ElementResponseDto,
  ElementStatusEnum,
  ProgressElementResponseDto,
} from "../models/element-model";
import { Badge } from "@/components/ui/badge";
import { ProgressRouteResponseDto } from "@/modules/route/models/route-model";
import CustomTable from "@/components/custom/table/app-custom-table";
import { Button } from "@/components/ui/button";
import { FaClipboard, FaClipboardCheck } from "react-icons/fa";

interface ProgressRouteElementListProps {
  route: ProgressRouteResponseDto;
  delayed?: boolean;
  setSelectedElement: (element: ProgressElementResponseDto) => void;
}

export default function ProgressRouteElementList({
  route,
  delayed,
  setSelectedElement,
}: ProgressRouteElementListProps) {
  return (
    <CustomTable
      height="100%"
      className="h-full"
      items={route?.assigned_elements || []}
      isDataLoading={!route?.assigned_elements}
      columns={[
        {
          header: "Maintenance",
          accessorKey: "maintenance",
          cellRenderer: (item) => (
            <Button
              className={`${
                item.received_maintenance
                  ? "bg-green-600 hover:bg-green-500"
                  : delayed
                  ? "bg-red-500 hover:bg-red-400"
                  : "bg-amber-500 hover:bg-amber-400"
              }`}
              size={"sm"}
              onClick={() => setSelectedElement(item)}
            >
              {item.received_maintenance ? <FaClipboardCheck /> : <FaClipboard />}
            </Button>
          ),
        },
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
      ]}
    />
  );
}
