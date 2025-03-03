import { NextResponse } from 'next/server';

export function middleware(request) {
  // Get the pathname of the request
  const { pathname } = request.nextUrl;
  
  // Get stored user from cookies
  const userCookie = request.cookies.get('user')?.value;
  const user = userCookie ? JSON.parse(userCookie) : null;
  
  // If user is not logged in and trying to access protected route
  if (!user && pathname !== '/login' && pathname !== '/') {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // If user is logged in and trying to access login page
  if (user && (pathname === '/login' || pathname === '/')) {
    // Redirect to the appropriate dashboard based on user role
    return NextResponse.redirect(new URL(`/${user.role}`, request.url));
  }
  
  // Check if user has access to the requested route
  if (user && pathname.startsWith('/')) {
    const requestedRole = pathname.split('/')[1];
    
    // If route is for a specific role and user doesn't have that role
    if (requestedRole &&
      ['initiator', 'approver', 'receiver'].includes(requestedRole) &&
      user.role !== requestedRole
    ) {
      // Redirect to the appropriate dashboard based on user role
      return NextResponse.redirect(new URL(`/${user.role}`, request.url));
    }
  }
  
  return NextResponse.next();
}

// Define which routes this middleware should run on
export const config = {
  matcher: [
    /*
     * Match all routes except for:
     * 1. /api routes
     * 2. /_next (internal Next.js routes)
     * 3. /static (static files)
     * 4. favicon.ico, etc
     */
    '/((?!api|_next|static|favicon.ico).*)',
  ],
};