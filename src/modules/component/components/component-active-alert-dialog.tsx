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
import { useUpdateComponentStatus } from "../handlers/component-handler";
import { ComponentWithoutAssetResponseDto } from "../models/component-model";

interface ComponentActiveRequestDialogProps {
  children?: React.ReactNode;
  item: ComponentWithoutAssetResponseDto;
  open?: boolean;
  setOpen?: (open: boolean) => void;
}

export default function ComponentActiveAlertDialog({
  children,
  item,
  open,
  setOpen,
}: ComponentActiveRequestDialogProps) {
  const { mutate: updateComponentStatus } = useUpdateComponentStatus();

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to {item.status === "ACTIVE" ? "desactivate" : "active"} this
            Component?
          </AlertDialogTitle>
          <AlertDialogDescription
            className={`${
              item.status === "ACTIVE" ? "text-red-600" : "text-primary"
            } flex items-center gap-2`}
          >
            {item.status === "ACTIVE" ? (
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
            className={`${
              item.status === "ACTIVE"
                ? "bg-red-600 hover:bg-red-500"
                : "bg-primary hover:bg-primary"
            }`}
            onClick={() =>
              updateComponentStatus({
                id: item.id,
                status: item.status === "ACTIVE" ? "INACTIVE" : "ACTIVE",
              })
            }
          >
            {item.status === "ACTIVE" ? "Desactivate" : "Active"} component
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
