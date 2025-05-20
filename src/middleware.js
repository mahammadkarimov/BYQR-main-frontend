import { NextResponse } from "next/server";
import { verifyJwtToken } from "./libs/auth";

export async function middleware(request) {
  const { url, nextUrl, cookies } = request
  const { pathname } = request.nextUrl
  const { value: token } = cookies.get('access_token') ?? { value: null }

  const AUTH_PAGES = [`/${pathname.slice(1, 3)}/panel/login`]
  const isAuthPages = (url) => AUTH_PAGES.some(page => page.startsWith(url))

  const hasVerifiedToken = token && (await verifyJwtToken(token));
  const isAuthPageRequested = isAuthPages(nextUrl.pathname)

  if (isAuthPageRequested) {
    if (!hasVerifiedToken) {
      const response = NextResponse.next()

      return response;
    }

    const response = NextResponse.redirect(new URL(`/${pathname.slice(1, 3)}/admin/products`, url))
    return response
  }

  if (!hasVerifiedToken) {
    return NextResponse.redirect(new URL(`/${pathname.slice(1, 3)}/panel/login`, url))
  }

  const apiResponse = await fetch(`${process.env.BASE_URL}/hotel-restaurant-admin/user-auth`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  const apiData = await apiResponse.json();
  const restrictedUrls = apiData?.package?.urls || [];
  const urls = restrictedUrls.map((url) => url.url)

  if (urls.includes(nextUrl.pathname)) {
    return NextResponse.redirect(new URL(`/az/admin/products`, url));
  }

}

export default createMiddleware({
  locales: ['en', 'ru', 'az', 'ko', 'ar'],

  defaultLocale: 'az'
});


export const config = {
  matcher: [
    '/:path/panel/login', '/:path/admin/:path*']
}

import createMiddleware from 'next-intl/middleware';

