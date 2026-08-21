import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch('https://api.kesararamwithdigital.tech/api/v1/products?per_page=200', {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'OutFIT-Haute-Atelier/1.0',
      },
      next: { revalidate: 60 }, // Cache for 60s
    });

    if (!res.ok) {
      // Fallback try HTTP if SSL had an edge handshake issue
      const fallbackRes = await fetch('http://api.kesararamwithdigital.tech/api/v1/products?per_page=200', {
        headers: { 'Accept': 'application/json' },
      });
      if (fallbackRes.ok) {
        const data = await fallbackRes.json();
        return NextResponse.json(data);
      }
      return NextResponse.json({ error: 'Failed to fetch upstream products' }, { status: 500 });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal error fetching products from API', details: String(error) },
      { status: 500 }
    );
  }
}
