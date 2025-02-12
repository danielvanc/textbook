import { auth } from "@/auth";
import appConfig from "@/utils/config";
import { NextResponse } from "next/server";

export default auth((req) => {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = path.startsWith(appConfig.appRoute);

  if (isProtectedRoute && !appConfig.sessionCookie)
    return NextResponse.redirect(new URL(appConfig.loginRoute, req.url));

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
