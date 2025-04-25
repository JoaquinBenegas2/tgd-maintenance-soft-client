import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import RouteRequestForm from "./route-request-form";

interface RouteRequestDialogProps {
  children?: React.ReactNode;
  open?: boolean;
  setOpen?: (open: boolean) => void;
  isUpdating?: boolean;
  initialData?: any;
}

export default function RouteRequestDialog({
  children,
  open,
  setOpen,
  isUpdating = false,
  /* initialData, */
}: RouteRequestDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent className="h-[98vh] sm:max-w-[1048px] md:h-[680px] flex flex-col">
        <DialogHeader>
          <DialogTitle>{isUpdating ? "Edit Route" : "Create Route"}</DialogTitle>
          <DialogDescription>
            {isUpdating
              ? "Update the Route details below."
              : "Add a new Route for your organization."}
          </DialogDescription>
        </DialogHeader>
        <RouteRequestForm />
      </DialogContent>
    </Dialog>
  );
}
