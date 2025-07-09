import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pen, Trash } from "lucide-react";
import { useState } from "react";
import { FormResponseDto } from "../models/maintenance-form-model";
import MaintenanceFormDetailDialog from "./maintenance-form-detail-dialog";
import SectorDeleteAlertDialog from "@/modules/sector/components/sector-delete-alert-dialog";
import MaintenanceFormDeleteAlertDialog from "./maintenance-form-delete-alert-dialog";

export default function MaintenanceFormActionsCell({ item }: { item: FormResponseDto }) {
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [deleteAlertDialogOpen, setDeleteAlertDialogOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="sm" className="p-2">
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setDetailsDialogOpen(true)} className="p-0">
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

      {/* Details Dialog */}
      <MaintenanceFormDetailDialog
        initialData={item}
        open={detailsDialogOpen}
        setOpen={setDetailsDialogOpen}
      />

      {/* Delete Alert Dialog */}
      <MaintenanceFormDeleteAlertDialog
        item={item}
        open={deleteAlertDialogOpen}
        setOpen={setDeleteAlertDialogOpen}
      />
    </>
  );
}
