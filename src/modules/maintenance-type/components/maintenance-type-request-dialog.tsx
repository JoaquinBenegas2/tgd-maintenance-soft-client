import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import MaintenanceTypeRequestForm from "./maintenance-type-request-form";

interface MaintenanceTypeRequestDialogProps {
  children?: React.ReactNode;
  open?: boolean;
  setOpen?: (open: boolean) => void;
  isUpdating?: boolean;
  initialData?: any;
}

export default function MaintenanceTypeRequestDialog({
  children,
  open,
  setOpen,
  isUpdating = false,
  initialData,
}: MaintenanceTypeRequestDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>{isUpdating ? "Edit MaintenanceType" : "Create MaintenanceType"}</DialogTitle>
          <DialogDescription>
            {isUpdating
              ? "Update the MaintenanceType details below."
              : "Add a new MaintenanceType for your organization."}
          </DialogDescription>
        </DialogHeader>
        <MaintenanceTypeRequestForm initialData={initialData} isUpdating={isUpdating} />
      </DialogContent>
    </Dialog>
  );
}
