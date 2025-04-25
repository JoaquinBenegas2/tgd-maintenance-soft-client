"use client";

import React from "react";
import FlexContainer from "../flex-container/flex-container";
import useIsMobile from "@/hooks/is-mobile/use-is-mobile";

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
  const isMobile = useIsMobile(640);

  return (
    <header className={`${className} mb-6`}>
      <FlexContainer align="center" className="mb-2">
        {icon && !isMobile && icon}
        <h1 className="text-3xl font-bold text-foreground">{title}</h1>
      </FlexContainer>
      <FlexContainer align="center">
        {description && !isMobile && <p className="text-base text-foreground/75">{description}</p>}
        {children}
      </FlexContainer>
    </header>
  );
}
