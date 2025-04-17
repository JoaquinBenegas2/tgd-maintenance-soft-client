import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";
import { PlantResponseDto } from "../models/plant-model";
import AssignUserToPlantTable from "./assign-user-to-plant-table";

interface AssignUserToPlantDialogProps {
  plant?: PlantResponseDto;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function AssignUserToPlantDialog({
  plant,
  open,
  onOpenChange,
}: AssignUserToPlantDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[960px]">
        <DialogHeader>
          <DialogTitle>Assign user to plant: {plant?.name}</DialogTitle>
          <DialogDescription>Here you can assign a user to a plant</DialogDescription>
        </DialogHeader>
        
        {/* Users */}
        <AssignUserToPlantTable plant={plant} />
      </DialogContent>
    </Dialog>
  );
}
