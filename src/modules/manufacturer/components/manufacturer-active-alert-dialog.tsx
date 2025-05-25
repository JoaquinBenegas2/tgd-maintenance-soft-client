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
import { InfoIcon, TriangleAlert } from "lucide-react";
import React from "react";
import { useUpdateActiveManufacturer } from "../handlers/manufacturer-handler";
import { ManufacturerResponseDto } from "../models/manufacturer-model";

interface ManufacturerActiveRequestDialogProps {
  children?: React.ReactNode;
  item: ManufacturerResponseDto;
  open?: boolean;
  setOpen?: (open: boolean) => void;
}

export default function ManufacturerActiveAlertDialog({
  children,
  item,
  open,
  setOpen,
}: ManufacturerActiveRequestDialogProps) {
  const { mutate: activeManufacturer } = useUpdateActiveManufacturer();

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to {item.active ? "desactivate" : "active"} this Manufacturer?
          </AlertDialogTitle>
          <AlertDialogDescription
            className={`${item.active ? "text-red-600" : "text-primary"} flex items-center gap-2`}
          >
            {item.active ? (
              <>
                <TriangleAlert /> You will no longer be able to use it in forms.
              </>
            ) : (
              <>
                <InfoIcon /> You will be able to use it in forms.
              </>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={`${item.active ? "bg-red-600 hover:bg-red-500" : "bg-primary hover:bg-primary"}`}
            onClick={() => activeManufacturer({ manufacturerId: item.id, active: !item.active })}
          >
            {item.active ? "Desactivate" : "Active"} manufacturer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
