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
import { useDeleteMaintenance } from "../handlers/maintenance-handler";
import { MaintenanceResponseDto } from "../models/maintenance-model";

interface MaintenanceDeleteRequestDialogProps {
  children?: React.ReactNode;
  item: MaintenanceResponseDto;
  open?: boolean;
  setOpen?: (open: boolean) => void;
}

export default function MaintenanceDeleteAlertDialog({
  children,
  item,
  open,
  setOpen,
}: MaintenanceDeleteRequestDialogProps) {
  const { mutate: deleteMaintenance } = useDeleteMaintenance();

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete this Maintenance?</AlertDialogTitle>
          <AlertDialogDescription className="flex items-center gap-2 text-red-600">
            <TriangleAlert /> This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 hover:bg-red-500"
            onClick={() => deleteMaintenance(item.id)}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
