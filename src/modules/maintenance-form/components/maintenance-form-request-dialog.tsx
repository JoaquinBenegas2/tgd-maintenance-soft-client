import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import MaintenanceFormRequestFormBuilder from "./maintenance-form-request-form-builder";

interface MaintenanceFormRequestDialogProps {
  children?: React.ReactNode;
  open?: boolean;
  setOpen?: (open: boolean) => void;
}

export default function MaintenanceFormRequestDialog({
  children,
  open,
  setOpen,
}: MaintenanceFormRequestDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent className="sm:max-w-[960px] max-h-[90vh] flex flex-col overflow-y-hidden">
        <DialogHeader>
          <DialogTitle>Create Maintenance Form</DialogTitle>
          <DialogDescription>Add a new Maintenance Form for your organization.</DialogDescription>
        </DialogHeader>
        <MaintenanceFormRequestFormBuilder />
      </DialogContent>
    </Dialog>
  );
}
