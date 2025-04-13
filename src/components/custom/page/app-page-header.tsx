import React from "react";

interface PageHeaderProps {
  title?: string;
  description?: string;
}

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <header className="mb-8">
      <h1 className="text-3xl font-bold text-foreground mb-2">{title}</h1>
      <p className="text-base text-foreground/75">{description}</p>
    </header>
  );
}
