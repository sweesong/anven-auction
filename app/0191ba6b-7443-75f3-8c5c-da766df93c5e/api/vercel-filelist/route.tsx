import { list } from '@vercel/blob';
import { NextResponse } from 'next/server';

//export const revalidate = 1;
export const dynamic = 'force-dynamic'
export async function GET(request: Request): Promise<NextResponse> {

    const { blobs } = await list({ mode: 'folded', prefix: 'auction_listing/' });
    const uploadedFileLlist = blobs.filter((blob) => blob.size > 0).sort((a,b)=>(new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()));

    return NextResponse.json(uploadedFileLlist);
}