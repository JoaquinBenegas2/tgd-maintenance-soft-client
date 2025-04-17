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
import { useDeleteManufacturer } from "../handlers/manufacturer-handler";
import { ManufacturerResponseDto } from "../models/manufacturer-model";

interface ManufacturerDeleteRequestDialogProps {
  children?: React.ReactNode;
  item: ManufacturerResponseDto;
  open?: boolean;
  setOpen?: (open: boolean) => void;
}

export default function ManufacturerDeleteAlertDialog({
  children,
  item,
  open,
  setOpen,
}: ManufacturerDeleteRequestDialogProps) {
  const { mutate: deleteManufacturer } = useDeleteManufacturer();

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete this Manufacturer?</AlertDialogTitle>
          <AlertDialogDescription className="flex items-center gap-2 text-red-600">
            <TriangleAlert /> This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 hover:bg-red-500"
            onClick={() => deleteManufacturer(item.id)}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
