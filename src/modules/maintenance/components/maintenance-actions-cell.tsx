import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pen, Trash } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MaintenanceResponseDto } from "../models/maintenance-model";
import { useState } from "react";
import MaintenanceDeleteAlertDialog from "./maintenance-delete-alert-dialog";
import { usePlantPath } from "@/hooks/plant-path/use-plant-path";

export default function MaintenanceActionsCell({ item }: { item: MaintenanceResponseDto }) {
  const plantPath = usePlantPath();
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
          <DropdownMenuItem className="p-0">
            <Link href={`${plantPath}/maintenance/${item.id}`}>
              <div className="flex items-center gap-2 cursor-pointer w-full px-2 py-1.5">
                <Pen className="w-4 h-4" />
                View Details
              </div>
            </Link>
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
      <MaintenanceDeleteAlertDialog
        item={item}
        open={deleteAlertDialogOpen}
        setOpen={setDeleteAlertDialogOpen}
      />
    </>
  );
}
