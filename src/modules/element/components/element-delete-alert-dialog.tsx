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
import { queryClient } from "@/providers/providers";
import { TriangleAlert } from "lucide-react";
import React from "react";
import { useDeleteElement } from "../handlers/element-handler";

interface ElementDeleteAlertDialogProps {
  children?: React.ReactNode;
  item: any;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function ElementDeleteAlertDialog({
  children,
  item,
  open,
  setOpen,
}: ElementDeleteAlertDialogProps) {
  const { mutate: deleteElement } = useDeleteElement();

  const handleDeleteButtonClick = () => {
    deleteElement(item.id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["components"] });
      },
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete this Element?</AlertDialogTitle>
          <AlertDialogDescription className="flex items-center gap-2 text-red-600">
            <TriangleAlert /> This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 hover:bg-red-500"
            onClick={handleDeleteButtonClick}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
