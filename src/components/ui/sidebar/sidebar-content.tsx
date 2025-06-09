import React from "react";

interface SidebarContentProps {
  children: React.ReactNode;
}

export const SidebarContent: React.FC<SidebarContentProps> = ({ children }) => {
  return (
    <div
      className={
        "flex-1 flex flex-col space-y-2 mb-8 overflow-y-auto overflow-x-hidden " +
        "scrollbar-thin scrollbar-thumb-neutral-400 scrollbar-track-transparent " +
        "hover:scrollbar-thumb-neutral-100"
      }
    >
      {children}
    </div>
  );
};
