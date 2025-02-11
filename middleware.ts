import { auth } from "@/auth";
import appConfig from "@/utils/config";
import { NextResponse } from "next/server";

const protectedRoutes = "/home";

export default auth((req) => {
  const path = req.nextUrl.pathname;
  const sessionCookie =
    req.cookies.get("authjs.session-token") ||
    req.cookies.get("__Secure-authjs.session-token");
  const isProtectedRoute = path.startsWith(protectedRoutes);

  if (isProtectedRoute && !sessionCookie)
    return NextResponse.redirect(new URL(appConfig.loginRoute, req.url));

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
