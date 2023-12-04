import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
// import { paths } from "./paths";

export function middleware(req: NextRequest) {
  const userDataCookie = req.cookies.get("userData");
  const userCookie = userDataCookie ? JSON.parse(userDataCookie.value) : {};

  const { pathname } = req.nextUrl.clone();

  const publicRoutes = ["/auth"];

  const { tokenId } = userCookie;

  if (token) {
    if (publicRoutes.includes(pathname))
      return NextResponse.redirect(new URL("/dashboard", req.url));
    return NextResponse.next();
  }

  // If not Logged In
  else if (!token) {
    if (publicRoutes.includes(pathname)) return NextResponse.next();
    if (pathname !== "/auth")
      return NextResponse.redirect(new URL("/auth", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|static|favicon.ico|assets|favicon|manifest.json|_next).*)",
  ],
};
