import { auth } from "@/auth"

export default auth((req) => {
  const pathname = req.nextUrl.pathname;
  
  // IMMEDIATELY ignore all API routes
  if (pathname.startsWith('/api')) return;

  const isLoggedIn = !!req.auth;
  const isAdminRoute = pathname.startsWith('/admin');
  const isAuthRoute = pathname.startsWith('/admin/login');

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL('/admin/dashboard', req.nextUrl));
    }
    return;
  }

  if (isAdminRoute && !isLoggedIn) {
    return Response.redirect(new URL('/admin/login', req.nextUrl));
  }

  // Locale Redirection for public pages
  if (!isAdminRoute && !isAuthRoute) {
    const locales = ['/en', '/ar'];
    const hasLocale = locales.some((loc) => pathname === loc || pathname.startsWith(`${loc}/`));

    if (!hasLocale) {
      // Redirect to /en/path
      const newPathname = `/en${pathname === '/' ? '' : pathname}`;
      return Response.redirect(new URL(newPathname, req.nextUrl));
    }
  }
})

// Safely match routes, excluding next statics to avoid unnecessary invocations
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpeg|.*\\.jpg|.*\\.svg|.*\\.webp).*)'],
}
