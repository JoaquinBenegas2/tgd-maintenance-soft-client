import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LucidePower, LucidePowerOff, MoreHorizontal, Pen, Trash } from "lucide-react";
import { useState } from "react";
import { SectorResponseDto } from "../models/sector-model";
import SectorActiveAlertDialog from "./sector-active-alert-dialog";
import SectorDeleteAlertDialog from "./sector-delete-alert-dialog";
import SectorRequestDialog from "./sector-request-dialog";

export default function SectorActionsCell({ item }: { item: SectorResponseDto }) {
  const [deleteAlertDialogOpen, setDeleteAlertDialogOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [activeAlertDialogOpen, setActiveAlertDialogOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="sm" className="p-2">
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setUpdateDialogOpen(true)} className="p-0">
            <div className="flex items-center gap-2 cursor-pointer w-full px-2 py-1.5">
              <Pen className="w-4 h-4" />
              Edit
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setActiveAlertDialogOpen(true)} className="p-0">
            <div className="flex items-center gap-2 cursor-pointer w-full px-2 py-1.5">
              {item.active ? <LucidePowerOff className="w-4 h-4" /> : <LucidePower className="w-4 h-4" />}
              {item.active ? "Deactivate" : "Activate"}
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

      {/* Update Dialog */}
      <SectorRequestDialog
        initialData={item}
        open={updateDialogOpen}
        setOpen={setUpdateDialogOpen}
        isUpdating
      />

      {/* Delete Alert Dialog */}
      <SectorDeleteAlertDialog
        item={item}
        open={deleteAlertDialogOpen}
        setOpen={setDeleteAlertDialogOpen}
      />

      {/* Update Active Alert Dialog */}
      <SectorActiveAlertDialog
        item={item}
        open={activeAlertDialogOpen}
        setOpen={setActiveAlertDialogOpen}
      />
    </>
  );
}
