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
import { useDeleteComponent } from "../handlers/component-handler";

interface ComponentDeleteAlertDialogProps {
  children?: React.ReactNode;
  item: any;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function ComponentDeleteAlertDialog({
  children,
  item,
  open,
  setOpen,
}: ComponentDeleteAlertDialogProps) {
  const { mutate: deleteComponent } = useDeleteComponent();

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete this Component?</AlertDialogTitle>
          <AlertDialogDescription className="flex items-center gap-2 text-red-600">
            <TriangleAlert /> This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 hover:bg-red-500"
            onClick={() => deleteComponent(item.id)}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
