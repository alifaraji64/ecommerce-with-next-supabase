import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
const isProtectedRoute = createRouteMatcher([
    "/products(.*)",
    "/orders(.*)",
    "/add-order(.*)",
    "/cart(.*)",
])
const isAdminRoute = createRouteMatcher([
    "/admin(.*)",
])
export default clerkMiddleware(async (auth, req) => {
    // console.log('role:', ((await auth()).sessionClaims?.metadata as { role?: string })?.role);
    const { userId, sessionClaims } = await auth(); // ✅ check logged in status

    if (isProtectedRoute(req) && !userId) {
        // redirect to home if not logged in
        return NextResponse.redirect(new URL("/", req.url));
    }
    if (isAdminRoute(req) && (sessionClaims?.metadata as { role?: string })?.role !== 'admin') {
        return NextResponse.redirect(new URL("/", req.url));
    }

    // otherwise continue
    return NextResponse.next();

})