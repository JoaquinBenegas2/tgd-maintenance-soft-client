import React from "react";

/**
 * Configuración de cada paso para useStepper hook.
 */
export interface StepConfig {
  label: string;
  description?: string;
  optional?: boolean;
  icon?: React.ReactNode;
}

/**
 * Retorno del hook useStepper.
 */
export interface UseStepperReturn {
  /** Índice del paso activo */
  activeStep: number;
  /** Avanza al siguiente paso */
  nextStep: () => void;
  /** Retrocede al paso anterior */
  prevStep: () => void;
  /** Resetea al paso inicial */
  resetSteps: () => void;
  /** Salta a un paso específico */
  setStep: (step: number) => void;
  /** Indica si el botón "Prev" debe deshabilitarse */
  isDisabledStep: boolean;
  /** Indica si el paso activo es el último */
  isLastStep: boolean;
  /** Indica si el paso activo es opcional */
  isOptionalStep: boolean;
}

/**
 * Props del componente Stepper.
 */
export interface StepperProps {
  activeStep: number;
  children: React.ReactNode;
  orientation?: "horizontal" | "vertical";
  clickableSteps?: boolean;
  labelOrientation?: "bottom" | "right";
  className?: string;
  /** Handler opcional para clic en pasos */
  onStepClick?: (index: number) => void;
}

/**
 * Props del componente Step.
 */
export interface StepProps {
  index: number;
  label: string;
  description?: string;
  optional?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}
