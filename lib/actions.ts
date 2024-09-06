import prisma from "./db";
import { format } from 'date-fns';

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

  var filters: any[];

  filters = [
    {
      OR: [
        searchQuery ? {
          id: searchQuery // Exact match for ID
        } : undefined,
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
  if ((parsedMinPrice !== undefined && parsedMaxPrice !== undefined)
    && (!(parsedMinPrice==0 && parsedMaxPrice==10000000))
  ) {
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
  if ((parsedMinSize !== undefined && parsedMaxSize !== undefined)
    && (!(parsedMinSize==0 && parsedMaxSize==50000))
  ) {
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
    prisma.properties.count({
      where: whereClause
    }),
    prisma.properties.findMany({
      where: whereClause,
      orderBy: {
        createdAt: 'desc',
      },
    }),
  ]);

  //console.log("Total Properties Retrieved=" + totalProperties);

  return {
    totalProperties,
    properties,
  };
}

export async function fetchAllProperties(){
  
  delay(5000);
  
  const [totalProperties, tmpProperties] = await Promise.all([
    prisma.properties.count(),
    prisma.properties.findMany({
      select: {
        id: true,
        title: true,
        auction_date: true, 
        city: true,
        address: true,
        reserve_price: true,
        estimate_price: true,
        size: true,
        type: true,
        tenure: true,
        extra_info: true,
      },
    }),
  ]);

  const properties = tmpProperties.map(property => ({
    ...property,
    auction_date: format(property.auction_date, 'dd-MM-yyyy'), // Format as 'MM/DD/YYYY HH:MM:SS'
  }));

  return {
    totalProperties,
    properties,
  };
}

fetchAllProperties().catch(e => console.error(e)).finally(async () => {
  console.log("disconnect")
  await prisma.$disconnect();
});


export default prisma;