"use client";

import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import { useSidebar } from "./sidebar-context";

interface SidebarGroupProps {
  title: string;
  children: React.ReactNode;
}

export const SidebarGroup: React.FC<SidebarGroupProps> = ({ title, children }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const { isOpen } = useSidebar();

  return (
    <div className="mb-4">
      <button
        className="flex w-full items-center px-3 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className="h-5 w-5 min-w-5 flex items-center justify-center mr-3">
          <ChevronRight
            className={`h-4 w-4 transform transition-transform duration-300 ${
              isExpanded ? "rotate-90" : "rotate-0"
            }`}
          />
        </span>
        <span
          className={`transition-opacity duration-3000 ${
            isOpen ? "opacity-100" : "opacity-0"
          } text-gray-500`}
        >
          {title}
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? "max-h-96" : "max-h-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
};
