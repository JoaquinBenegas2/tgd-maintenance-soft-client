// components/ui/FlexContainer.tsx
import clsx from "clsx";
import React from "react";

interface FlexContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: "row" | "col";
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
  align?: "start" | "center" | "end" | "stretch" | "baseline";
  wrap?: "wrap" | "nowrap" | "wrap-reverse";
  gap?: number;
  className?: string;
  children: React.ReactNode;
}

const FlexContainer: React.FC<FlexContainerProps> = ({
  direction = "row",
  justify = "start",
  align = "start",
  wrap = "wrap",
  gap = 4,
  className = "",
  children,
  ...rest
}) => {
  const directionClass = direction === "row" ? "flex-row" : "flex-col";
  const justifyClass = `justify-${justify}`;
  const alignClass = `items-${align}`;
  const wrapClass =
    wrap === "nowrap" ? "flex-nowrap" : wrap === "wrap-reverse" ? "flex-wrap-reverse" : "flex-wrap";
  const gapClass = `gap-${gap}`;

  const composedClassName = clsx(
    "flex",
    directionClass,
    justifyClass,
    alignClass,
    wrapClass,
    gapClass,
    className
  );

  return (
    <div className={composedClassName} {...rest}>
      {children}
    </div>
  );
};

export default FlexContainer;
