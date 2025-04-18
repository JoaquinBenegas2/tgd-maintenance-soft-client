"use client";

import { usePathname } from "next/navigation";
import {
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbItem,
} from "@/components/ui/breadcrumb";
import capitalize from "@/utils/capitalize";

interface DynamicBreadcrumbTrailProps {
  startFrom?: number;
  ignore?: string[];
}

export const DynamicBreadcrumbTrail = ({ startFrom = 1, ignore }: DynamicBreadcrumbTrailProps) => {
  const pathname = usePathname();

  const segments = pathname
    .split("/")
    .filter(Boolean)
    .slice(startFrom - 1);

  const baseSegments = pathname
    .split("/")
    .filter(Boolean)
    .slice(0, startFrom - 1);

  return (
    <BreadcrumbList>
      {segments.map((segment, index) => {
        const fullPath = "/" + [...baseSegments, ...segments.slice(0, index + 1)].join("/");

        const isLast = index === segments.length - 1;

        return (
          <>
            {isLast ? (
              <BreadcrumbPage key={index}>
                {" "}
                <BreadcrumbLink href={ignore?.includes(segment) ? undefined: fullPath}>{capitalize(segment)}</BreadcrumbLink>
              </BreadcrumbPage>
            ) : (
              <BreadcrumbItem key={index}>
                <BreadcrumbLink href={ignore?.includes(segment) ? undefined: fullPath}>{capitalize(segment)}</BreadcrumbLink>
              </BreadcrumbItem>
            )}
            {!isLast && <BreadcrumbSeparator key={`${index}-separator`} />}
          </>
        );
      })}
    </BreadcrumbList>
  );
};
