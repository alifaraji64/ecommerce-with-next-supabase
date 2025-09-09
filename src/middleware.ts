import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware(async (auth, request) => {
    console.log('role:', ((await auth()).sessionClaims?.metadata as { role?: string })?.role);
    return NextResponse.next();

})