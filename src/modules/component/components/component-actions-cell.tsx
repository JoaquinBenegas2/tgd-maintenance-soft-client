import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { ComponentResponseDto } from "../models/component-model";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pen, Trash } from "lucide-react";
import ComponentDeleteAlertDialog from "./component-delete-alert-dialog";

export default function ComponentActionsCell({ item }: { item: ComponentResponseDto }) {
  const [deleteAlertDialogOpen, setDeleteAlertDialogOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const handleViewDetailsButtonClick = () => {
    router.push(`${pathname}/components/${item.id}`);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="sm" className="p-2">
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={handleViewDetailsButtonClick} className="p-0">
            <div className="flex items-center gap-2 cursor-pointer w-full px-2 py-1.5">
              <Pen className="w-4 h-4" />
              View Details
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setDeleteAlertDialogOpen(true)} className="p-0">
            <div className="flex items-center gap-2 text-red-600 cursor-pointer w-full px-2 py-1.5">
              <Trash className="w-4 h-4 text-red-600" />
              Delete
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Delete Alert Dialog */}
      <ComponentDeleteAlertDialog
        item={item}
        open={deleteAlertDialogOpen}
        setOpen={setDeleteAlertDialogOpen}
      />
    </>
  );
}
