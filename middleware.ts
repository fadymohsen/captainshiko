import { auth } from "@/auth"

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isAdminRoute = req.nextUrl.pathname.startsWith('/admin');
  const isAuthRoute = req.nextUrl.pathname.startsWith('/admin/login');

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL('/admin/dashboard', req.nextUrl));
    }
    return;
  }

  if (isAdminRoute && !isLoggedIn) {
    return Response.redirect(new URL('/admin/login', req.nextUrl));
  }
})

// Safely match routes, excluding next statics to avoid unnecessary invocations
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpeg|.*\\.jpg|.*\\.svg|.*\\.webp).*)'],
}
