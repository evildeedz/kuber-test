import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Log the request path
  console.log(`Middleware processing request to: ${request.nextUrl.pathname}`)

  // Only process requests to the counter API
  if (request.nextUrl.pathname.startsWith("/api/counter")) {
    console.log("Processing counter API request")

    // You can add additional logic here like:
    // - Rate limiting
    // - Authentication checks
    // - Request validation

    // For now, we'll just add a custom header
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set("x-middleware-processed", "true")

    // Continue to the API route with the modified headers
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
  }

  // For all other requests, just continue
  return NextResponse.next()
}

// Configure the middleware to only run on specific paths
export const config = {
  matcher: "/api/:path*",
}
