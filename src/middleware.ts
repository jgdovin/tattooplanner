import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhooks",
  "/book/(.*)",
  "/api/currentUser",
  "/api/geocoder",
]);

export default clerkMiddleware(
  async (auth, req) => {
    // @ts-ignore: awaiting fix for role not existing in auth
    const { protect, role } = auth();

    if (!isPublicRoute(req)) {
      protect();
      // handle role based access here
    }
  },
  {
    signInUrl: "/sign-in",
  }
);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - static (static files)
     * - favicon.ico (favicon file)
     */
    // "/((?!api/authSSR|api/auth|book/|api/book|static|favicon.ico|welcome|_next).*)",
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
