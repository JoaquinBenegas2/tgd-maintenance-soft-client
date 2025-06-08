"use client";

import { SidebarItem } from "@/components/ui/sidebar/sidebar-item";
import { MessageSquare } from "lucide-react";
import { useState } from "react";
import { SupportDialog } from "./support-dialog";

export function SupportButton() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <SidebarItem
        icon={<MessageSquare className="h-5 w-5" />}
        text="Support"
        tooltip="Support"
        className="hover:!text-primary hover:!bg-sidebar"
        onClick={() => setIsDialogOpen(true)}
      />

      <SupportDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </>
  );
}
