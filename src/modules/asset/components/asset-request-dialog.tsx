import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import AssetRequestForm from "./asset-request-form";

interface AssetRequestDialogProps {
  children?: React.ReactNode;
  open?: boolean;
  setOpen?: (open: boolean) => void;
}

export default function AssetRequestDialog({ children, open, setOpen }: AssetRequestDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent className="sm:max-w-[768px]">
        <DialogHeader>
          <DialogTitle>Create Asset</DialogTitle>
          <DialogDescription>Add a new asset for your organization</DialogDescription>
        </DialogHeader>
        <AssetRequestForm />
      </DialogContent>
    </Dialog>
  );
}
