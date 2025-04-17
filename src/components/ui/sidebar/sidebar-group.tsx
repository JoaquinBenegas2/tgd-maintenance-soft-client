"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/animate-ui/radix-collapsible";
import { ChevronRight } from "lucide-react";
import React, { useState } from "react";

interface SidebarGroupProps {
  title: string;
  children: React.ReactNode;
}

export const SidebarGroup: React.FC<SidebarGroupProps> = ({ title, children }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <Collapsible className="mb-4" open={isExpanded} onOpenChange={setIsExpanded}>
      <CollapsibleTrigger asChild className="w-full">
        <button
          className="mb-3 transition-all flex w-full items-center px-3 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span className="h-5 w-5 min-w-5 flex items-center justify-center mr-3">
            <ChevronRight
              className={`h-4 w-4 transform transition-transform duration-300 ${
                isExpanded ? "rotate-90" : "rotate-0"
              }`}
            />
          </span>
          <span className="text-sidebar-foreground/50 font-bold">{title}</span>
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent className={`flex-1 flex flex-col space-y-3`}>
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
};
