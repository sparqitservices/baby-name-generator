// app/api/subscribe/route.js
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ ok: false, error: 'Invalid email' }, { status: 400 });
    }

    const webhookUrl = process.env.GOOGLE_SUBSCRIBE_WEBHOOK_URL;
    const secret = process.env.GOOGLE_SUBSCRIBE_SECRET;

    if (!webhookUrl) {
      console.error('Missing GOOGLE_SUBSCRIBE_WEBHOOK_URL env var');
      return NextResponse.json(
        { ok: false, error: 'Subscription service not configured' },
        { status: 500 }
      );
    }

    const scriptRes = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        source: 'bng-footer',
        secret,
      }),
    });

    const data = await scriptRes.json().catch(() => ({}));

    if (!scriptRes.ok || !data.ok) {
      console.error('Google Apps Script error:', data);
      return NextResponse.json(
        { ok: false, error: 'Failed to save subscription' },
        { status: 500 }
      );
    }

    // ✅ Bubble up the "existing" flag
    return NextResponse.json({
      ok: true,
      existing: Boolean(data.existing),
    });
  } catch (err) {
    console.error('Subscribe API error:', err);
    return NextResponse.json(
      { ok: false, error: 'Server error' },
      { status: 500 }
    );
  }
}
