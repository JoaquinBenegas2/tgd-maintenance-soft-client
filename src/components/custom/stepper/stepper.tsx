import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { StepperProps, StepProps } from "./stepper-types";

/**
 * Stepper: componente padre que muestra indicadores y contenido de pasos.
 */
export const Stepper: React.FC<StepperProps> = ({
  activeStep,
  children,
  orientation = "horizontal",
  clickableSteps = true,
  labelOrientation,
  onStepClick,
  className = "",
}) => {
  // Derivar orientación del label si no se provee
  const labelOrient = labelOrientation
    ? labelOrientation
    : orientation === "horizontal"
    ? "bottom"
    : "right";

  // Convertir children a array de Steps
  const steps = React.Children.toArray(children) as React.ReactElement[];

  return (
    <div
      className={cn(
        "w-full",
        orientation === "horizontal" ? "flex flex-col" : "flex flex-row gap-8",
        className
      )}
    >
      {/* Indicadores y líneas */}
      <div
        className={cn(
          "flex",
          orientation === "horizontal"
            ? "flex-row items-center justify-between"
            : "flex-col items-start"
        )}
      >
        {steps.map((stepElem, idx) => {
          const nextIdx = idx + 1;
          const isActive = idx === activeStep;
          const isCompleted = idx < activeStep;
          const isNextActive = nextIdx === activeStep;
          const isNextCompleted = nextIdx < activeStep;

          const stepElemProps = stepElem.props as StepProps;

          // Handler click
          const handleClick = () => {
            if (clickableSteps && onStepClick) onStepClick(idx);
          };

          return (
            <React.Fragment key={idx}>
              <div
                onClick={clickableSteps ? handleClick : undefined}
                className={cn(
                  "flex items-center",
                  labelOrient === "bottom"
                    ? `flex-col ${orientation === "vertical" && "w-full"}`
                    : "flex-row gap-2",
                  clickableSteps && "cursor-pointer"
                )}
              >
                {/* Indicador */}
                <motion.div
                  layout
                  className={cn(
                    "flex items-center justify-center rounded-full border-2 transition-colors duration-200",
                    "w-8 h-8",
                    isCompleted && "bg-blue-500 border-blue-500 text-white",
                    isActive && "bg-blue-600 border-blue-600 text-white",
                    !isCompleted && !isActive && "bg-white border-gray-300 text-gray-500 dark:bg-card dark:border-gray-700 dark:text-gray-400",
                    clickableSteps && isCompleted && "hover:bg-blue-400 hover:border-blue-400",
                    clickableSteps && isActive && "hover:bg-blue-500 hover:border-blue-500",
                    clickableSteps && !isCompleted && !isActive && "hover:bg-gray-100",
                    stepElemProps?.className
                  )}
                  initial={{ scale: isActive ? 1.2 : 1 }}
                  animate={{ scale: isActive ? 1.2 : 1 }}
                >
                  {stepElemProps.icon || <span className="font-semibold">{idx + 1}</span>}
                </motion.div>
                <div
                  className={cn(
                    "flex",
                    orientation === "horizontal"
                      ? labelOrient === "bottom"
                        ? "flex-col mt-2 text-center"
                        : "flex-col ml-2"
                      : labelOrient === "right" && "flex-col ml-2"
                  )}
                >
                  <motion.span
                    className={cn(
                      "text-sm font-medium transition-colors duration-200",
                      isActive && "text-blue-600",
                      isCompleted && "text-blue-500",
                      !isCompleted && !isActive && "text-gray-600 dark:text-gray-400",
                      labelOrient === "bottom" ? "text-center" : ""
                    )}
                  >
                    {stepElemProps.label}
                    {stepElemProps.optional && (
                      <span
                        className={cn(
                          "text-xs italic text-gray-400 ml-1",
                          orientation === "vertical" ? "block ml-0" : ""
                        )}
                      >
                        (optional)
                      </span>
                    )}
                  </motion.span>
                  {stepElemProps.description && (
                    <span
                      className={cn(
                        "text-xs text-gray-500 mt-1",
                        labelOrient === "bottom" ? "text-center" : ""
                      )}
                    >
                      {stepElemProps.description}
                    </span>
                  )}
                </div>
              </div>
              {idx < steps.length - 1 && (
                <div
                  className={cn(
                    "transition-colors duration-200",
                    orientation === "horizontal" ? "flex-1 h-1 mx-2" : "w-1 h-full my-2",
                    isNextCompleted ? "bg-blue-500" : isNextActive ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-700"
                  )}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Contenido del paso activo */}
      <div className="mt-6 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{
              opacity: 0,
              x: orientation === "horizontal" ? 20 : 0,
              y: orientation === "vertical" ? 20 : 0,
            }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{
              opacity: 0,
              x: orientation === "horizontal" ? -20 : 0,
              y: orientation === "vertical" ? -20 : 0,
            }}
            transition={{ duration: 0.25 }}
          >
            {(steps[activeStep]?.props as any).children}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

Stepper.displayName = "Stepper";
