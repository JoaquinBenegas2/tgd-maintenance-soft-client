import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import ComponentRequestForm from "./component-request-form";

interface ComponentRequestDialogProps {
  children?: React.ReactNode;
  open?: boolean;
  setOpen?: (open: boolean) => void;
  assetId?: number;
}

export default function ComponentRequestDialog({
  children,
  open,
  setOpen,
  assetId,
}: ComponentRequestDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent className="sm:max-w-[768px]">
        <DialogHeader>
          <DialogTitle>Create Component</DialogTitle>
          <DialogDescription>Add a new component for your organization</DialogDescription>
        </DialogHeader>
        <ComponentRequestForm assetId={assetId} />
      </DialogContent>
    </Dialog>
  );
}
