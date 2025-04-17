import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import ManufacturerRequestForm from "./manufacturer-request-form";

interface ManufacturerRequestDialogProps {
  children?: React.ReactNode;
  open?: boolean;
  setOpen?: (open: boolean) => void;
  isUpdating?: boolean;
  initialData?: any;
}

export default function ManufacturerRequestDialog({
  children,
  open,
  setOpen,
  isUpdating = false,
  initialData,
}: ManufacturerRequestDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isUpdating ? "Edit Manufacturer" : "Create Manufacturer"}</DialogTitle>
          <DialogDescription>
            {isUpdating
              ? "Update the Manufacturer details below."
              : "Add a new Manufacturer for your organization."}
          </DialogDescription>
        </DialogHeader>
        <ManufacturerRequestForm initialData={initialData} isUpdating={isUpdating} />
      </DialogContent>
    </Dialog>
  );
}
