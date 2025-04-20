import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pen } from "lucide-react";
import { useState } from "react";
import { FormResponseDto } from "../models/maintenance-form-model";
import MaintenanceFormDetailDialog from "./maintenance-form-detail-dialog";
import { Button } from "@/components/ui/button";

export default function MaintenanceFormActionsCell({ item }: { item: FormResponseDto }) {
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);

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
        </DropdownMenuContent>
      </DropdownMenu>
      <MaintenanceFormDetailDialog
        initialData={item}
        open={detailsDialogOpen}
        setOpen={setDetailsDialogOpen}
      />
    </>
  );
}
