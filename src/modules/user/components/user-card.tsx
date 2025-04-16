"use client";

import FlexContainer from "@/components/custom/flex-container/flex-container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Eye, MoreVertical, Trash } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { UserResponseDto } from "../models/user-model";
import UserRequestSheet from "./user-request-sheet";
import UserDeleteAlertDialog from "./user-delete-alert-dialog";

interface UserCardProps {
  user: UserResponseDto;
}

const roleNames = {
  PLANT_MANAGER: "Plant Manager",
  PLANT_SUPERVISOR: "Supervisor",
  PLANT_OPERATOR: "Operator",
};

const roleClasses = {
  PLANT_MANAGER: {
    bg: "bg-primary",
    hover: "hover:bg-primary/80",
  },
  PLANT_OPERATOR: {
    bg: "bg-sidebar-primary",
    hover: "hover:bg-sidebar-primary/80",
  },
  PLANT_SUPERVISOR: {
    bg: "bg-red-600",
    hover: "hover:bg-red-600/80",
  },
} as const;

export default function UserCard({ user }: UserCardProps) {
  const roleStyle = roleClasses[user.role as keyof typeof roleClasses];

  const [sheetOpen, setSheetOpen] = useState(false);
  const [deleteAlertDialogOpen, setDeleteAlertDialogOpen] = useState(false);

  return (
    <>
      <Card className="relative">
        <CardContent className="flex flex-row gap-4">
          <FlexContainer align="center" wrap="nowrap">
            <Image
              src={user.image}
              alt={user.name}
              width={50}
              height={50}
              className="rounded-full h-24 min-w-24 object-cover"
            />
            <FlexContainer direction="col" justify="center" gap={0}>
              <p className="font-bold">{user.name}</p>
              <p className="text-foreground/50 mb-4">{user.email}</p>
              <FlexContainer gap={2}>
                <Badge
                  key={user.role}
                  className={cn("transition-all", roleStyle.bg, roleStyle.hover)}
                >
                  {roleNames[user.role as keyof typeof roleNames]}
                </Badge>
              </FlexContainer>
            </FlexContainer>
          </FlexContainer>
        </CardContent>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="p-2 absolute top-5 right-4 text-foreground/50 rounded-full"
            >
              <MoreVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setSheetOpen(true)} className="p-0">
              <div className="flex items-center gap-2 cursor-pointer w-full px-2 py-1.5">
                <Eye className="w-4 h-4" />
                View details
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDeleteAlertDialogOpen(true)} className="p-0">
              <div className="flex items-center gap-2 text-red-600 cursor-pointer w-full px-2 py-1.5">
                <Trash className="w-4 h-4 text-red-600" />
                Delete user
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Card>

      {/* Request Sheet */}
      <UserRequestSheet
        user={user}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        requestType="update"
      />

      {/* Delete Alert Dialog */}
      <UserDeleteAlertDialog
        user={user}
        open={deleteAlertDialogOpen}
        onOpenChange={setDeleteAlertDialogOpen}
      />
    </>
  );
}
