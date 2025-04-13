import React from "react";

interface SidebarContentProps {
  children: React.ReactNode;
}

export const SidebarContent: React.FC<SidebarContentProps> = ({ children }) => {
  return <div className="flex-1 space-y-3 overflow-y-auto overflow-x-hidden flex flex-col">{children}</div>;
};
