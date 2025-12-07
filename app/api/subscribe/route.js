// app/api/subscribe/route.js
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    const webhookUrl = process.env.GOOGLE_SUBSCRIBE_WEBHOOK_URL;
    const secret = process.env.GOOGLE_SUBSCRIBE_SECRET;

    if (!webhookUrl) {
      console.error('Missing GOOGLE_SUBSCRIBE_WEBHOOK_URL env var');
      return NextResponse.json(
        { error: 'Subscription service not configured' },
        { status: 500 }
      );
    }

    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        source: 'bng-footer',
        secret,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error('Google Apps Script error:', text);
      return NextResponse.json(
        { error: 'Failed to save subscription' },
        { status: 500 }
      );
    }

    const data = await res.json().catch(() => ({}));

    if (!data.ok) {
      console.error('Subscribe error from script:', data);
      return NextResponse.json(
        { error: 'Failed to save subscription' },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Subscribe API error:', err);
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}
