import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import Cookies from "universal-cookie";
// import { paths } from "./paths";

export function middleware(req: NextRequest) {
  // const cookies = new Cookies(req.cookies);
  // const userData = cookies.get("userData");
  // const tokenId = userData?.tokenId;
  // const cookies = new Cookies(req.cookies);
  // const userCookie = cookies.get("userData");
  // const tokenId = userCookie?.tokenId;
  const userData = req.cookies.get("userData")?.value;

  console.log("userData:", userData);

  const { pathname } = req.nextUrl.clone();

  const publicRoutes = ["/auth"];
  // const protectedRoutes = ["/"];

  if (userData && !publicRoutes.includes(pathname)) {
    return NextResponse.next(); // Token exists and route is not public
  }

  if (userData && publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/", req.url)); // Token exists and route is not public
  }

  if (!userData && !publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/auth", req.url)); // No token and route is not public
  }

  return NextResponse.next(); // Either token exists and route is public OR no token and route is public
}

export const config = {
  matcher: [
    "/((?!api|static|favicon.ico|assets|favicon|manifest.json|_next).*)",
  ],
};
