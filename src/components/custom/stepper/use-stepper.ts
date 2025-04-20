import { useCallback, useState } from "react";
import type { StepConfig, UseStepperReturn } from "./stepper-types";

/**
 * Hook para gestionar la lógica de un Stepper multistep.
 * @param initialStep Índice inicial (por defecto 0).
 * @param steps Configuración de pasos.
 */
export function useStepper({
  initialStep = 0,
  steps,
}: {
  initialStep?: number;
  steps: StepConfig[];
}): UseStepperReturn {
  const [activeStep, setActiveStep] = useState(initialStep);

  const isDisabledStep = activeStep <= 0;
  const isLastStep = activeStep >= steps.length - 1;
  const isOptionalStep = steps[activeStep]?.optional ?? false;

  const nextStep = useCallback(() => {
    setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
  }, [steps.length]);

  const prevStep = useCallback(() => {
    setActiveStep((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const resetSteps = useCallback(() => {
    setActiveStep(initialStep);
  }, [initialStep]);

  const setStep = useCallback(
    (step: number) => {
      if (step >= 0 && step < steps.length) {
        setActiveStep(step);
      }
    },
    [steps.length]
  );

  return {
    activeStep,
    nextStep,
    prevStep,
    resetSteps,
    setStep,
    isDisabledStep,
    isLastStep,
    isOptionalStep,
  };
}
