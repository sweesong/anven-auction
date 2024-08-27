import prisma from "./db";

// Define property type mappings
const propertyTypeMappings: Record<string, string[]> = {
  "01": ["Apartment", "Flat", "Condominium", "SOHO"],
  "02": ["Factory", "Warehouse"],
  "03": ["Hotel", "Resort", "Clubhouse"],
  "04": ["Land"],
  "05": ["Semi D", "Bungalow", "Villa"],
  "06": ["Shop", "Shop Office", "Retail Space", "Office"],
  "07": ["Terrace", "Townhouse", "Link"]
};

async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function fetchProperties(
  page: number, 
  pageSize: number,
  searchQuery: string,
  propertyType: string,
  state: string,
  minPrice: number,
  maxPrice: number,
  minSize: number,
  maxSize: number,
) {
  // Calculate offset for pagination
  const skip = (page - 1) * pageSize;
  
  const parsedMinPrice = parseFloat(minPrice.toString());
  const parsedMaxPrice = parseFloat(maxPrice.toString());
  const parsedMinSize = parseFloat(minSize.toString());
  const parsedMaxSize = parseFloat(maxSize.toString());

  const filters: any[] = [
    {
      OR: [
        searchQuery ? {
          title: {
            contains: searchQuery,
            mode: 'insensitive' // Case-insensitive search
          }
        } : undefined,
        searchQuery ? {
          address: {
            contains: searchQuery,
            mode: 'insensitive' // Case-insensitive search
          }
        } : undefined
      ].filter(Boolean) // Remove undefined values from OR array
    }
  ];

  // Add property type filter if it's not "00"
  if (propertyType && propertyType !== '00') {
    const propertyTypeCodes = propertyType.split(',').filter(code => code.trim() !== '');
    const propertyTypeTerms = propertyTypeCodes.flatMap(code => propertyTypeMappings[code] || []);
    
    if (propertyTypeTerms.length > 0) {
      filters.push({
        OR: propertyTypeTerms.map(term => ({
          type: {
            contains: term,
            mode: 'insensitive' // Case-insensitive search
          }
        }))
      });
    }
  }

  // Add state filter if it's not "All"
  if (state && state !== 'All') {
    filters.push({
      address: {
        contains: state,
        mode: 'insensitive' // Case-insensitive search
      }
    });
  }

  // Add price range filter
  if (parsedMinPrice !== undefined && parsedMaxPrice !== undefined) {
    if(parsedMinPrice == parsedMaxPrice)
    {
      filters.push({
        reserve_price: {
          gte: parsedMinPrice, // Greater than or equal to minPrice
        }
      });
    } else {
      filters.push({
        reserve_price: {
          gte: parsedMinPrice, // Greater than or equal to minPrice
          lte: parsedMaxPrice  // Less than or equal to maxPrice
        }
      });
    }
  }

  // Add size range filter
  if (parsedMinSize !== undefined && parsedMaxSize !== undefined) {
    if(parsedMinSize == parsedMaxSize)
    {
      filters.push({
        size: {
          gte: parsedMinSize, // Greater than or equal to minSize
        }
      });
    } else {
      filters.push({
        size: {
          gte: parsedMinSize, // Greater than or equal to minSize
          lte: parsedMaxSize  // Less than or equal to maxSize
        }
      });
    }
  }

  // Build the where clause
  const whereClause = filters.length ? { AND: filters } : {};

  // Query the total count and paginated listings
  const [totalProperties, properties] = await Promise.all([
    prisma.auction_listings.count({
      where: whereClause
    }),
    prisma.auction_listings.findMany({
      where: whereClause,
      orderBy: {
        createdAt: 'desc',
      },
    }),
  ]);

  console.log("Total Properties Retrieved=" + totalProperties);

  return {
    totalProperties,
    properties,
  };
}


export default prisma;