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
import { useUpdateAssetStatus } from "../handlers/asset-handler";
import { AssetResponseDto } from "../models/asset-model";

interface AssetActiveRequestDialogProps {
  children?: React.ReactNode;
  item: AssetResponseDto;
  open?: boolean;
  setOpen?: (open: boolean) => void;
}

export default function AssetActiveAlertDialog({
  children,
  item,
  open,
  setOpen,
}: AssetActiveRequestDialogProps) {
  const { mutate: updateAssetStatus } = useUpdateAssetStatus();

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to {item.status === "ACTIVE" ? "desactivate" : "active"} this
            Asset?
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
              updateAssetStatus({
                id: item.id,
                status: item.status === "ACTIVE" ? "INACTIVE" : "ACTIVE",
              })
            }
          >
            {item.status === "ACTIVE" ? "Desactivate" : "Active"} asset
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
