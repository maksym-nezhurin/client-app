import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const res = NextResponse.next()

  // Add CORS headers only for /api/*
  if (req.nextUrl.pathname.startsWith('/api/')) {
    res.headers.set('Access-Control-Allow-Origin', '*')
    res.headers.set('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
    res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  }

  return res;
}

// Enable middleware only on API routes
export const config = {
  matcher: '/api/:path*',
}
