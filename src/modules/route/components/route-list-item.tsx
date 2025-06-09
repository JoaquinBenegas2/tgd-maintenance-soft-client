"use client";

import { Progress } from "@/components/animate-ui/radix-progress";
import { RadiobuttonIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import { ProgressRouteResponseDto } from "../models/route-model";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { RouteDetailsDialog } from "./route-details-dialog";

interface RouteListItemProps {
  route: ProgressRouteResponseDto;
  delayed?: boolean;
}

export default function RouteListItem({ route, delayed }: RouteListItemProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const totalElements = route.assigned_elements.length;
  const completedElements = route.assigned_elements.filter(
    (el) => el.received_maintenance === true
  ).length;

  const progress = (completedElements * 100) / totalElements;

  return (
    <li className="bg-accent dark:bg-neutral-800 rounded-md p-3">
      <div className="flex items-center gap-4">
        <RadiobuttonIcon
          className={`w-4 h-4 transition-all ${
            delayed ? "text-red-500" : progress === 100 ? "text-green-500" : "text-amber-500"
          }`}
        />
        <div className="flex-1">
          <p className="text-sm font-bold">{route.name}</p>
          <p className="text-xs text-neutral-600 dark:text-neutral-400">{route.description}</p>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="p-2 hover:bg-white/75 text-foreground/50 rounded-full h-8 w-8"
                onClick={() => setDialogOpen(true)}
              >
                <MoreVertical />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>View route</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <RouteDetailsDialog
          delayed={delayed}
          route={route}
          open={dialogOpen}
          onOpenChange={setDialogOpen}
        />
      </div>
      <Progress value={progress} className="mt-2" progressClassName="bg-sidebar-primary" />
    </li>
  );
}
