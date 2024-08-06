import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  // fetch here requires an absolute URL to the auth API route
  const {
    data: { auth },
  } = await fetch(`${url.origin}/api/authSSR`, {
    headers: req.headers,
  })
    .then((res) => {
      const data = res.json();

      return data;
    })
    .catch(console.error);
  // we patch the callback to send the user back to where auth was required
  url.search = new URLSearchParams(`callbackUrl=${url}`).toString();
  url.pathname = `/welcome`;
  return !auth ? NextResponse.redirect(url) : NextResponse.next();
}
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - static (static files)
     * - favicon.ico (favicon file)
     */
    "/((?!api/authSSR|api/auth|static|favicon.ico|welcome|_next).*)",
  ],
};
