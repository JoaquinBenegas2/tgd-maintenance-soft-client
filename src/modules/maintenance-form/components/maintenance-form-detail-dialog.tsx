import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import MaintenanceFormRequestForm from "./maintenance-form-request-form";
import { FormResponseDto } from "../models/maintenance-form-model";

interface MaintenanceFormDetailDialogProps {
  children?: React.ReactNode;
  initialData?: FormResponseDto;
  open?: boolean;
  setOpen?: (open: boolean) => void;
}

export default function MaintenanceFormDetailDialog({
  children,
  initialData,
  open,
  setOpen,
}: MaintenanceFormDetailDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent className="sm:max-w-[768px]">
        <DialogHeader className="gap-1">
          <DialogTitle>{initialData?.name}</DialogTitle>
          <DialogDescription className="mt-1">
            <span className="font-bold">Maintenance Type:{" "}</span>
            {initialData?.maintenance_type?.name}
          </DialogDescription>
          <DialogDescription>{initialData?.description}</DialogDescription>
        </DialogHeader>
        <MaintenanceFormRequestForm initialData={initialData} />
      </DialogContent>
    </Dialog>
  );
}
