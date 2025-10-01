// middleware.js
import { NextResponse } from 'next/server';

// In-memory rate limiter (use Redis for production)
const rateLimitMap = new Map();

function rateLimit(ip) {
  const now = Date.now();
  const windowMs = 60000; // 1 minute
  const maxRequests = 10;

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, []);
  }

  const requests = rateLimitMap.get(ip);
  const recentRequests = requests.filter(timestamp => now - timestamp < windowMs);

  if (recentRequests.length >= maxRequests) {
    return false;
  }

  recentRequests.push(now);
  rateLimitMap.set(ip, recentRequests);

  // Cleanup old entries
  if (rateLimitMap.size > 1000) {
    const oldestKey = rateLimitMap.keys().next().value;
    rateLimitMap.delete(oldestKey);
  }

  return true;
}

export function middleware(request) {
  // Only apply rate limiting to API routes
  if (request.nextUrl.pathname.startsWith('/api/generate')) {
    const ip = request.ip ?? request.headers.get('x-forwarded-for') ?? 'anonymous';
    
    if (!rateLimit(ip)) {
      return NextResponse.json(
        { 
          error: 'Too many requests. Please try again later.',
          retryAfter: 60 
        },
        { 
          status: 429,
          headers: {
            'Retry-After': '60'
          }
        }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};