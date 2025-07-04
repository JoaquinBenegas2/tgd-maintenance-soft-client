import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LucidePower, LucidePowerOff, MoreHorizontal, Pen, Trash } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ComponentWithoutAssetResponseDto } from "../models/component-model";
import ComponentActiveAlertDialog from "./component-active-alert-dialog";
import ComponentDeleteAlertDialog from "./component-delete-alert-dialog";

export default function ComponentActionsCell({ item }: { item: ComponentWithoutAssetResponseDto }) {
  const [deleteAlertDialogOpen, setDeleteAlertDialogOpen] = useState(false);
  const [activeAlertDialogOpen, setActiveAlertDialogOpen] = useState(false);

  const pathname = usePathname();

  const href = pathname.includes("/assets")
  ? `${pathname}/components/${item.id}`
  : `${pathname}/${item.id}`;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="sm" className="p-2">
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem className="p-0">
            <Link href={href}>
              <div className="flex items-center gap-2 cursor-pointer w-full px-2 py-1.5">
                <Pen className="w-4 h-4" />
                View Details
              </div>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setActiveAlertDialogOpen(true)} className="p-0">
            <div className="flex items-center gap-2 cursor-pointer w-full px-2 py-1.5">
              {item.status === "ACTIVE" ? (
                <LucidePowerOff className="w-4 h-4" />
              ) : (
                <LucidePower className="w-4 h-4" />
              )}
              {item.status === "ACTIVE" ? "Deactivate" : "Activate"}
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

      {/* Update Active Alert Dialog */}
      <ComponentActiveAlertDialog
        item={item}
        open={activeAlertDialogOpen}
        setOpen={setActiveAlertDialogOpen}
      />
    </>
  );
}
