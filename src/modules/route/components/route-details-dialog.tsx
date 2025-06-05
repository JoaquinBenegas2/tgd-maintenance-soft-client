"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ProgressRouteElementList from "@/modules/element/components/progress-route-element-list";
import { ProgressElementResponseDto } from "@/modules/element/models/element-model";
import RouteMaintenanceRequestForm from "@/modules/maintenance/components/route-maintenance-request-form";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ProgressRouteResponseDto } from "../models/route-model";

interface RouteDetailsDialogProps {
  route: ProgressRouteResponseDto;
  delayed?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function RouteDetailsDialog({
  route,
  delayed,
  open,
  onOpenChange,
}: RouteDetailsDialogProps) {
  const [selectedElement, setSelectedElement] = useState<ProgressElementResponseDto | null>(null);

  const handleBack = () => setSelectedElement(null);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[1280px] min-h-[768px] flex flex-col overflow-x-hidden">
        <DialogHeader>
          <DialogTitle>{route.name}</DialogTitle>
          <DialogDescription>
            Perform maintenance for the elements of this route
          </DialogDescription>
        </DialogHeader>

        <Breadcrumb>
          <BreadcrumbList>
            {selectedElement ? (
              <BreadcrumbItem className="cursor-pointer" onClick={handleBack}>
                Route elements
              </BreadcrumbItem>
            ) : (
              <BreadcrumbPage className="cursor-pointer" onClick={handleBack}>
                Route elements
              </BreadcrumbPage>
            )}
            {selectedElement && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbPage>{selectedElement.name}</BreadcrumbPage>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mt-2 flex flex-1">
          <AnimatePresence initial={false} mode="wait">
            {selectedElement ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="w-full"
              >
                <RouteMaintenanceRequestForm route={route} selectedElement={selectedElement} onSubmit={handleBack} />
              </motion.div>
            ) : (
              <motion.div
                key="table"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="w-full"
              >
                <ProgressRouteElementList
                  delayed={delayed}
                  route={route}
                  setSelectedElement={setSelectedElement}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}
