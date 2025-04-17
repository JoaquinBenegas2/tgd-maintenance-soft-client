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
import { TriangleAlert } from "lucide-react";
import React from "react";
import { useDeleteSector } from "../handlers/sector-handler";
import { SectorResponseDto } from "../models/sector-model";

interface SectorDeleteRequestDialogProps {
  children?: React.ReactNode;
  item: SectorResponseDto;
  open?: boolean;
  setOpen?: (open: boolean) => void;
}

export default function SectorDeleteAlertDialog({
  children,
  item,
  open,
  setOpen,
}: SectorDeleteRequestDialogProps) {
  const { mutate: deleteSector } = useDeleteSector();

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete this Sector?</AlertDialogTitle>
          <AlertDialogDescription className="flex items-center gap-2 text-red-600">
            <TriangleAlert /> This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 hover:bg-red-500"
            onClick={() => deleteSector(item.id)}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
