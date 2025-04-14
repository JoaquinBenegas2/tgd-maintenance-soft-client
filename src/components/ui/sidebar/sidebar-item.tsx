import React from "react";
import { useSidebar } from "./sidebar-context";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Link from "next/link";

interface SidebarItemProps {
  icon?: React.ReactNode;
  text: string;
  onClick?: () => void;
  isActive?: boolean;
  tooltip?: string;
  className?: string;
  href?: string;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  text,
  onClick,
  isActive = false,
  tooltip,
  className,
  href,
}) => {
  const { isOpen } = useSidebar();

  const content = (
    <button
      className={`flex w-full items-center rounded-none py-2 px-3 font-normal  duration-150 text-sm text-sidebar-foreground hover:text-sidebar-primary cursor-pointer border-sidebar hover:bg-sidebar-accent/25 ${
        isActive &&
        "shadow-[inset_6px_0_0_0_var(--tw-shadow-color)] shadow-sidebar-primary text-sidebar-primary "
      } ${className}`}
      onClick={onClick}
      style={{ transitionProperty: "background-color, color" }}
    >
      {icon && <span className="inline-flex w-5 h-5 justify-center items-center mr-3">{icon}</span>}
      <span className={`overflow-hidden whitespace-nowrap`}>{text}</span>
    </button>
  );

  return (
    <Link href={href || ""}>
      {!isOpen && tooltip ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>{content}</TooltipTrigger>
            <TooltipContent side="right">{tooltip}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        content
      )}
    </Link>
  );
};
