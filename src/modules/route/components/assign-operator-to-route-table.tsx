import CustomTable, { TableColumn } from "@/components/custom/table/app-custom-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/shadcn/utils";
import { useGetAssignedCompany } from "@/modules/user/handlers/user-handler";
import { roleClasses, roleNames, UserResponseDto } from "@/modules/user/models/user-model";
import { Check, X } from "lucide-react";
import { useState } from "react";
import { RouteResponseDto } from "../models/route-model";
import { useAssignUserToRoute, useUnassignUserFromRoute } from "../handlers/route-handler";
import { queryClient } from "@/providers/providers";

interface AssignUserToRouteTableProps {
  route?: RouteResponseDto;
}
export default function AssignOperatorToRouteTable({ route }: AssignUserToRouteTableProps) {
  const [loadingUserId, setLoadingUserId] = useState<number[]>([]);

  const { data: company, isLoading } = useGetAssignedCompany();

  const { mutateAsync: assignUserToRouteAsync } = useAssignUserToRoute();
  const { mutateAsync: unassignUserFromRouteAsync } = useUnassignUserFromRoute();

  const assignedUserIds = route?.assigned_operators?.map((u) => u.id) || [];

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
        const isLoading = loadingUserId.includes(user.id);

        const handleClick = async () => {
          setLoadingUserId((prev) => [...prev, user.id]);
          try {
            if (route) {
              if (isAssigned) {
                await unassignUserFromRouteAsync({ routeId: route.id, userId: user.id });
                await queryClient.refetchQueries({ queryKey: ["routes", route.id.toString()] });
              } else {
                await assignUserToRouteAsync({ routeId: route.id, userId: user.id });
                await queryClient.refetchQueries({ queryKey: ["routes", route.id.toString()] });
              }
            }
          } finally {
            setLoadingUserId((prev) => prev.filter((id) => id !== user.id));
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

  return (
    <CustomTable
      items={company?.assigned_users || []}
      columns={columns}
      isDataLoading={isLoading}
    />
  );
}
