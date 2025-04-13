import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import React from "react";
import { useSidebar } from "./sidebar-context";

interface SidebarProps {
  children: React.ReactNode;
}

const SidebarContent: React.FC<SidebarProps> = ({ children }) => {
  const { isOpen, toggleSidebar } = useSidebar();

  return (
    <aside
      className={`fixed left-0 top-0 z-40 h-screen transition-all duration-300 ease-in-out 
        ${isOpen ? "shadow-2xl sm:shadow-none" : ""}
        ${isOpen ? "w-64" : "w-[70px]"}`}
    >
      <div className="flex h-full flex-col bg-sidebar px-3 border-r border-sidebar-border">
        {children}
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-4 top-4 z-50 rounded-full h-8 w-8 bg-sidebar-border cursor-pointer"
        onClick={toggleSidebar}
      >
        <ChevronRight
          className={`h-4 w-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </Button>
    </aside>
  );
};

export const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  return <SidebarContent>{children}</SidebarContent>;
};
