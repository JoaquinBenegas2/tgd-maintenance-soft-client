import FlexContainer from "@/components/custom/flex-container/flex-container";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import React, { useState } from "react";
import { PlantResponseDto } from "../models/plant-model";
import UserCard from "@/modules/user/components/user-card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AssignUserToPlantDialog from "./assign-user-to-plant-dialog";

interface PlantAssignedUsersSheetProps {
  plant: PlantResponseDto;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function PlantAssignedUsersSheet({
  plant,
  open,
  onOpenChange,
}: PlantAssignedUsersSheetProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="gap-0 px-2 overflow-scroll" onOpenAutoFocus={(e) => e.preventDefault()}>
          <SheetHeader>
            <SheetTitle>Users assigned to {plant.name}</SheetTitle>
            <SheetDescription>Here are the users assigned to this plant</SheetDescription>
          </SheetHeader>
          <div className="px-4">
            <Separator />
          </div>

          <FlexContainer className="gap-4 p-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    className="w-full h-24"
                    variant={"ghost"}
                    onClick={() => setDialogOpen(true)}
                  >
                    <Plus className="scale-175" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="translate-y-8">
                  <p>Add user</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {plant.assigned_users.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                className="w-full"
                showImage={false}
                showDropdown={false}
              />
            ))}
          </FlexContainer>
        </SheetContent>
      </Sheet>
      <AssignUserToPlantDialog open={dialogOpen} onOpenChange={setDialogOpen} plant={plant} />
    </>
  );
}
