import { NextResponse } from 'next/server';
import { isSiteDown } from './pages/api/socket';

export function middleware(req) {
  const url = req.nextUrl.clone();

  // Allow maintenance page and API routes always
  if (url.pathname.startsWith('/maintenance') || url.pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  // Block if siteDown flag is true
  if (isSiteDown()) {
    url.pathname = '/maintenance';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
