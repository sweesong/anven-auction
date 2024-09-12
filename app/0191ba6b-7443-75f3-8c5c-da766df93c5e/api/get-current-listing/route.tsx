import { fetchCurrentListing } from '@/lib/actions';
import { NextResponse } from 'next/server';

type Listing = {
    id: number,
    priority: number,
    auction_date: string | null,
    city: string | null,
    unitno: string | null,
    address: string | null,
    reserve_price: number | null,
    estimate_price: number | null,
  };

// Extract properties from the database and transform them
async function extractCurrentListing(): Promise<any> {
  const { totalListing, listings } = await fetchCurrentListing();
  return listings;
}

// API route handler
export async function GET() {
  try {
    const retListings = await extractCurrentListing();
    return NextResponse.json(retListings); // Return the properties as JSON
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch current listing' }, { status: 500 });
  }
}
