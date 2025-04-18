"use client";

import { usePathname } from "next/navigation";
import {
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbPage,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Fragment } from "react";
import capitalize from "@/utils/capitalize";

interface BreadcrumbItemObject {
  href: string | number; // slug or id
  name: string; // label to show in breadcrumb
}

interface DynamicBreadcrumbTrailProps {
  startFrom?: number;
  ignore?: string[];
  customPathname?: BreadcrumbItemObject[];
}

export const DynamicBreadcrumbTrail = ({
  startFrom = 1,
  ignore = [],
  customPathname,
}: DynamicBreadcrumbTrailProps) => {
  const pathname = usePathname();

  // Helper: remove leading/trailing slashes and split
  const getSegments = (path: string) => path.split("/").filter(Boolean);

  // Custom path handling
  if (customPathname && customPathname.length > 0) {
    const segments = customPathname.slice(startFrom - 1);

    return (
      <BreadcrumbList>
        {segments.map((item, index) => {
          const fullPath =
            "/" +
            customPathname
              .slice(0, startFrom - 1 + index + 1)
              .map((i) => i.href)
              .join("/");

          const isLast = index === segments.length - 1;

          return (
            <Fragment key={fullPath}>
              {isLast ? (
                <BreadcrumbPage>
                  <BreadcrumbLink
                    href={ignore.includes(item.href.toString()) ? undefined : fullPath}
                  >
                    {item.name}
                  </BreadcrumbLink>
                </BreadcrumbPage>
              ) : (
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href={ignore.includes(item.href.toString()) ? undefined : fullPath}
                  >
                    {item.name}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              )}
              {!isLast && <BreadcrumbSeparator />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    );
  }

  // Fallback: use actual URL pathname
  const allSegments = getSegments(pathname);
  const segments = allSegments.slice(startFrom - 1);
  const baseSegments = allSegments.slice(0, startFrom - 1);

  return (
    <BreadcrumbList>
      {segments.map((segment, index) => {
        const fullPath = "/" + [...baseSegments, ...segments.slice(0, index + 1)].join("/");
        const isLast = index === segments.length - 1;

        return (
          <Fragment key={fullPath}>
            {isLast ? (
              <BreadcrumbPage>{capitalize(segment)}</BreadcrumbPage>
            ) : (
              <BreadcrumbItem>
                <BreadcrumbLink href={ignore.includes(segment) ? undefined : fullPath}>
                  {capitalize(segment)}
                </BreadcrumbLink>
              </BreadcrumbItem>
            )}
            {!isLast && <BreadcrumbSeparator />}
          </Fragment>
        );
      })}
    </BreadcrumbList>
  );
};
