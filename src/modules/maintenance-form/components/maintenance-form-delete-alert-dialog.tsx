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
import { useDeleteForm } from "../handlers/maintenance-form-handler";
import { FormResponseDto } from "../models/maintenance-form-model";

interface MaintenanceFormDeleteRequestDialogProps {
  children?: React.ReactNode;
  item: FormResponseDto;
  open?: boolean;
  setOpen?: (open: boolean) => void;
}

export default function MaintenanceFormDeleteAlertDialog({
  children,
  item,
  open,
  setOpen,
}: MaintenanceFormDeleteRequestDialogProps) {
  const { mutate: deleteMaintenanceForm } = useDeleteForm();

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete this Form?</AlertDialogTitle>
          <AlertDialogDescription className="flex items-center gap-2 text-red-600">
            <TriangleAlert /> This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 hover:bg-red-500"
            onClick={() => deleteMaintenanceForm(item.id)}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
