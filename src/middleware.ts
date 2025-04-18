import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/config/auth";
import { isExactPath } from "./utils/is-exact-path";

export async function middleware(request: NextRequest) {
  // Authentication
  const session = await auth();

  const pathname = request.nextUrl.pathname;

  if (pathname === "/auth/login") {
    return NextResponse.next();
  }
  
  if (!session?.user) {
    console.log("🔁 Redirect: not authenticated → /auth/login");
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (session?.user && pathname === "/auth/login") {
    console.log("🔁 Redirect: already logged in → /plants");
    return NextResponse.redirect(new URL("/plants", request.url));
  }

  // Selected Plant
  const plantSlug = request.cookies.get("plant-slug")?.value;

  const rawSlugInPath = pathname.split("/")[1] || "";
  const decodedSlugInPath = decodeURIComponent(rawSlugInPath);

  const isGeneralRoute = isExactPath(pathname, ["/plants", "/users"]);

  // 🔓 User without a plant but on route that requires a plant
  if (!plantSlug && !isGeneralRoute) {
    console.log("🔁 Redirect: no plant selected → /plants");
    return NextResponse.redirect(new URL("/plants", request.url));
  }

  // 🔐 User with plant selected but navigates to general route
  if (plantSlug && isGeneralRoute) {
    console.log("🔁 Redirect: has plantSlug but on general route → /[slug]/home");
    return NextResponse.redirect(new URL(`/${plantSlug}/home`, request.url));
  }

  // 🚫 User with plant, but enters a different plant
  if (plantSlug && decodedSlugInPath !== plantSlug) {
    console.log("🔁 Redirect: plantSlug doesn't match route → /[slug]/home");
    const correctedUrl = new URL(`/${encodeURIComponent(plantSlug)}/home`, request.url);
    return NextResponse.redirect(correctedUrl);
  }

  console.log("✅ Proceed with request");

  // Return response
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|auth/callback).*)"],
};
