import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { DialogTrigger } from "@/components/ui/dialog";
import { TriangleAlert } from "lucide-react";
import React from "react";
import { useDeleteMaintenanceType } from "../handlers/maintenance-type-handler";
import { MaintenanceTypeResponseDto } from "../models/maintenance-type-model";

interface MaintenanceTypeDeleteRequestDialogProps {
  children?: React.ReactNode;
  item: MaintenanceTypeResponseDto;
  open?: boolean;
  setOpen?: (open: boolean) => void;
}

export default function MaintenanceTypeDeleteAlertDialog({
  children,
  item,
  open,
  setOpen,
}: MaintenanceTypeDeleteRequestDialogProps) {
  const { mutate: deleteMaintenanceType } = useDeleteMaintenanceType();

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete this MaintenanceType?</AlertDialogTitle>
          <AlertDialogDescription className="flex items-center gap-2 text-red-600">
            <TriangleAlert /> This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 hover:bg-red-500"
            onClick={() => deleteMaintenanceType(item.id)}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
