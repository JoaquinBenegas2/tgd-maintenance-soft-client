import React from "react";
import FlexContainer from "../flex-container/flex-container";

interface PageHeaderProps {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
}

export default function PageHeader({
  title,
  description,
  icon,
  className,
  children,
}: PageHeaderProps) {
  return (
    <header className={`${className} mb-6`}>
      <FlexContainer align="center" className="mb-2">
        {icon}
        <h1 className="text-3xl font-bold text-foreground">{title}</h1>
      </FlexContainer>
      <FlexContainer align="center">
        <p className="text-base text-foreground/75">{description}</p>
        {children}
      </FlexContainer>
    </header>
  );
}
