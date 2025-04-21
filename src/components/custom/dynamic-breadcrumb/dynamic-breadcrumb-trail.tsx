"use client";

import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import capitalize from "@/utils/capitalize";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

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
                  <BreadcrumbLink asChild>
                    <Link href={ignore.includes(item.href.toString()) ? "#" : fullPath}>
                      {item.name}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbPage>
              ) : (
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    {ignore.includes(item.href.toString()) ? (
                      <div>{item.name}</div>
                    ) : (
                      <Link href={ignore.includes(item.href.toString()) ? "#" : fullPath}>
                        {item.name}
                      </Link>
                    )}
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
