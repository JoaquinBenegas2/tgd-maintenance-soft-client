import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import ElementRequestForm from "./element-request-form";

interface ElementRequestDialogProps {
  children?: React.ReactNode;
  open?: boolean;
  setOpen?: (open: boolean) => void;
  assetId?: number;
  componentId?: number;
}

export default function ElementRequestDialog({
  children,
  open,
  setOpen,
  assetId,
  componentId,
}: ElementRequestDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent className="sm:max-w-[768px]">
        <DialogHeader>
          <DialogTitle>Create Element</DialogTitle>
          <DialogDescription>Add a new element for your organization</DialogDescription>
        </DialogHeader>
        <ElementRequestForm assetId={assetId} componentId={componentId} />
      </DialogContent>
    </Dialog>
  );
}
