import { NextResponse } from 'next/server';

export function middleware(req) {
  const url = req.nextUrl.clone();

  // Allow maintenance page and API routes always
  if (url.pathname.startsWith('/maintenance') || url.pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  // Block if global.maintenanceMode flag is true
  if (global.maintenanceMode) {
    url.pathname = '/maintenance';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
