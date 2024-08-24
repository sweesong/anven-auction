import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export async function getPaginatedListings(
  page: number, 
  pageSize: number,
  searchQuery: string,
  propertyType: string,
  state: string) {  

    console.log(searchQuery);

    const [totalListings, auctionListings] = await Promise.all([
      prisma.auction_listings.count(), // Get the total count of listings
      prisma.auction_listings.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      }),
    ]);

    console.log("totalListings="+totalListings);
  
    return {
      totalListings,
      auctionListings,
    };
  }

export default prisma;