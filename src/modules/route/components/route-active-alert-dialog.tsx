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
import { useUpdateRouteStatus } from "../handlers/route-handler";
import { RouteResponseDto } from "../models/route-model";

interface RouteActiveRequestDialogProps {
  children?: React.ReactNode;
  item: RouteResponseDto;
  open?: boolean;
  setOpen?: (open: boolean) => void;
}

export default function RouteActiveAlertDialog({
  children,
  item,
  open,
  setOpen,
}: RouteActiveRequestDialogProps) {
  const { mutate: updateRouteStatus } = useUpdateRouteStatus();

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to {item.status === "ACTIVE" ? "desactivate" : "active"} this
            Route?
          </AlertDialogTitle>
          <AlertDialogDescription
            className={`${
              item.status === "ACTIVE" ? "text-red-600" : "text-primary"
            } flex items-center gap-2`}
          >
            {item.status === "ACTIVE" ? (
              <>
                <TriangleAlert /> You will no longer be able to complete them.
              </>
            ) : (
              <>
                <InfoIcon /> You will be able to complete them.
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
              updateRouteStatus({
                routeId: item.id,
                status: item.status === "ACTIVE" ? "INACTIVE" : "ACTIVE",
              })
            }
          >
            {item.status === "ACTIVE" ? "Desactivate" : "Active"} route
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
