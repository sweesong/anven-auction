import { list } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function GET(request: Request): Promise<NextResponse> {

    const { blobs } = await list({ mode: 'folded', prefix: 'auction_listing/' });
    const uploadedFileLlist = blobs.filter((blob) => blob.size > 0).sort((a,b)=>(new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()));

    return NextResponse.json(uploadedFileLlist,{
        headers: {
            'Cache-Control': 'no-cache, no-store, max-age=0, must-revalidate',
            'CDN-Cache-Control': 'public, s-maxage=60',
            'Vercel-CDN-Cache-Control': 'public, s-maxage=3600',
          },
    });
}