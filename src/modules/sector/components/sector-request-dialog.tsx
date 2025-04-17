import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import SectorRequestForm from "./sector-request-form";

interface SectorRequestDialogProps {
  children?: React.ReactNode;
  open?: boolean;
  setOpen?: (open: boolean) => void;
  isUpdating?: boolean;
  initialData?: any;
}

export default function SectorRequestDialog({
  children,
  open,
  setOpen,
  isUpdating = false,
  initialData,
}: SectorRequestDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isUpdating ? "Edit Sector" : "Create Sector"}</DialogTitle>
          <DialogDescription>
            {isUpdating
              ? "Update the Sector details below."
              : "Add a new Sector for your organization."}
          </DialogDescription>
        </DialogHeader>
        <SectorRequestForm initialData={initialData} isUpdating={isUpdating} />
      </DialogContent>
    </Dialog>
  );
}
