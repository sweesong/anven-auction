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
  // Add other property type mappings here as needed
};

async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


export async function fetchProperties(
  page: number, 
  pageSize: number,
  searchQuery: string,
  propertyType: string,
  state: string
) {
  await delay(2000); 
  
  // Calculate offset for pagination
  const skip = (page - 1) * pageSize;

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