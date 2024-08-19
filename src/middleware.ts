import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  // fetch here requires an absolute URL to the auth API route
  const filteredHeaders = new Headers();
  for (const [key, value] of req.headers.entries()) {
    if (key === "content-length") continue;
    filteredHeaders.append(key, value);
  }
  const res = await fetch(`/api/authSSR`, {
    headers: filteredHeaders,
  })
    .then((res) => {
      const data = res.json();

      return data;
    })
    .catch(console.error);

  if (!res) return;

  const {
    data: { auth },
  } = res;

  // we patch the callback to send the user back to where auth was required
  if (!auth) {
    url.search = new URLSearchParams(`callbackUrl=${url}`).toString();
    url.pathname = `/welcome`;
  }

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
