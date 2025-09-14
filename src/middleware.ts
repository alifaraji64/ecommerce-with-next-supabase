import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
const isProtectedRoute = createRouteMatcher([
    '/products/:path*', '/orders/:path*'])
export default clerkMiddleware(async (auth, request) => {
    // console.log('role:', ((await auth()).sessionClaims?.metadata as { role?: string })?.role);
    if (isProtectedRoute(request)) { auth.protect() }

})