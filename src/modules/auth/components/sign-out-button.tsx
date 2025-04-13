import { SidebarItem } from "@/components/ui/sidebar/sidebar-item";
import { LogOut } from "lucide-react";
import { handleSignOut } from "../actions/auth-actions";

export function SignOutButton() {
  return (
    <SidebarItem
      icon={<LogOut className="h-5 w-5" />}
      text="Logout"
      tooltip="Logout"
      className="hover:!text-destructive hover:!bg-sidebar"
      onClick={handleSignOut}
    />
  );
}