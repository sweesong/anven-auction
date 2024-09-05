import { fetchAllProperties } from '@/lib/actions';
import { NextResponse } from 'next/server';

type properties = {
    title: string,
    auction_date: string,
    city: string,
    address: string,
    reserve_price: number,
    estimate_price?: number | null,
    extra_info?: string | null,
    size: number,
    type: string,
    tenure: string,
    indicator: "new" | "update" | "close" | "same"
  };

// Extract properties from the database and transform them
async function extractDBProperties(): Promise<{ [key: string]: properties }> {
  const { totalProperties, properties: fetchProperties } = await fetchAllProperties();

  const retProperties = fetchProperties.reduce((tmpProperties, { id, ...tmpProperty }) => {
    tmpProperties[id] = {
      ...tmpProperty,
      indicator: 'close',
    };
    return tmpProperties;
  }, {} as { [key: string]: properties });

  return retProperties;
}

// API route handler
export async function GET() {
  try {
    const retProperties = await extractDBProperties();
    return NextResponse.json(retProperties); // Return the properties as JSON
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch properties' }, { status: 500 });
  }
}
