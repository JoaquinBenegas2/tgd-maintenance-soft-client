// export { auth as middleware } from "@/config/auth";

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/config/auth";
import { isExactPath } from "./utils/is-exact-path";

export async function middleware(request: NextRequest) {
  // Authentication
  const session = await auth();

  const pathname = request.nextUrl.pathname;

  if (!session?.user) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (session?.user && pathname === "/auth/login") {
    return NextResponse.redirect(new URL("/plants", request.url));
  }

  // Selected Plant
  const plantSlug = request.cookies.get("plant-slug")?.value;
  const slugInPath = pathname.split("/")[1];

  const isGeneralRoute = isExactPath(pathname, ['/plants', '/users']);

  // 🔓 User without a plant but on route that requires a plant
  if (!plantSlug && !isGeneralRoute) {
    return NextResponse.redirect(new URL("/plants", request.url));
  }

  // 🔐 User with plant selected but navigates to general route
  if (plantSlug && isGeneralRoute) {
    return NextResponse.redirect(new URL(`/${plantSlug}/home`, request.url));
  }

  // 🚫 User with plant, but enters a different plant
  if (plantSlug && slugInPath !== plantSlug) {
    return NextResponse.redirect(new URL(`/${plantSlug}/home`, request.url));
  }

  // Return response
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|auth/callback).*)"],
};
