import { NextResponse } from 'next/server';
import { ADMIN_COOKIE, adminConfigured, checkCredentials, sessionToken } from '@/lib/admin-auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  if (!adminConfigured()) {
    return NextResponse.json({ error: 'Admin login is not configured. Set ADMIN_PASSWORD.' }, { status: 503 });
  }
  let body: { email?: string; password?: string };
  try {
    body = (await req.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: 'Malformed request.' }, { status: 400 });
  }
  if (!checkCredentials(body.email, body.password)) {
    return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, await sessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 12, // 12 hours
  });
  return res;
}
