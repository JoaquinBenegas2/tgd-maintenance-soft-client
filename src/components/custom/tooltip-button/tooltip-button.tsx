import { Button, ButtonProps } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import React, { forwardRef } from "react";

export interface TooltipButtonProps extends ButtonProps {
  tooltip: React.ReactNode;
}

const TooltipButton = forwardRef<HTMLButtonElement, TooltipButtonProps>(
  ({ tooltip, children, ...buttonProps }, ref) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button ref={ref} {...buttonProps}>
            {children}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="top" align="center">
          {tooltip}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
);

TooltipButton.displayName = "TooltipButton";

export default TooltipButton;
