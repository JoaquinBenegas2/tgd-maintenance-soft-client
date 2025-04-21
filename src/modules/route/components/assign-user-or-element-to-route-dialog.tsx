import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import { RouteResponseDto } from "../models/route-model";
import AssignElementToRouteTable from "./assign-element-to-route-table";
import AssignOperatorToRouteTable from "./assign-operator-to-route-table";

interface AssignElementToRouteDialogProps {
  route?: RouteResponseDto;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
  assignType: "element" | "operator";
}

export default function AssignElementToRouteDialog({
  route,
  open,
  onOpenChange,
  assignType,
  children,
}: AssignElementToRouteDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent className="sm:max-w-[1280px]">
        <DialogHeader>
          <DialogTitle>
            Assign {assignType} to route: {route?.name}
          </DialogTitle>
          <DialogDescription>Here you can assign an {assignType} to a route</DialogDescription>
        </DialogHeader>

        {/* Elements */}
        {assignType === "element" && <AssignElementToRouteTable route={route} />}

        {/* Operators */}
        {assignType === "operator" && <AssignOperatorToRouteTable route={route} />}
      </DialogContent>
    </Dialog>
  );
}
