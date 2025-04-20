/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import type { StepProps } from "./stepper-types";
import { motion } from "framer-motion";

/**
 * Componente Step: representa un único paso del Stepper.
 * Solo renderiza su contenido si es el paso activo.
 */
export const Step: React.FC<StepProps> = ({
  index,
  label,
  description,
  optional,
  icon,
  className,
  children,
}) => {
  // El Step en sí no maneja estado, solo estructura de datos.
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

Step.displayName = "Step";
