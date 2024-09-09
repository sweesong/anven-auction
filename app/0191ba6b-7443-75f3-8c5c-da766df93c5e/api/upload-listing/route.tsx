import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request): Promise<NextResponse> {
    try {
        console.log("POST")
        // Parse the JSON body
        const listings: Array<{
            id: string;
            title: string;
            auction_date: Date;
            city: string;
            address: string;
            reserve_price: number;
            estimate_price?: number;
            size: number;
            type: string;
            tenure: string;
            extra_info?: string;
            image_url?: string;
            createdByWs?: string;
            action: 'insert' | 'update' | 'delete';
        }> = await req.json();

        console.log(listings)

        if (listings) {

            console.log("DELETING")

            await prisma.properties_staging.deleteMany();

            console.log("CREATING INTO STAGING")

            await prisma.properties_staging.createMany({
                data: listings,
                skipDuplicates: true, 
            });

            console.log("RETRIEVE FROM STAGING")

            const actions = await prisma.properties_staging.findMany({
                where: {
                    action: {
                        in: ['insert', 'update', 'delete'] // Ensure action types match
                    }
                }
            });

            console.log("ACTION:" + actions.length)

            for (const action of actions) {
                if (action.action === 'insert') {
                    console.log("ACTION NEW" )

                    await prisma.properties.create({
                        data: {
                            id: action.id,
                            title: action.title,
                            auction_date: action.auction_date,
                            city: action.city,
                            address: action.address,
                            reserve_price: action.reserve_price,
                            estimate_price: action.estimate_price,
                            size: action.size,
                            type: action.type,
                            tenure: action.tenure,
                            extra_info: action.extra_info,
                            image_url: action.image_url,
                            createdByWs: action.createdByWs,
                            createdAt: new Date(),
                        },
                    });
                } else if (action.action === 'update') {
                    
                    console.log("UPDATE" )

                    await prisma.properties.update({
                        where: { id: action.id },
                        data: {
                            title: action.title,
                            auction_date: action.auction_date,
                            city: action.city,
                            address: action.address,
                            reserve_price: action.reserve_price,
                            estimate_price: action.estimate_price,
                            size: action.size,
                            type: action.type,
                            tenure: action.tenure,
                            extra_info: action.extra_info,
                            image_url: action.image_url,
                            isexpired: false,
                            updatedAt: new Date(),
                            updatedByWs: action.createdByWs,
                        },
                    });
                
                }  else if (action.action === 'delete') {

                    console.log("DELETE" )

                    await prisma.properties.update({
                        where: { id: action.id },
                        data: {
                            isexpired: true,
                        }
                    });
                }
            }

            console.log("DONE" )
            
            // Return success response
            return NextResponse.json({ success: 1});
        }

        // Return response if no listings are provided
        //, message: 'No data provided'
        console.log("NO DATA" )
        return NextResponse.json({ success: -1 });

    } catch (error) {
        console.log("ERROR:" + error);
        // Return error response
        return NextResponse.json({ success: 0 });
    }
}
