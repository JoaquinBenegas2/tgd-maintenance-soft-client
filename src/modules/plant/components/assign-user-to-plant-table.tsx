import CustomTable, { TableColumn } from "@/components/custom/table/app-custom-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/shadcn/utils";
import { useGetAssignedCompany } from "@/modules/user/handlers/user-handler";
import { roleClasses, roleNames, UserResponseDto } from "@/modules/user/models/user-model";
import { Check, X } from "lucide-react";
import React, { useState } from "react";
import { PlantResponseDto } from "../models/plant-model";
import { useAssignUserToPlant, useUnassignUserFromPlant } from "../handlers/plant-handler";
import { useQueryClient } from "@tanstack/react-query";
import { useHasRole } from "@/hooks/use-has-role/use-has-role";

interface AssignUserToPlantTableProps {
  plant?: PlantResponseDto;
}

export default function AssignUserToPlantTable({ plant }: AssignUserToPlantTableProps) {
  const queryClient = useQueryClient();

  const [loadingUserId, setLoadingUserId] = useState<number | null>(null);

  const { data: company, isLoading } = useGetAssignedCompany();

  const { mutateAsync: assignUserToPlantAsync } = useAssignUserToPlant();
  const { mutateAsync: unassignUserFromPlantAsync } = useUnassignUserFromPlant();

  const assignedUserIds = plant?.assigned_users?.map((u) => u.id) || [];

  const isUserPlantManager = useHasRole("PLANT_MANAGER");

  const columns: TableColumn<UserResponseDto>[] = [
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Role",
      accessorKey: "role",
      cellRenderer: (user) => {
        const roleStyle = roleClasses[user.role as keyof typeof roleClasses];

        return (
          <Badge key={user.role} className={cn("transition-all", roleStyle.bg, roleStyle.hover)}>
            {roleNames[user.role as keyof typeof roleNames]}
          </Badge>
        );
      },
    },
    {
      header: "Action",
      accessorKey: "action",
      cellRenderer: (user: UserResponseDto) => {
        const isAssigned = assignedUserIds.includes(user.id);
        const isLoading = loadingUserId === user.id;

        const disabled = isLoading || ((user.role === "PLANT_MANAGER" || user.role === "PLANT_SUPERVISOR") && !isUserPlantManager);

        const handleClick = async () => {
          setLoadingUserId(user.id);
          try {
            if (plant) {
              if (isAssigned) {
                await unassignUserFromPlantAsync({ plantId: plant.id, userId: user.id });
                await queryClient.refetchQueries({ queryKey: ["users", "assigned-plants"] });
              } else {
                await assignUserToPlantAsync({ plantId: plant.id, userId: user.id });
                await queryClient.refetchQueries({ queryKey: ["users", "assigned-plants"] });
              }
            }
          } finally {
            setLoadingUserId(null);
          }
        };

        return isAssigned ? (
          <Button variant="destructive" size="sm" onClick={handleClick} disabled={disabled}>
            <X className="w-4 h-4" />
            Unassign
          </Button>
        ) : (
          <Button
            size="sm"
            className="bg-emerald-600 hover:bg-emerald-500"
            onClick={handleClick}
            disabled={disabled}
          >
            <Check className="w-4 h-4" />
            Assign
          </Button>
        );
      },
    },
  ];

  return (
    <CustomTable
      items={company?.assigned_users || []}
      columns={columns}
      isDataLoading={isLoading}
    />
  );
}
